import Image from "next/image";
import Link from "next/link";

type CoverImageProps = { src: string; alt: string; slug: string };

export default function CoverImage({ src, alt, slug }: CoverImageProps) {
  return (
    <Link
      href={`/blogs/${slug}`}
      className="relative mb-6 aspect-video overflow-hidden rounded-md"
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority
        quality={90}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover object-center transition-all duration-300 ease-out hover:scale-110"
      />
    </Link>
  );
}
