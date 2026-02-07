'use client';

import Image from 'next/image';
import css from './CarCard.module.css';
import { Car } from '@/types/car';
import { useCarStore } from '@/store/useCarStore';
import Link from 'next/link';

interface CarCardProps {
  car: Car;
}
export default function CarCard({ car }: CarCardProps) {
  const { favouritesCars, toggleFavorite } = useCarStore();

  const adressParts = car.address.split(', ');
  const city = adressParts[adressParts.length - 2];
  const country = adressParts[adressParts.length - 1];

  const formattedMileage = car.mileage.toLocaleString('ru-RU');

  const isFavorite = favouritesCars.includes(car.id);

  return (
    <div className={css.card}>
      <div className={css.imageWrapper}>
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          width={276}
          height={268}
          className={css.image}
          style={{ objectFit: 'cover' }} // вместо height: auto
          loading="eager"
        />
        <button type="button" className={css.heartBtn} onClick={() => toggleFavorite(car.id)}>
          <svg className={css.heart}>
            <use href={isFavorite ? '/sprite.svg#icon-heart-active' : '/sprite.svg#icon-heart'} />
          </svg>
        </button>
      </div>

      <div className={css.title}>
        <h2 className={css.brandModelYear}>
          {car.brand} <span>{car.model}</span>, {car.year}
        </h2>
        <p className={css.price}>${car.rentalPrice}</p>
      </div>

      <div className={css.desc}>
        <p className={css.cityCountryRentalCompany}>
          <span>{city}</span>
          <span>{country}</span>
          <span>{car.rentalCompany}</span>
        </p>
        <p className={css.typeMileage}>
          <span>{car.type}</span>
          <span>{formattedMileage} km</span>
        </p>
      </div>

      <Link href={`/catalog/${car.id}`} className={css.button}>
        Read more
      </Link>
    </div>
  );
}
