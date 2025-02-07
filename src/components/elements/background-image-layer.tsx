/* eslint-disable @next/next/no-img-element */
import React from "react";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { ImageSchema } from "@/lib/validation/image-schema";

export function BackgroundImageLayer({
  image,
  className = "",
}: {
  image: z.infer<typeof ImageSchema>;
  className?: string;
}) {
  const isPattern = image.source.src.startsWith('data:image/svg+xml');

  return (
    <div
      className={cn(
        "w-full h-full absolute top-0 left-0 right-0 bottom-0",
        className
      )}
      style={{
        backgroundImage: isPattern ? `url(${image.source.src})` : undefined,
        backgroundSize: isPattern ? "80px 80px" : undefined,
        backgroundRepeat: isPattern ? "repeat" : undefined,
        backgroundPosition: isPattern ? "center" : undefined,
        opacity: isPattern ? image.style.opacity / 100 : undefined,
      }}
    >
      {!isPattern && (
        <img
          alt="background image"
          src={image.source.src}
          className={cn("overflow-hidden object-cover w-full h-full")}
          style={{
            opacity: image.style.opacity / 100,
          }}
        />
      )}
    </div>
  );
}
