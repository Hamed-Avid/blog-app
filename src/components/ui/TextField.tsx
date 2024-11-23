import {
  FieldError,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type TextFieldProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  dir?: "rtl" | "ltr";
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  className?: string;
  isRequired?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function TextField<T extends FieldValues>({
  type = "text",
  label,
  name,
  dir = "rtl",
  register,
  errors,
  isRequired,
  ...rest
}: TextFieldProps<T>) {
  return (
    <div className="textField relative">
      <label htmlFor={name} className="mb-2 block text-secondary-700">
        {label} {isRequired && <span className="text-error">*</span>}
      </label>
      <input
        id={name}
        dir={dir}
        type={type}
        autoComplete="off"
        className={`textField__input ${
          dir === "ltr" ? "text-left" : "text-right"
        } ${errors && errors[name] ? "border-error" : ""}`}
        {...register(name)}
        {...rest}
      />
      {errors && errors[name] && (
        <span className="mt-2 block text-xs text-red-600">
          {(errors[name] as FieldError).message}
        </span>
      )}
    </div>
  );
}
