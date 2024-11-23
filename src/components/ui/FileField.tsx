import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { FieldError, FieldErrors, FieldValues } from "react-hook-form";

type FileFieldProps<T extends FieldValues> = {
  label: string;
  name: string;
  dir?: "rtl" | "ltr";
  value: string | number | readonly string[] | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
  className?: string;
  errors?: FieldErrors<T>;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function FileField<T extends FieldValues>({
  label,
  name,
  value,
  errors,
  dir = "rtl",
  onChange,
  className,
  isRequired = false,
  ...rest
}: FileFieldProps<T>) {
  return (
    <div className="textField">
      <label
        htmlFor="file-upload"
        className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-primary-900 px-3 py-2 text-primary-900 ${className}`}
      >
        {label} {isRequired && <span className="text-error">*</span>}
        <ArrowUpTrayIcon className="size-5" />
        <input
          id="file-upload"
          type="file"
          className="sr-only"
          name={name}
          dir={dir}
          value={value}
          onChange={(e) => onChange(e)}
          {...rest}
        />
      </label>
      {errors && errors[name] && (
        <span className="mt-2 block text-xs text-red-600">
          {(errors[name] as FieldError).message}
        </span>
      )}
    </div>
  );
}
