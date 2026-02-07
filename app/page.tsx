import Link from 'next/link';
import css from './Home.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home | RentalCar',
  description:
    'The best car rental service in Ukraine. Choose your car and start your journey today.',
  openGraph: {
    title: 'Home | RentalCar',
    description:
      'The best car rental service in Ukraine. Choose your car and start your journey today.',
    url: 'https://rental-car-psi-ten.vercel.app/',
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
export default function HomePage() {
  return (
    <main className={css.hero}>
      <div className={css.container}>
        <h1 className={css.title}>Find your perfect rental car</h1>
        <p className={css.subtitle}>Reliable and budget-friendly rentals for any journey</p>

        <Link href="/catalog" className={css.button}>
          View Catalog
        </Link>
      </div>
    </main>
  );
}
