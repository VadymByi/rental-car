import { Metadata } from 'next';
import CarDetailsPage from './CarDetailsClient'; // Импортируем твой клиентский компонент

type Props = {
  params: Promise<{ id: string }>;
};

// 1. Метаданные (работают на сервере)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Car Details | RentalCar`,
    description: `Detailed information about the car with ID ${id}`,
    openGraph: {
      title: `Car Details | RentalCar`,
      description: `View car specifications and book car #${id} online.`,
      url: `https://your-deployment-url.vercel.app/catalog/${id}`, // Позже заменишь на реальный домен
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

// 2. Сама страница (серверный компонент)
export default async function Page({ params }: Props) {
  const { id } = await params;

  // Просто передаем id в клиентский компонент
  return <CarDetailsPage />;
}
