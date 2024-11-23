import Image from "next/image";

type AvatarProps = {
  src: string | null;
  alt: string | null;
  width?: number;
  height?: number;
};

export default function Avatar({
  src,
  alt,
  width = 24,
  height = 24,
}: AvatarProps) {
  return (
    <Image
      src={src || "/images/avatar.png"}
      width={width}
      height={height}
      alt={alt || "avatar"}
      className="ml-2 rounded-full ring-1 ring-secondary-300"
    />
  );
}
