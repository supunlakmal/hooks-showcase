// Assuming this file is located at `pages/_document.js` or a similar head management location
// If you are using the Next.js App Router (`app` directory), the `metadata` export is preferred.
import Script from 'next/script'; // Import the Script component

export default function Head() {
  return (
    <>
      {/* Updated Title */}
      <title>
        @supunlakmal/hooks: Comprehensive TypeScript React Hooks Collection
      </title>

      {/* Standard Viewport Meta - Keep this */}
      <meta content="width=device-width, initial-scale=1" name="viewport" />

      {/* Updated Description Meta */}
      <meta
        name="description"
        content="Explore @supunlakmal/hooks, a library of 60+ production-ready, reusable React hooks written in TypeScript. Simplify UI patterns, browser APIs, state, effects, and performance optimizations. Type-safe, SSR compatible, and easy to integrate."
      />
      <meta
        name="keywords"
        content="React, Hooks, TypeScript, Custom Hooks, React Hooks Library, useDebounce, useAsync, useWindowSize, useLocalStorage, State Management, Browser API, Performance, Utility Hooks, supunlakmal, front-end, web development"
      />
      {/* Favicon Link - Keep or update path if necessary */}
      <link rel="icon" href="/images/favicon.ico" />

      {/* Optional: Add meta tags corresponding to keywords, Open Graph, Twitter from the metadata object if needed here */}
      {/* Example for keywords: */}
      {/* <meta name="keywords" content="React, Hooks, TypeScript, Custom Hooks, useDebounce, supunlakmal" /> */}

      {/* Example for Open Graph: */}
      {/* <meta property="og:title" content="@supunlakmal/hooks: Comprehensive TypeScript React Hooks Collection" /> */}
      {/* <meta property="og:description" content="A library of 60+ production-ready, reusable React hooks in TypeScript to simplify development." /> */}
      {/* <meta property="og:type" content="website" /> */}
      {/* <meta property="og:url" content="https://your-project-url.com" /> */}
      {/* <meta property="og:image" content="https://your-project-url.com/og-image.png" /> */}

      {/* Example for Twitter Card: */}
      {/* <meta name="twitter:card" content="summary_large_image" /> */}
      {/* <meta name="twitter:title" content="@supunlakmal/hooks: Comprehensive TypeScript React Hooks Collection" /> */}
      {/* <meta name="twitter:description" content="A library of 60+ production-ready, reusable React hooks in TypeScript to simplify development." /> */}
      {/* <meta name="twitter:image" content="https://your-project-url.com/og-image.png" /> */}

      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NH4TFZQS');
        `}
      </Script>
    </>
  );
}