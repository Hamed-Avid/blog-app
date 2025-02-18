import { useFormStatus } from "react-dom";
import Button from "./Button";
import SvgComponent from "./SvgComponent";

type SubmitButtonProps = {
  children: React.ReactNode;
  className: string;
  variant?: "primary" | "secondary" | "outline" | "danger";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function SubmitButton({
  children,
  className,
  variant = "primary",
  ...rest
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      {...rest}
      variant={variant}
      disabled={pending}
      className={`flex items-center justify-center gap-x-4 py-4 ${className} `}
    >
      {pending ? <SvgComponent /> : children}
    </Button>
  );
}
