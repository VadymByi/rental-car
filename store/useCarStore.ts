import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Car } from '@/types/car';

export interface CarFilters {
  brand?: string;
  price?: string;
  minMileage?: number;
  maxMileage?: number;
}

type CarState = {
  cars: Car[];
  favouritesCars: string[];
  filters: CarFilters;
  page: number;
  hasMore: boolean;

  setCars: (newCars: Car[], append: boolean) => void;
  setFilters: (filters: CarFilters) => void;
  resetCars: () => void;
  toggleFavorite: (carId: string) => void;
  setPage: (page: number) => void;
  setHasMore: (hasMore: boolean) => void;
};

export const useCarStore = create<CarState>()(
  persist(
    set => ({
      cars: [],
      favouritesCars: [],
      filters: {},
      page: 1,
      hasMore: false,

      setCars: (newCars, append) =>
        set(state => {
          if (!append) return { cars: newCars };

          const existingIds = new Set(state.cars.map(car => car.id));
          const uniqueNewCars = newCars.filter(car => !existingIds.has(car.id));

          return { cars: [...state.cars, ...uniqueNewCars] };
        }),

      setFilters: newFilters =>
        set({
          filters: newFilters,
          page: 1,
          cars: [],
          hasMore: false,
        }),

      resetCars: () =>
        set({
          cars: [],
          page: 1,
          hasMore: false,
          filters: {},
        }),

      toggleFavorite: carId =>
        set(state => ({
          favouritesCars: state.favouritesCars.includes(carId)
            ? state.favouritesCars.filter(id => id !== carId)
            : [...state.favouritesCars, carId],
        })),

      setPage: page => set({ page }),

      setHasMore: hasMore => set({ hasMore }),
    }),
    {
      name: 'rental-cars-storage',
      partialize: state => ({ favouritesCars: state.favouritesCars }),
    }
  )
);
