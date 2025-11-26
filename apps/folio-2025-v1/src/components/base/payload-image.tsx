"use client";

import { IS_PRODUCTION } from "@/lib/env-client";
import Image from "next/image";


const simpleImageLoader = ({src}: {src: any}) => {
  return src;
}


export function PayloadImage(props: React.ComponentProps<typeof Image>) {

  const productionProps = IS_PRODUCTION ? {
    loader: simpleImageLoader,
    unoptimized: true,
  } : {}


  return (
    <Image
      {...props}
      {...productionProps}
    />
  );
}
