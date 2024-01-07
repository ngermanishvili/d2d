import { UserRole } from "@prisma/client";
import * as z from "zod"


export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "პაროლი უნდა შეიცავდეს არანაკლებ 6 სიმბოლოს",
    }),
})

export const LoginSchema = z.object({
    email: z.string().email({
        message: "არასწორი ელ-ფოსტა",
    }),
    password: z.string().min(1, {
        message: "პაროლი უნდა შეიცავდეს მინიმუმ 1 სიმბოლოს კოკეხ",
    }),
})

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
});


export const RegisterSchema = z.object({
    email: z.string().email({
        message: "არასწორი ელ-ფოსტა",
    }),
    password: z.string().min(6, {
        message: "პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს კოკეხ",
    }),
    name: z.string().min(1, {
        message: "სახელი უნდა შეიცავდეს მინიმუმ 1 სიმბოლოს კოკეხ",
    })
})


export const SettingsSchema = z.object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER, UserRole.COURIER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
})
    .refine((data) => {
        if (data.password && !data.newPassword) {
            return false;
        }

        return true;
    }, {
        message: "New password is required!",
        path: ["newPassword"]
    })
    .refine((data) => {
        if (data.newPassword && !data.password) {
            return false;
        }

        return true;
    }, {
        message: "Password is required!",
        path: ["password"]
    })