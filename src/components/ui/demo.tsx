'use client';

import { useId } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";

export function SplineSceneBasic() {
  const titleId = useId();
  const reduceMotion = useReducedMotion();

  return (
    <Card
      role="region"
      aria-labelledby={titleId}
      className="relative min-h-[720px] w-full overflow-hidden rounded-none border-white/12 bg-[#10110f] text-[#f1efe8] shadow-none md:min-h-[620px]"
    >
      <Spotlight className="-left-[72%] -top-[48%] sm:-left-[38%] md:-left-[10%] md:-top-[28%]" fill="#ffffff" />

      <div className="relative z-10 grid min-h-[720px] grid-rows-[auto_minmax(360px,1fr)] md:min-h-[620px] md:grid-cols-[0.85fr_1.15fr] md:grid-rows-1">
        <div className="flex flex-col justify-center border-b border-white/12 px-6 py-12 sm:px-10 md:border-b-0 md:border-r md:px-12">
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-[#c7ff3d]">Interactive / 3D</p>
          <h2 id={titleId} className="mt-8 max-w-lg font-display text-[clamp(2.4rem,11vw,3.2rem)] font-semibold leading-[0.9] tracking-[-0.07em] sm:text-6xl">
            AIを、
            <span className="block text-[#c7ff3d]">動く仕組みに。</span>
          </h2>
          <p className="mt-7 max-w-md text-sm leading-7 text-white/50 sm:text-base sm:leading-8">
            研究とインタラクションの交点。3Dシーンを通して、複雑な技術を直感的な体験へ変換します。
          </p>
          <div className="mt-10 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.16em] text-white/38">
            Drag to explore <ArrowDownRight size={14} />
          </div>
        </div>

        <div aria-hidden="true" className="relative min-h-[360px] overflow-hidden">
          <div className="spline-interactive absolute inset-0">
            {reduceMotion ? (
              <div className="editorial-grid-dark grid h-full place-items-center bg-[#10110f] font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
                3D scene paused
              </div>
            ) : (
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="h-full w-full"
              />
            )}
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#10110f] to-transparent md:inset-y-0 md:left-0 md:h-auto md:w-24 md:bg-gradient-to-r" />
        </div>
      </div>
    </Card>
  );
}
