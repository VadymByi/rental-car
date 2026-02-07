import { Metadata } from 'next';
import CatalogClient from './CatalogClient';

export const metadata: Metadata = {
  title: 'Catalog | RentalCar',
  description:
    'Explore our wide range of cars available for rent. Filter by brand, price, and mileage.',
  openGraph: {
    title: 'Catalog | RentalCar',
    description: 'Choose your car from our extensive catalog.',
    url: 'https://your-deployment-url.vercel.app/catalog',
    siteName: 'RentalCar',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Car Catalog',
      },
    ],
    type: 'website',
  },
};

export default function CatalogPage() {
  return <CatalogClient />;
}
