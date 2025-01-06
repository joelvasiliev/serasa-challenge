import type { Metadata } from "next";
import "./globals.css";
import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';
import {Toaster} from 'sonner'
import NextAuthSessionProvider from "@/hooks/use-session";
import { UserProvider } from "@/hooks/use-user";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Serasa - Gerencie suas dívidas com facilidade',
  description: 'Organize sua vida financeira, acompanhe seus pagamentos e alcance a liberdade financeira.',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${inter.className} antialiased`}
      >
        <UserProvider>
          <NextAuthSessionProvider>
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
            <Toaster/>
          </NextAuthSessionProvider>
        </UserProvider>
      </body>
    </html>
  );
}
