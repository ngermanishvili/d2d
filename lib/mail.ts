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
        html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`
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
        html: `<div class="div">
        <div class="div-2">
            <img loading="lazy"
                srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/c84ccfb1a711c30467919ec5c5b1e7e94b8d90779ffd06ce4893ef7051a2677d?apiKey=51bfafa4352f47b3b624fa2aa0dc0ef4&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/c84ccfb1a711c30467919ec5c5b1e7e94b8d90779ffd06ce4893ef7051a2677d?apiKey=51bfafa4352f47b3b624fa2aa0dc0ef4&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c84ccfb1a711c30467919ec5c5b1e7e94b8d90779ffd06ce4893ef7051a2677d?apiKey=51bfafa4352f47b3b624fa2aa0dc0ef4&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/c84ccfb1a711c30467919ec5c5b1e7e94b8d90779ffd06ce4893ef7051a2677d?apiKey=51bfafa4352f47b3b624fa2aa0dc0ef4&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/c84ccfb1a711c30467919ec5c5b1e7e94b8d90779ffd06ce4893ef7051a2677d?apiKey=51bfafa4352f47b3b624fa2aa0dc0ef4&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c84ccfb1a711c30467919ec5c5b1e7e94b8d90779ffd06ce4893ef7051a2677d?apiKey=51bfafa4352f47b3b624fa2aa0dc0ef4&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/c84ccfb1a711c30467919ec5c5b1e7e94b8d90779ffd06ce4893ef7051a2677d?apiKey=51bfafa4352f47b3b624fa2aa0dc0ef4&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/c84ccfb1a711c30467919ec5c5b1e7e94b8d90779ffd06ce4893ef7051a2677d?apiKey=51bfafa4352f47b3b624fa2aa0dc0ef4&"
                class="img" />
        </div>
        <span class="span">
            <div class="div-3">Amet minim mollit non deserunt.</div>
            <div class="div-4">
                <div class="div-5"></div>
                <div class="div-6"></div>
            </div>
            <div class="div-7">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
                Velit officia consequat duis enim velit mollit. Exercitation veniam
                consequat sunt nostrud amet.
            </div>
            <div class="span-2">lick <a href="${confirmLink}">here</a> to reset password.</p></div>
        </span>
        <span class="span-3">
            <div class="div-8">Amet minim mollit</div>
            <div class="div-9">
                <img loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/a5ddc0f27075f52811ab8c7903cefb404449be44225ea9603fa2176836f0f25f?apiKey=51bfafa4352f47b3b624fa2aa0dc0ef4&"
                    class="img-2" />
                <img loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/2538ecfade63d8f6cdb4d9b50ea968bd9eb3c7c29f1a72eee5f98ed1689d65ce?apiKey=51bfafa4352f47b3b624fa2aa0dc0ef4&"
                    class="img-3" />
                <img loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/041af4da0399528e6e33366c1f2ad34148c3f77365666c52c1e35715e71ec69a?apiKey=51bfafa4352f47b3b624fa2aa0dc0ef4&"
                    class="img-4" />
            </div>
            <div class="div-10">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
                Velit officia consequat duis enim velit mollit. Exercitation veniam
                consequat sunt nostrud amet.
            </div>
        </span>
    </div>
    <style>
        .div {
            display: flex;
            max-width: 600px;
            flex-direction: column;
        }

        .div-2 {
            justify-content: center;
            align-items: center;
            background-color: #ecc448;
            display: flex;
            width: 100%;
            flex-direction: column;
            padding: 10px 60px;
        }

        @media (max-width: 991px) {
            .div-2 {
                max-width: 100%;
                padding: 0 20px;
            }
        }

        .img {
            aspect-ratio: 1.45;
            object-fit: contain;
            object-position: center;
            width: 120px;
            overflow: hidden;
            max-width: 100%;
        }

        .span {
            justify-content: center;
            align-items: center;
            background-color: #fff;
            display: flex;
            width: 100%;
            flex-direction: column;
            padding: 50px 64px;
        }

        @media (max-width: 991px) {
            .span {
                max-width: 100%;
                padding: 0 20px;
            }
        }

        .div-3 {
            align-self: stretch;
            color: #000;
            text-align: center;
            margin-top: 14px;
            font: 500 40px Roboto, sans-serif;
        }

        @media (max-width: 991px) {
            .div-3 {
                max-width: 100%;
            }
        }

        .div-4 {
            align-self: center;
            display: flex;
            margin-top: 24px;
            width: 280px;
            max-width: 100%;
            justify-content: space-between;
            gap: 20px;
        }

        .div-5 {
            background-color: #c4c4c4;
            display: flex;
            height: 128px;
            flex-direction: column;
            flex: 1;
        }

        .div-6 {
            background-color: #c4c4c4;
            display: flex;
            height: 128px;
            flex-direction: column;
            flex: 1;
        }

        .div-7 {
            align-self: stretch;
            color: #000;
            text-align: center;
            margin-top: 24px;
            font: 400 16px Roboto, sans-serif;
        }

        @media (max-width: 991px) {
            .div-7 {
                max-width: 100%;
            }
        }

        .span-2 {
            color: #000;
            white-space: nowrap;
            justify-content: center;
            align-items: center;
            align-self: stretch;
            border-radius: 24px;
            background-color: #ecc448;
            margin: 24px 0 14px;
            padding: 8px 60px;
            font: 700 16px Roboto, sans-serif;
        }

        @media (max-width: 991px) {
            .span-2 {
                white-space: initial;
                max-width: 100%;
                padding: 0 20px;
            }
        }

        .span-3 {
            justify-content: center;
            display: flex;
            width: 100%;
            flex-direction: column;
            padding: 24px 64px 0;
        }

        @media (max-width: 991px) {
            .span-3 {
                max-width: 100%;
                padding: 0 20px;
            }
        }

        .div-8 {
            color: #000;
            text-align: center;
            font: 400 16px Roboto, sans-serif;
        }

        @media (max-width: 991px) {
            .div-8 {
                max-width: 100%;
            }
        }

        .div-9 {
            align-self: center;
            display: flex;
            margin-top: 16px;
            width: 120px;
            max-width: 100%;
            justify-content: space-between;
            gap: 20px;
        }

        .img-2 {
            aspect-ratio: 1;
            object-fit: contain;
            object-position: center;
            width: 100%;
            overflow: hidden;
            flex: 1;
        }

        .img-3 {
            aspect-ratio: 1;
            object-fit: contain;
            object-position: center;
            width: 100%;
            overflow: hidden;
            flex: 1;
        }

        .img-4 {
            aspect-ratio: 1;
            object-fit: contain;
            object-position: center;
            width: 100%;
            overflow: hidden;
            flex: 1;
        }

        .div-10 {
            color: rgba(0, 0, 0, 0.5);
            text-align: center;
            align-self: center;
            margin-top: 16px;
            width: 413px;
            font: 400 16px Roboto, sans-serif;
        }
    </style>`
    });
};


