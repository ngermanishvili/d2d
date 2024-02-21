import { UserRole } from "@prisma/client";
import * as z from "zod";

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "პაროლი უნდა შეიცავდეს არანაკლებ 6 სიმბოლოს",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "არასწორი ელ-ფოსტა",
  }),
  password: z.string().min(1, {
    message: "პაროლი უნდა შეიცავდეს მინიმუმ 1 სიმბოლოს კოკეხ",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "არასწორი ელ-ფოსტა",
  }),
});

export const RegisterSchema = z
  .object({
    email: z.string().email({
      message: "არასწორი ელ-ფოსტა",
    }),
    password: z.string().min(6, {
      message: "პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს კოკეხ",
    }),
    confirm: z.string().min(6, {
      message: "პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს კოკეხ",
    }),

    name: z.string().min(1, {
      message: "სახელი უნდა შეიცავდეს მინიმუმ 1 სიმბოლოს კოკეხ",
    }),
    number: z.string().min(1, {
      message: "min 1 nomriani ",
    }),
    userType: z.string().min(1, {
      message: "გთხოვთ აირჩიოთ ანგარიშის ტიპი ",
    }),

  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER, UserRole.COURIER, UserRole.ACCOUNTANT]),
    email: z.optional(z.string().email()),
    number: z.optional(z.string()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
    image: z.optional(
      z.string().refine((url) => url === "" || isValidUrl(url), {
        message: "Invalid URL",
      })
    ),
    userType: z.optional(z.string()),
    input1: z.optional(z.string()),
    input2: z.optional(z.string()),
    input3: z.optional(z.string()),
    input4: z.optional(z.string()),
    input5: z.optional(z.string()),
    input6: z.optional(z.string()),
    input7: z.optional(z.string()),
    input8: z.optional(z.string()),



  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );
