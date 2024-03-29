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
        html: `<div style="text-align: center; background-color: #FFEAA7; padding: 10px;">
        <h1>პაროლის აღდგენა</h1>
        <p style="font-size: 18px;">დააკლიკეთ <a href="${resetLink}" style="color: #0077cc; text-decoration: none;">ლინკს</a> რომ შეცვალოთ თქვენი პაროლი</p>
        <img src="https://www.theboxery.com/blog/wp-content/uploads/2023/06/Blog6.jpg" alt="D2D GEORGIA" style="width: 700px; height: 400px; object-fit: cover;  margin: 0 auto;" >
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
        html: `<div style="text-align: center; background-color: #FFEAA7; padding: 10px;">
        <h1>გთხოვთ დაადასტუროთ ელ-ფოსტა</h1>
        <p style="font-size: 18px;">დააკლიკეთ <a href="${confirmLink}" style="color: #0077cc; text-decoration: none;">ლინკს</a> რომ დაადასტუროთ თქვენი ელ-ფოსტა</p>
        <img src="https://www.theboxery.com/blog/wp-content/uploads/2023/06/Blog6.jpg" alt="D2D GEORGIA" style="width: 700px; height: 400px; object-fit: cover;  margin: 0 auto;" >
    </div>`
    });

};
