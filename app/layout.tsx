import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import AuthenticationWrapper from '@/components/AuthenticationWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Onchain Summer PFP Collection',
  description:
    'Get onchain this summer to join a multi-week celebration of art, culture, gaming, community, and more. New mints happening daily August 9th - 31st. Base is open for everyone; come bask in the Onchain Summer sun.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`flex flex-col grow basis-0 min-h-0 ${inter.className}`}>
        <AuthenticationWrapper>{children}</AuthenticationWrapper>
        <Toaster />
      </body>
    </html>
  );
}
