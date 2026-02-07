import { Metadata } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import CatalogClient from './CatalogClient';
import { getCars } from '@/api/cars-service';

export const metadata: Metadata = {
  title: 'Catalog | RentalCar',
  description: 'Explore our wide range of cars available for rent.',
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
