"use client"
import * as z from "zod"

import { useTransition, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"


import { CardWrapper } from "./card-wrapper"
import { Input } from "../ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { LoginSchema } from "@/schemas"
import { Button } from "../ui/button"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { login } from "@/actions/login"
import Link from "next/link"


export const LoginForm = () => {
    const searchParams = useSearchParams();
    const urlError = searchParams.get("error")
        ===
        "OAuthAccountNotLinked"
        ? "Email Already in use  with different provider" :
        "";

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });


    // aq shegvidzlia gamovikenot axios axla vikenebt next servers logebistvis da shenaxvistvis infosi.
    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            login(values)
                .then((data) => {
                    setError(data?.error)
                    setSuccess(data?.success)

                })
        })
    };

    return (
        <>
            <div className=" mt-5 flex items-center justify-center p-[60px]">
                <CardWrapper
                    headerLabel="ავტორიზაცია"
                    backButtonLabel="ჯერ არ გაქვთ ანგარიში?"
                    backButtonHref="/auth/register"
                // showSocial
                >
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>ელ-ფოსტა</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="john.doe@example.com"
                                                    type="email"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    disabled={isPending}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>პაროლი</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="******"
                                                    type="password"
                                                />
                                            </FormControl>
                                            <Button size='sm' variant='link' asChild className="px-0 font-normal">
                                                <Link href="/auth/reset">
                                                    დაგავიწყდა პაროლი?
                                                </Link>
                                            </Button>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>
                            <FormError message={error || urlError} />
                            <FormSuccess message={success} />

                            <Button
                                typeof="submit"
                                className="w-full"
                                disabled={isPending}
                            >
                                ავტორიზაცია
                            </Button>
                        </form>
                    </Form>
                </CardWrapper >
            </div>
        </>
    )

}

