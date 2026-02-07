import { Metadata } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import CatalogClient from './CatalogClient';
import { getCars } from '@/api/cars-service';

export const metadata: Metadata = {
  title: 'Catalog | RentalCar',
  description: 'Explore our wide range of cars available for rent.',
  openGraph: {
    title: `Catalog | RentalCar`,
    description: `Explore our wide range of cars available for rent.`,
    url: `https://rental-car-psi-ten.vercel.app/catalog`,
    siteName: 'RentalCar',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Catalog',
      },
    ],
    type: 'article',
  },
};

export default async function CatalogPage() {
  const queryClient = new QueryClient();

  const initialFilters = {
    brand: '',
    rentalPrice: '',
    minMileage: 0,
    maxMileage: 0,
  };

  await queryClient.prefetchQuery({
    queryKey: ['cars', 1, initialFilters],
    queryFn: () => getCars(1, initialFilters),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogClient />
    </HydrationBoundary>
  );
}
