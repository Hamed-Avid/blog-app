import Avatar from "@/ui/Avatar";

type AuthorProps = {
  src: string;
  name: string;
};

export default function Author({ src, name }: AuthorProps) {
  return (
    <div className="flex items-center gap-1">
      <Avatar src={src} alt={name} />
      <span className="text-sm text-secondary-500">{name}</span>
    </div>
  );
}
