import HomeBlogSection from "@/components/Blog/HomeBlogSection";
import ScrollUp from "@/components/Common/ScrollUp";
import Hero from "@/components/Hero";
import { hookNames } from "@/const/const";
import { getAllPosts } from "@/utils/markdown";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Play Next.js - SaaS Starter Kit and Boilerplate for Next.js",
  description: "Free Next.js SaaS Boilerplate and Starter Kit designed and built for SaaS startups. It comes with all necessary integrations, pages, and components you need to launch a feature-rich SaaS websites.",
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
