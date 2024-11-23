import {
  FieldError,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type SelectFieldProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  placeholder: string;
  options: { value: string; label: string }[];
  isRequired?: boolean;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export default function SelectField<T extends FieldValues>({
  label,
  name,
  register,
  options,
  errors,
  placeholder,
  isRequired = false,
  ...rest
}: SelectFieldProps<T>) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-secondary-700">
        {label} {isRequired && <span className="text-error">*</span>}
      </label>
      <select
        id={name}
        {...register(name)}
        className="textField__input"
        {...rest}
      >
        <option value="">
          {placeholder} {label}
        </option>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {errors && errors[name] && (
        <span className="mt-2 block text-xs text-red-600">
          {(errors[name] as FieldError).message}
        </span>
      )}
    </div>
  );
}
