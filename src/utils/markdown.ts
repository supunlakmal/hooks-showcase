// Base URL for fetching markdown content
const baseUrl =
  "https://raw.githubusercontent.com/supunlakmal/hooks/refs/heads/main/docs/";

export async function fetchMarkdownContent(hookName: string) {
  function processImages(content: string) {
    // Replace image paths with actual HTML image tags
    return content.replace(/!\[.*?\]\((.*?)\)/g, '<img src="$1" alt="" />');
  }

  try {
    // Fetch the markdown content from GitHub
    const url = `${baseUrl}${hookName}.md`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }

    const content = await response.text();

    // Return a post object with the content and the slug as the title
    return {
      title: hookName,
      slug: hookName,
      content: processImages(content),
      excerpt: content.slice(0, 150) + "...",
      date: new Date().toISOString(), // Default date since not available in raw MD
      coverImage: `/images/blog/sample.jpg`, // Assuming the image is named after the hook
    };
  } catch (error) {
    console.error(`Error fetching hook ${hookName}:`, error);
    return {
      title: hookName,
      slug: hookName,
      content: "Failed to load content",
      excerpt: "Failed to load content",
      date: new Date().toISOString(),
    };
  }
}

export async function getAllPosts(hookNames: string[]) {
  try {
    // Fetch all posts in parallel for better performance
    const postsPromises = hookNames.map((hookName) =>
      fetchMarkdownContent(hookName),
    );
    return await Promise.all(postsPromises);
  } catch (error) {
    console.error("Error fetching all posts:", error);
    return [];
  }
}
