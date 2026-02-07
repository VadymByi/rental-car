'use client';

import { useQuery } from '@tanstack/react-query';
import { getCars } from '@/api/cars-service';
import { useCarStore } from '@/store/useCarStore';
import { useEffect } from 'react';
import CarCard from '../components/CarCard/CarCard';
import Filters from '../components/Filters/Filters';
import css from './Catalog.module.css';

export default function CatalogPage() {
  const { page, setPage, filters, setCars, setHasMore, hasMore, cars } = useCarStore();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['cars', page, filters],
    queryFn: () => getCars(page, filters),
    placeholderData: previousData => previousData,
    retry: false, // Чтобы при ошибке 404 не висел бесконечный лоадер
  });

  useEffect(() => {
    if (data && data.cars) {
      // Синхронизируем стор с данными из API
      setCars(data.cars, page > 1);

      // Кнопка Load More активна только если машин больше 0 и есть следующая страница
      const canLoadMore = data.cars.length > 0 && Number(data.page) < data.totalPages;
      setHasMore(canLoadMore);
    }
  }, [data, page, setCars, setHasMore]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  if (isLoading && page === 1) return <div className={css.loader}>Loading...</div>;
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

      {/* Показываем кнопку только если есть что грузить и мы не в процессе первичной загрузки */}
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

// КРИВО НО РАБОЧАЯ ВЕРСИЯ

// 'use client';

// import { useQuery } from '@tanstack/react-query';
// import { getCars } from '@/api/cars-service';
// import { useCarStore } from '@/store/useCarStore';
// import { useEffect } from 'react';
// import CarCard from '../components/CarCard/CarCard';
// import Filters from '../components/Filters/Filters';
// import css from './Catalog.module.css';

// export default function CatalogPage() {
//   // 1. Достаем всё необходимое из стора
//   const { page, setPage, filters, setCars, setHasMore, hasMore, cars } = useCarStore();

//   const { data, isLoading, isError, isFetching } = useQuery({
//     queryKey: ['cars', page, filters],
//     queryFn: () => getCars(page, filters),
//     // Держим предыдущие данные в стейте, пока грузятся новые (хороший UX)
//     placeholderData: previousData => previousData,
//   });

//   useEffect(() => {
//     if (data && data.cars) {
//       setCars(data.cars, page > 1);
//       setHasMore(Number(data.page) < data.totalPages);
//     }
//   }, [data, page, setCars, setHasMore]);

//   // 2. Функция для загрузки следующей страницы
//   const handleLoadMore = () => {
//     setPage(page + 1);
//   };

//   if (isLoading && page === 1) return <div>Loading...</div>;
//   if (isError) return <div>Error loading cars.</div>;

//   return (
//     <main className={css.catalog}>
//       <Filters />

//       <ul className={css.list}>
//         {Array.isArray(cars) && cars.length > 0
//           ? cars.map(car => (
//               <li key={car.id} className={css.item}>
//                 <CarCard car={car} />
//               </li>
//             ))
//           : !isLoading && <p>No cars found.</p>}
//       </ul>

//       {hasMore && (
//         <div className={css.loadMoreWrapper}>
//           <button className={css.loadMoreButton} onClick={handleLoadMore} disabled={isFetching}>
//             {isFetching ? 'Loading...' : 'Load more'}
//           </button>
//         </div>
//       )}
//     </main>
//   );
// }
