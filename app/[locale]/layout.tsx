// app/[locale]/layout.tsx

import { unstable_setRequestLocale } from 'next-intl/server';

const locales = ['en', 'de'];

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    unstable_setRequestLocale(locale);

    return (
        <html lang={locale}>
            <head>
                {/* Add your head content here */}
            </head>
            <body>{children}</body>
        </html>
    );
}
