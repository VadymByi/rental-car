import { Metadata } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import CarDetailsPage from './CarDetailsClient';
import { getCarById } from '@/api/cars-service';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Car Details | RentalCar`,
    description: `Detailed information about the car with ID ${id}`,
    openGraph: {
      title: `Car Details | RentalCar`,
      description: `View car specifications and book car #${id} online.`,
      url: `https://your-deployment-url.vercel.app/catalog/${id}`,
      siteName: 'RentalCar',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'Car Details',
        },
      ],
      type: 'article',
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['car', id],
    queryFn: () => getCarById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarDetailsPage />
    </HydrationBoundary>
  );
}
