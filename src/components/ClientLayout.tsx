"use client";

import React from "react";
import dynamic from "next/dynamic";
import FloatingParticles from "./FloatingParticles";
import GrainOverlay from "./GrainOverlay";

const CustomCursor = dynamic(() => import("./CustomCursor"), { ssr: false });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />
      <FloatingParticles count={25} />
      <GrainOverlay />
      {children}
    </>
  );
}
