import type { Metadata } from 'next';
import { Manrope, Inter } from 'next/font/google'; // Импортируем оба
import './globals.css';
import Header from './components/Header/Header';
import TanStackProvider from '@/providers/TanStackProvider';
import { Toaster } from 'react-hot-toast';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope', // Создаем переменную для CSS
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'RentalCar | Premium Car Rental',
  description: 'Reliable car rental service with the best prices.',
  openGraph: {
    title: 'RentalCar | Premium Car Rental',
    description: 'Find the perfect car for your journey. Reliable service and best prices.',
    url: 'https://your-deployment-url.vercel.app', // Замени на свой после деплоя
    siteName: 'RentalCar',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'RentalCar Service',
      },
    ],
    type: 'website',
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* Применяем шрифты через переменные к body */}
      <body className={`${manrope.variable} ${inter.variable} antialiased`}>
        <TanStackProvider>
          <Header />
          <main>{children}</main>
          <Toaster />
        </TanStackProvider>
      </body>
    </html>
  );
}
