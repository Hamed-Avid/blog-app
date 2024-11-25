import { useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
  UseFormSetValue,
} from "react-hook-form";
import FileField from "./FileField";
import Image from "next/image";
import ButtonIcon from "./ButtonIcon";
import { XMarkIcon } from "@heroicons/react/24/outline";

type UploadFileProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  setValue: UseFormSetValue<T>;
  errors?: FieldErrors<T>;
  errorMessage?: string;
  isRequired?: boolean;
  prevCoverImageUrl?: string;
};

export default function UploadFile<T extends FieldValues>({
  control,
  name,
  setValue,
  errors,
  errorMessage,
  isRequired = false,
  prevCoverImageUrl,
}: UploadFileProps<T>) {
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(
    prevCoverImageUrl || null,
  );

  const addHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (file: File) => void,
  ) => {
    const files = e.target.files;
    if (files && files[0]) {
      onChange(files[0]);
      setCoverImageUrl(URL.createObjectURL(files[0]));
    }
  };

  const clearHandler = () => {
    setCoverImageUrl(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setValue(name, null as any);
  };

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{ required: errorMessage }}
        render={({ field: { onChange, value, ...rest } }) => (
          <FileField<T>
            type="file"
            label="کاور پست"
            errors={errors}
            value={value?.fileName}
            onChange={(e) => addHandler(e, onChange)}
            isRequired={isRequired}
            {...rest}
          />
        )}
      />

      {coverImageUrl && (
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image
            fill
            src={coverImageUrl}
            alt="cover-image"
            className="object-cover object-center"
          />
          <ButtonIcon
            variant="red"
            onClick={clearHandler}
            className="absolute left-4 top-4 size-6"
          >
            <XMarkIcon />
          </ButtonIcon>
        </div>
      )}
    </>
  );
}
