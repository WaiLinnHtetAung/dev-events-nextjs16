"use client";

import dynamic from "next/dynamic";

const LightRays = dynamic(() => import("./LightRays"), {
  ssr: false,
});

export default function LightRaysWrapper(props: any) {
  return <LightRays {...props} />;
}
