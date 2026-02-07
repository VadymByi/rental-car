'use client';

import { useQuery } from '@tanstack/react-query';
import { getCars } from '@/api/cars-service';
import { useCarStore } from '@/store/useCarStore';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Filters from '../components/Filters/Filters';
import Loader from '../components/Loader/Loader';
import css from './Catalog.module.css';

const CarCard = dynamic(() => import('../components/CarCard/CarCard'), {
  ssr: false,
});

export default function CatalogPage() {
  const { page, setPage, filters, setCars, setHasMore, hasMore, cars } = useCarStore();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['cars', page, filters],
    queryFn: () => getCars(page, filters),
    placeholderData: previousData => previousData,
    retry: false,
  });

  useEffect(() => {
    if (data && data.cars) {
      setCars(data.cars, page > 1);

      const canLoadMore = data.cars.length > 0 && Number(data.page) < data.totalPages;
      setHasMore(canLoadMore);
    }
  }, [data, page, setCars, setHasMore]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  if (isLoading && page === 1) return <Loader />;
  if (isError) return <div className={css.error}>Error loading cars. Please try again later.</div>;

  return (
    <main className={css.catalog}>
      <Filters />

      <ul className={css.list}>
        {cars && cars.length > 0
          ? cars.map(car => (
              <li key={car.id} className={css.item}>
                <CarCard car={car} />
              </li>
            ))
          : !isFetching && <p className={css.notFound}>No cars found matching your criteria.</p>}
      </ul>

      {hasMore && cars.length > 0 && (
        <div className={css.loadMoreWrapper}>
          <button className={css.loadMoreButton} onClick={handleLoadMore} disabled={isFetching}>
            {isFetching ? 'Loading...' : 'Load more'}
          </button>
        </div>
      )}
    </main>
  );
}
