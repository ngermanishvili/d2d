"use client"
import * as z from "zod"

import { useTransition, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"


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
import { ResetSchema } from "@/schemas"
import { Button } from "../ui/button"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { reset } from "@/actions/reset"


export const ResetForm = () => {


    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        },
    });


    // aq shegvidzlia gamovikenot axios axla vikenebt next servers logebistvis da shenaxvistvis infosi.
    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            reset(values)
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
                    headerLabel="დაგავიწყდა პაროლი?"
                    backButtonLabel="უკან დაბრუნება"
                    backButtonHref="/auth/login"
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
                                                    placeholder="შეიყვანეთ ელ-ფოსტა "
                                                    type="email"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                            </div>
                            <FormError message={error} />
                            <FormSuccess message={success} />

                            <Button
                                typeof="submit"
                                className="w-full"
                                disabled={isPending}
                            >
                                პაროლის აღდგენა
                            </Button>
                        </form>
                    </Form>
                </CardWrapper >
            </div>
        </>
    )
}

