"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  CSSProperties,
  useRef,
} from "react";
// Adjust path if necessary


interface Item {
  id: number;
  name: string;
  color: string;
}

// Simulate fetching data with pagination
const fetchItems = async (
  page: number,
  limit: number = 15 // Fetch more items per page for better visual effect
): Promise<{ items: Item[]; hasNextPage: boolean }> => {
  console.log(`[API] Fetching page ${page} (limit ${limit})...`);
  await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate network delay

  const totalItems = 100; // Total items available
  const startId = (page - 1) * limit + 1;
  const endId = Math.min(startId + limit - 1, totalItems);

  if (startId > totalItems) {
    console.log("[API] No more items to fetch.");
    return { items: [], hasNextPage: false };
  }

  const items = Array.from({ length: endId - startId + 1 }, (_, i) => ({
    id: startId + i,
    name: `Item #${startId + i}`,
    // Generate a pseudo-random color based on ID
    color: `hsl(${((startId + i) * 15) % 360}, 70%, 85%)`,
  }));

  const hasNextPage = endId < totalItems;
  console.log(
    `[API] Fetched ${items.length} items. Has next page: ${hasNextPage}`
  );
  return { items, hasNextPage };
};

function InfiniteScrollExamplePage() {
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null); // Ref for the scrollable container

  const loadMoreItems = useCallback(async () => {
    // Prevent multiple simultaneous loads or loading when there's no more data
    if (loading || !hasNextPage) {
      console.log(
        `Load more skipped (Loading: ${loading}, HasNext: ${hasNextPage})`
      );
      return;
    }

    setLoading(true);
    try {
      const { items: newItems, hasNextPage: morePages } = await fetchItems(
        page
      );
      setItems((prevItems) => [...prevItems, ...newItems]);
      setPage((prevPage) => prevPage + 1);
      setHasNextPage(morePages);
    } catch (error) {
      console.error("Failed to fetch items:", error);
      // Consider setting an error state here
    } finally {
      setLoading(false);
    }
  }, [loading, hasNextPage, page]);

  // Initialize the infinite scroll hook
  const infiniteScrollRef = useInfiniteScroll<HTMLDivElement>({
    loading,
    hasNextPage,
    onLoadMore: loadMoreItems,
    // Optional: Use the scrollable div as the root instead of viewport
    root: scrollContainerRef.current,
    rootMargin: "0px 0px 100px 0px", // Load 100px before the bottom
    threshold: 0.1, // Needs at least 10% visibility
  });

  // Load initial data on mount
  useEffect(() => {
    loadMoreItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Load only once initially

  // Styling
  const containerStyle: CSSProperties = {
    padding: "20px",
  };
  const scrollBoxStyle: CSSProperties = {
    height: "500px",
    overflowY: "auto",
    border: "2px solid steelblue",
    borderRadius: "8px",
    padding: "10px",
    background: "#f0f8ff",
  };
  const itemStyle = (color: string): CSSProperties => ({
    padding: "25px 15px",
    margin: "10px 0",
    border: `1px solid ${color.replace("85%", "65%")}`,
    borderRadius: "4px",
    backgroundColor: color,
    textAlign: "center",
    fontSize: "1.1em",
  });
  const loaderStyle: CSSProperties = {
    height: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#555",
    fontSize: "1.1em",
    padding: "20px",
  };

  return (
    <div style={containerStyle}>
      <h1>useInfiniteScroll Example</h1>
      <p>Scroll down inside the blue box to load more items.</p>

      {/* The scrollable container */}
      <div ref={scrollContainerRef} style={scrollBoxStyle}>
        {items.map((item) => (
          <div key={item.id} style={itemStyle(item.color)}>
            {item.name}
          </div>
        ))}

        {/* Loader/End Message - Ref is attached here */}
        <div ref={infiniteScrollRef} style={loaderStyle}>
          {loading && "Loading more items..."}
          {!loading &&
            !hasNextPage &&
            items.length > 0 &&
            "End of list reached."}
        </div>
      </div>
    </div>
  );
}

export default InfiniteScrollExamplePage;
