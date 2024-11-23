import * as yup from "yup";

const errorMessages = {
  name: "نام و نام خانوادگی نامعتبر است",
  email: "ایمیل نامعتبر است",
  required: (field: string) => `${field} ضروری است`,
  minLength: (field: string, min: number) =>
    `${field} باید حداقل ${min} کاراکتر باشد`,
  typeError: "یک عدد را وارد کنید",
};

export const signupSchema = yup
  .object({
    name: yup
      .string()
      .min(5, errorMessages.name)
      .max(30, errorMessages.name)
      .required(errorMessages.required("نام و نام خانوادگی")),
    email: yup
      .string()
      .email(errorMessages.email)
      .required(errorMessages.required("ایمیل")),
    password: yup.string().required(errorMessages.required("رمز عبور")),
  })
  .required();

export const signinSchema = yup
  .object({
    email: yup
      .string()
      .email(errorMessages.email)
      .required(errorMessages.required("ایمیل")),
    password: yup.string().required(errorMessages.required("رمز عبور")),
  })
  .required();

export const postSchema = yup
  .object({
    title: yup
      .string()
      .min(5, errorMessages.minLength("عنوان", 5))
      .required(errorMessages.required("عنوان")),
    briefText: yup
      .string()
      .min(10, errorMessages.minLength("متن کوتاه", 10))
      .required(errorMessages.required("متن کوتاه")),
    text: yup
      .string()
      .min(10, errorMessages.minLength("متن", 10))
      .required(errorMessages.required("متن")),
    slug: yup.string().required(errorMessages.required("اسلاگ")),
    readingTime: yup
      .number()
      .positive()
      .typeError(errorMessages.typeError)
      .required(errorMessages.required("زمان مطالعه")),
    category: yup.string().required(errorMessages.required("دسته بندی")),
    coverImage: yup.string().required(errorMessages.required("کاور پست")),
  })
  .required();
