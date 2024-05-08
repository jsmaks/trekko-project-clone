import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CalSans, PoppinsFont } from '../lib/font';
import './globals.css';
import { siteCongig } from '../../config/site';
import { NextResponse } from 'next/server';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: siteCongig.name,
    template: `%s | ${siteCongig.name}`,
  },
  description: siteCongig.desctiption,
  icons: [
    {
      url: '/logo.svg',
      href: '/logo.svg',
    },
  ],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${CalSans.variable} ${inter.className} ${PoppinsFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
