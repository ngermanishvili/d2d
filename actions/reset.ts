"use server"

import * as z from "zod"

import { ResetSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"
import { sendPasswordResetEmail } from "@/lib/mail"
import { generatePasswordResetToken } from "@/lib/tokens"


export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "არასწორი ელ-ფოსტა" }
    }
    const { email } = validatedFields.data;
    const existingUser = await getUserByEmail(email)

    if (!existingUser) {
        return { error: " ელ-ფოსტა ვერ მოიძებნა" }
    }


    const PasswordResetToken = await generatePasswordResetToken(email)
    await sendPasswordResetEmail(PasswordResetToken.email, PasswordResetToken.token)

    return { success: "გთხოვთ შეამოწმოთ ელ-ფოსტა" }
}