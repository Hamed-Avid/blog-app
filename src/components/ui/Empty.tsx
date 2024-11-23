type EmptyProps = {
  resourceName: string;
};

export default function Empty({ resourceName }: EmptyProps) {
  return (
    <p className="font-bold text-secondary-700"> {resourceName} یافت نشد.</p>
  );
}
