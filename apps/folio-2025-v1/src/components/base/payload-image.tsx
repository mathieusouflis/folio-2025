"use client";

import Image from "next/image";

const IS_PRODUCTION = process.env.APP_ENV === "production";

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
