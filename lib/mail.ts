import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendPasswordResetEmail = async (
    email: string,
    token: string,
) => {
    const resetLink = `${domain}/auth/new-password?token=${token}`

    await resend.emails.send({
        from: 'D2D GEORGIA <info@d2d.ge>',
        to: email,
        subject: "Reset your password",
        html: `<div style="text-align: center; background-color: #f0f0f0; padding: 10px;">
        <h1>პაროლის აღდგენა</h1>
        <img src="https://wesupplylabs.com/wp-content/uploads/2022/09/out-for-delivery-meaning-featured.webp" alt="D2D GEORGIA" style="width: 250px; height: 250pxpx; object-fit: cover; border-radius: 50%; margin: 0 auto;" >
        <p style="font-size: 16px;">დააკლიკეთ <a href="${resetLink}" style="color: #0077cc; text-decoration: none;">ლინკს</a> რომ შეცვალოთ თქვენი პაროლი</p>
        <p style="font-size: 16px;">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
    </div>`
    });
};


export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: 'D2D GEORGIA <info@d2d.ge>',
        to: email,
        subject: 'დაადასტურეთ ელ.ფოსტა',
        html: `<div style="text-align: center; background-color: #f0f0f0; padding: 10px;">
        <h1>გთხოვთ დაადასტუროთ ელ-ფოსტა</h1>
        <img src="https://wesupplylabs.com/wp-content/uploads/2022/09/out-for-delivery-meaning-featured.webp" alt="D2D GEORGIA" style="width: 250px; height: 250pxpx; object-fit: cover; border-radius: 50%; margin: 0 auto;" >
        <p style="font-size: 16px;">დააკლიკეთ <a href="${confirmLink}" style="color: #0077cc; text-decoration: none;">ლინკს</a> რომ დაადასტუროთ თქვენი ელ-ფოსტა</p>
        <p style="font-size: 16px;">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
    </div>`
    });

};
