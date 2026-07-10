'use client';

import { Suspense, lazy, useState } from "react";
import { cn } from "@/lib/utils";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

function SplineLoader() {
  return (
    <div
      className="absolute inset-0 z-20 flex items-center justify-center bg-[#050605]"
      role="status"
      aria-live="polite"
    >
      <div aria-hidden="true" className="w-32">
        <span className="block font-mono text-[8px] uppercase tracking-[0.22em] text-white/35">Loading scene</span>
        <span className="mt-3 block h-px overflow-hidden bg-white/12">
          <span className="block h-full w-1/2 animate-pulse bg-[#c7ff3d]" />
        </span>
      </div>
      <span className="sr-only">3Dシーンを読み込んでいます</span>
    </div>
  );
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [isSceneLoading, setIsSceneLoading] = useState(true);

  return (
    <div
      className={cn("relative isolate overflow-hidden", className)}
      aria-busy={isSceneLoading}
    >
      <Suspense fallback={<SplineLoader />}>
        <Spline
          scene={scene}
          className="h-full w-full"
          onLoad={() => setIsSceneLoading(false)}
        />
        {isSceneLoading && <SplineLoader />}
      </Suspense>
    </div>
  );
}
