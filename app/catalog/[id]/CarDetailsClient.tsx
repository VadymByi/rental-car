'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getCarById } from '@/api/cars-service';
import Image from 'next/image';
import toast from 'react-hot-toast'; // Импортируем тосты сюда
import css from './CarDetails.module.css';
import BookingForm, { BookingData } from '@/app/components/BookingForm/BookingForm';

export default function CarDetailsPage() {
  const { id } = useParams();

  const {
    data: car,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['car', id],
    queryFn: () => getCarById(id as string),
    enabled: !!id,
  });

  // Обработчик, который мы передаем в форму
  const handleBookingSubmit = (data: BookingData) => {
    // Здесь выполняем проверку или отправку на API
    // if (!data.date) {
    //   toast.error('Please select a booking date');
    //   return;
    // }

    // Имитация успешной отправки
    console.log('Final booking data:', data);

    toast.success(`Success! Car booked for ${data.name}. We will contact you at ${data.email}.`, {
      duration: 5000,
      position: 'top-center',
    });
  };

  if (isLoading) return <div className={css.loader}>Loading car details...</div>;
  if (isError || !car) return <div className={css.error}>Car not found.</div>;

  const formattedMileage = car.mileage
    .toLocaleString('ru-RU')
    .replace(/\s/g, ' ')
    .replace(/,/g, ' ');

  const addressParts = car.address.split(', ');
  const city = addressParts[addressParts.length - 2];
  const country = addressParts[addressParts.length - 1];
  const shortId = car.id.slice(0, 4);

  return (
    <main className={css.container}>
      <section className={css.wrapper}>
        <div className={css.imageSide}>
          <Image
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            width={640}
            height={512}
            className={css.mainImage}
            priority
          />
        </div>

        {/* Передаем наш обработчик в пропс onSubmit */}
        <div className={css.bookingFormWrapper}>
          <BookingForm onSubmit={handleBookingSubmit} />
        </div>

        <div className={css.infoSide}>
          <div className={css.header}>
            <h1 className={css.title}>
              {car.brand} {car.model}, {car.year}
            </h1>
            <span className={css.carId}>Id: {shortId}</span>
          </div>
          <div className={css.locationMileage}>
            <div className={css.locationWrapper}>
              <svg className={css.icon} width="16" height="16">
                <use href="/sprite.svg#icon-location" />
              </svg>
              <p className={css.secondaryText}>
                {city}, {country}
              </p>
            </div>
            <p className={css.secondaryText}>Mileage: {formattedMileage} km</p>
          </div>
          <div className={css.price}>${car.rentalPrice}</div>
          <p className={css.description}>{car.description}</p>

          <div className={css.peculiarities}>
            <div className={css.section}>
              <h3 className={css.sectionTitle}>Rental Conditions:</h3>
              <ul className={css.conditionList}>
                {car.rentalConditions.map((condition, idx) => (
                  <li key={idx} className={css.conditionItem}>
                    <svg className={css.icon} width="16" height="16">
                      <use href="/sprite.svg#icon-check-circle" />
                    </svg>
                    {condition}
                  </li>
                ))}
              </ul>
            </div>

            <div className={css.section}>
              <h3 className={css.sectionTitle}>Car Specifications:</h3>
              <ul className={css.specList}>
                <li className={css.specItem}>
                  <svg className={css.icon} width="16" height="16">
                    <use href="/sprite.svg#icon-calendar" />
                  </svg>
                  Year: {car.year}
                </li>
                <li className={css.specItem}>
                  <svg className={css.icon} width="16" height="16">
                    <use href="/sprite.svg#icon-car" />
                  </svg>
                  Type: {car.type}
                </li>
                <li className={css.specItem}>
                  <svg className={css.icon} width="16" height="16">
                    <use href="/sprite.svg#icon-fuel-pump" />
                  </svg>
                  Fuel Consumption: {car.fuelConsumption}
                </li>
                <li className={css.specItem}>
                  <svg className={css.icon} width="16" height="16">
                    <use href="/sprite.svg#icon-gear" />
                  </svg>
                  Engine Size: {car.engineSize}
                </li>
              </ul>
            </div>

            <div className={css.section}>
              <h3 className={css.sectionTitle}>Accessories and functionalities:</h3>
              <ul className={css.accList}>
                {[...car.accessories, ...car.functionalities].map((item, index) => (
                  <li key={index} className={css.accItem}>
                    <svg className={css.icon} width="16" height="16">
                      <use href="/sprite.svg#icon-check-circle" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
