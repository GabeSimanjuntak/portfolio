"use client";

import dynamic from "next/dynamic";
import ScrollProgress from "@/components/effects/ScrollProgress";

const CustomCursor = dynamic(
  () => import("@/components/effects/CustomCursor"),
  { ssr: false }
);

export default function ClientEffects() {
  return (
    <>
      <ScrollProgress />
      <CustomCursor />
    </>
  );
}
