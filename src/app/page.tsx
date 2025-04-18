import HomeBlogSection from "@/components/Blog/HomeBlogSection";
import ScrollUp from "@/components/Common/ScrollUp";
import Hero from "@/components/Hero";
import { hookNames } from "@/const/const";
import { getAllPosts } from "@/utils/markdown";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "@supunlakmal/hooks: Comprehensive TypeScript React Hooks Collection",
  description: "Explore @supunlakmal/hooks, a library of 60+ production-ready, reusable React hooks written in TypeScript. Simplify UI patterns, browser APIs, state, effects, and performance optimizations. Type-safe, SSR compatible, and easy to integrate.",
};

export default async function Home() {

  const posts = await getAllPosts(hookNames);

  return (
    <main>
      <ScrollUp />
      <Hero />
      {/* <Features /> */}
      {/* <About /> */}
      {/* <CallToAction /> */}
      {/* <Pricing /> */}
      {/* <Testimonials /> */}
      {/* <Faq /> */}
      {/* <Team /> */}
      <Suspense fallback={<div className="container mx-auto px-4 py-16">Loading blog posts...</div>}>
        <HomeBlogSection posts={posts} />
      </Suspense>
      {/* <Contact /> */}
      {/* <Clients /> */}
    </main>
  );
}
