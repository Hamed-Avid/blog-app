type ButtonIconProps = {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  variant?: keyof typeof btnType;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const btnType = {
  primary:
    "bg-primary-100 text-primary-700 hover:bg-primary-900 hover:text-white",
  secondary:
    "bg-secondary-200  text-secondary-500 hover:bg-secondary-500 hover:text-secondary-0",
  outline:
    "border border-secondary-200 text-secondary-500 hover:bg-secondary-200",
  red: "bg-red-100  text-red-500 hover:bg-red-500 hover:text-white",
  danger: "border border-red-100 text-red-500",
};

export default function ButtonIcon({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  ...rest
}: ButtonIconProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${btnType[variant]} flex items-center justify-center gap-x-1 rounded-md p-1 text-xs transition-all duration-300 ease-out lg:text-sm [&>svg]:size-4 [&>svg]:text-inherit ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
