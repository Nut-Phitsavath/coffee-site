import Image from "next/image";
import { t, type ImageRef } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

type Props = { image: ImageRef; lang: Locale; sizes: string; priority?: boolean; className?: string };

/** A cropped photo in an aspect-ratio box (`className` sets the ratio). */
export function BeanImage({ image, lang, sizes, priority, className = "" }: Props) {
  return (
    <div className={`ph ${className}`}>
      <Image
        src={image.src}
        alt={image.alt ? t(image.alt, lang) : ""}
        fill
        sizes={sizes}
        loading={priority ? "eager" : undefined}
        fetchPriority={priority ? "high" : undefined}
      />
    </div>
  );
}
