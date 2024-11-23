type TextAreaFiledProps = {
  label: string;
  name: string;
  value: string;
  dir?: "rtl" | "ltr";
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isRequired: boolean;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextAreaFiled({
  label,
  name,
  value,
  dir = "rtl",
  onChange,
  isRequired = false,
  ...rest
}: TextAreaFiledProps) {
  return (
    <div className="textField">
      <label htmlFor={name} className="text-sm text-secondary-600">
        {label}
        {isRequired && <span className="text-error">*</span>}
      </label>
      <textarea
        name={name}
        id={name}
        dir={dir}
        className={`textField__input mt-2 min-h-[150px] leading-8 ${
          dir === "ltr" ? "text-left" : "text-right"
        }`}
        value={value}
        onChange={onChange}
        {...rest}
      ></textarea>
    </div>
  );
}
