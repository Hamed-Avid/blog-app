type ButtonProps = {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "primary" | "secondary" | "outline" | "danger";
  className?: string;
  isLoading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const btnType = {
  primary: "btn--primary",
  secondary: "btn--secondary",
  outline: "btn--outline",
  danger: "btn--danger",
};

export default function Button({
  children,
  onClick,
  className,
  isLoading = false,
  variant = "primary",
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn ${btnType[variant]} ${className} ${isLoading ? "spinner-mini bg-opacity-30" : ""}`}
      {...rest}
    >
      {!isLoading && children}
    </button>
  );
}
