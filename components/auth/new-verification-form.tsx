"use client"

import { useCallback, useEffect, useState } from "react"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { useSearchParams } from "next/navigation"
import { BeatLoader } from "react-spinners"
import { newVerification } from "@/actions/new-verification"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"


export const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams();

    const token = searchParams.get("token");


    // we are using useCallback here to prevent the function from being recreated on every render and after that we are using useEffect to run the function when the component is mounted
    const onSubmit = useCallback(() => {
        if (success || error) return;

        if (!token) {
            setError("Missing token");
            return;
        }
        newVerification(token)
            .then((data) => {
                setSuccess(data.success);
                setError(data.error);
            })
            .catch(() => {
                setError("Something went wrong");

            })
    }, [token, success, error])


    // This is a hook that runs when the component is mounted
    useEffect(() => {
        onSubmit();
    }, [onSubmit])


    return (
        <CardWrapper
            headerLabel="Confirming your verification"
            backButtonHref="/auth/login"
            backButtonLabel="back to login"
        >
            <div className="flex items-center w-full justify-center">
                {!success && !error && (
                    <BeatLoader />
                )}
                <FormSuccess message={success} />
                {!success && (
                    <FormError message={error} />
                )}
            </div>
        </CardWrapper>
    )
}