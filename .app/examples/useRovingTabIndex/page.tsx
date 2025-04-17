// START OF FILE page.tsx (Main Documentation Page - Modified)

import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link"; // Import Link for navigation

// Function to read markdown files from the docs directory
async function getHookDocs() {
  const docsDir = path.join(process.cwd(), "docs");
  try {
    const filenames = await fs.promises.readdir(docsDir);
    const markdownFiles = filenames.filter((filename) =>
      filename.endsWith(".md")
    );

    const docs = await Promise.all(
      markdownFiles.map(async (filename) => {
        const filePath = path.join(docsDir, filename);
        const content = await fs.promises.readFile(filePath, "utf8");
        // Extract hook name from filename (e.g., useMyHook.md -> useMyHook)
        const hookName = path.basename(filename, ".md");
        return { name: hookName, content };
      })
    );
    // Sort docs alphabetically by hook name
    docs.sort((a, b) => a.name.localeCompare(b.name));
    return docs;
  } catch (error) {
    console.error("Error reading documentation files:", error);
    return []; // Return empty array on error
  }
}

// Function to read the main README.md
async function getReadmeContent() {
  const readmePath = path.join(process.cwd(), "README.md");
  try {
    const content = await fs.promises.readFile(readmePath, "utf8");
    return content;
  } catch (error) {
    console.error("Error reading README.md file:", error);
    return null; // Return null on error
  }
}

export default async function HomePage() {
  // Fetch both hook docs and README content concurrently
  const [hookDocs, readmeContent] = await Promise.all([
    getHookDocs(),
    getReadmeContent(),
  ]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* --- Sidebar (remains the same) --- */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 p-6 overflow-y-auto hidden md:block">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Navigation</h2>
        <nav className="space-y-1">
          {readmeContent && (
            <Link
              href={`#readme`}
              className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              README
            </Link>
          )}
          {readmeContent && hookDocs.length > 0 && (
            <hr className="my-2 border-gray-200" />
          )}
          <span className="block px-3 pt-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Hooks
          </span>
          {hookDocs.map((doc) => (
            <Link
              key={doc.name}
              href={`#${doc.name}`} // Link to detailed doc section
              className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              {doc.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-1 md:ml-64 p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 border-b pb-4">
          Project Documentation
        </h1>

        {/* --- START: Hook Examples Grid --- */}
        {hookDocs.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Hook Examples
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {hookDocs.map((doc) => (
                <Link
                  key={`${doc.name}-example-link`}
                  href={`/examples/${doc.name}`} // Assumes examples live at /examples/hookName
                  className="block p-4 bg-white border border-gray-200 rounded-lg shadow-sm text-center font-medium text-blue-600 hover:bg-blue-50 hover:shadow-md hover:border-blue-300 transition-all duration-150 ease-in-out"
                  prefetch={false} // Optional: Disable prefetching if many links
                >
                  {doc.name} Example
                </Link>
              ))}
            </div>
          </section>
        )}
        {/* --- END: Hook Examples Grid --- */}

        {/* --- README Section (remains the same) --- */}
        {readmeContent ? (
          <div className="mb-12 bg-white border border-gray-300 rounded-md shadow">
            <div className="px-4 py-2 border-b border-gray-200 bg-gray-50 rounded-t-md">
              <h2 className="text-lg font-semibold text-gray-700">README.md</h2>
            </div>
            <section
              id="readme"
              className="p-6 prose prose-base max-w-none
                         prose-headings:font-semibold prose-headings:pb-1 prose-headings:border-b prose-headings:border-gray-200
                         prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
                         prose-a:text-blue-600 hover:prose-a:underline
                         prose-blockquote:border-l-blue-400 prose-blockquote:bg-blue-50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded
                         prose-code:bg-gray-100 prose-code:text-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm
                         prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-md prose-pre:overflow-x-auto
                         prose-img:rounded prose-img:inline-block
                         prose-table:border prose-table:border-collapse prose-th:border prose-th:p-2 prose-th:bg-gray-100 prose-td:border prose-td:p-2"
              style={{ scrollMarginTop: "80px" }}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {readmeContent}
              </ReactMarkdown>
            </section>
          </div>
        ) : (
          <p className="text-yellow-600 mb-8">Could not load README.md.</p>
        )}

        {/* --- Hooks Documentation Section (remains the same) --- */}
        {hookDocs.length > 0 && (
          <h2
            id="hook-documentation"
            className="text-3xl font-semibold text-gray-700 mb-6"
            style={{ scrollMarginTop: "80px" }}
          >
            Hook Documentation
          </h2>
        )}

        {/* --- Hooks List (remains the same) --- */}
        {hookDocs.length > 0 ? (
          <div className="space-y-12">
            {hookDocs.map((doc) => (
              <section
                key={doc.name}
                id={doc.name} // Used for sidebar linking
                className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm"
                style={{ scrollMarginTop: "80px" }}
              >
                {/* Section Title */}
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 !mt-0 border-b pb-2">
                  {doc.name}
                </h3>
                {/* Markdown Content */}
                <div className="prose prose-lg max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {doc.content}
                  </ReactMarkdown>
                </div>
              </section>
            ))}
          </div>
        ) : (
          !readmeContent && (
            <p className="text-red-500">Could not load any documentation.</p>
          )
        )}
      </main>
    </div>
  );
}

// Remember to install and configure @tailwindcss/typography if you haven't:
// 1. npm install -D @tailwindcss/typography
// 2. Add require('@tailwindcss/typography') to your tailwind.config.js plugins array.
