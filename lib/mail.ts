import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = 'https://auth-ts-sigma.vercel.app/'

export const sendPasswordResetEmail = async (
    email: string,
    token: string
) => {
    const resetLink = `${domain}/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: 'D2D GEORGIA <noreply@resend.dev>',
        to: email,
        subject: 'აღადგინეთ პაროლი',
        html: `<div><p>Click <a href="${resetLink}">here</a> to reset password.</p></div>`
    });

};


export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`;


    await resend.emails.send({
        from: 'D2D GEORGIA <noreply@resend.dev>',
        to: email,
        subject: 'დაადასტურეთ ელ.ფოსტა',
        html: `<div><p>Click <a href="${confirmLink}">here</a> to confirm email.</p></div>`
    });

};
