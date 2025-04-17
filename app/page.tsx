"use client";

import React from "react";
import Link from "next/link";

// List of hook example names (derived from directory names)
const hookExamples = [
  "useAnimation",
  "useAsync",
  "useBreakpoint",
  "useBroadcastChannel",
  "useCachedFetch",
  "useClickOutside",
  "useClipboard",
  "useContextMenu",
  "useCopyToClipboard",
  "useCountdown",
  "useDarkMode",
  "useDebounce",
  "useDeepCompareEffect",
  "useDerivedState",
  "useDeviceMotion",
  "useDeviceOrientation",
  "useDrag",
  "useDraggable",
  "useElementSize",
  "useErrorBoundary",
  "useEventListener",
  "useExportToExcel",
  "useFetch",
  "useFiniteStateMachine",
  "useFocusTrap",
  "useForm",
  "useFormValidation",
  "useFullscreen",
  "useGeolocation",
  "useHover",
  "useIdleTimer",
  "useInfiniteScroll",
  "useIntersectionObserver",
  "useInterval",
  "useIsFirstRender",
  "useKeyCombo",
  "useKeyPress",
  "useLocalStorage",
  "useLogger",
  "useLongPress",
  "useMap",
  "useMediaQuery",
  "useMergeRefs",
  "useMobile",
  "useMount",
  "useMutation",
  "useNetworkSpeed",
  "useOnlineStatus",
  "usePageVisibility",
  "usePagination",
  "usePermission",
  "usePortal",
  "usePrevious",
  "useQueryParam",
  "useReducerLogger",
  "useRenderCount",
  "useResizeObserver",
  "useRouteChange",
  "useRovingTabIndex",
  "useScrollPosition",
  "useScrollSpy",
  "useScrollToTop",
  "useSessionStorage",
  "useSet",
  "useStepper",
  "useStateWithHistory",
  "useSwipe",
  "useTimeout",
  "useToggle",
  "useTranslation",
  "useThrottle",
  "useUnmount",
  "useUpdateEffect",
  "useVirtualList",
  "useVisibility",
  "useWebSocket",
  "useWhyDidYouUpdate",
  "useWindowSize",
].sort(); // Sort alphabetically

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">
            React Custom Hooks Showcase
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Explore a collection of custom React hooks with live examples,
            crafted with Tailwind CSS.
          </p>
        </header>

        {/* Grid Container */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hookExamples.map((hookName) => (
            <Link
              key={hookName}
              href={`/examples/${hookName}`}
              className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow duration-200 hover:border-gray-300"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-indigo-600">
                  {hookName}
                </h2>
              </div>
              <p className="text-sm text-gray-500">
                Explore the <strong>{hookName}</strong> hook example.
              </p>
              <button className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-150">
                View Example
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
