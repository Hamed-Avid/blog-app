import { useFormStatus } from "react-dom";
import Button from "./Button";
import SvgComponent from "./SvgComponent";

type SubmitButtonProps = {
  children: React.ReactNode;
  className: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function SubmitButton({
  children,
  className,
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      {...props}
      disabled={pending}
      className={`flex items-center justify-center gap-x-4 py-4 ${className} `}
    >
      {pending ? <SvgComponent /> : children}
    </Button>
  );
}
