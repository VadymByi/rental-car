import { api } from './instance';
import { Car } from '@/types/car';
import { CarFilters } from '@/store/useCarStore';

export const LIMIT = 12;

interface FetchCarsResponse {
  cars: Car[];
  totalCars: number;
  page: string;
  totalPages: number;
}

export const getCars = async (page: number, filters: CarFilters): Promise<FetchCarsResponse> => {
  const params = {
    page,
    limit: LIMIT,
    brand: filters.brand || undefined,
    rentalPrice: filters.price || undefined,
    minMileage: filters.minMileage || undefined,
    maxMileage: filters.maxMileage || undefined,
  };

  const { data } = await api.get<FetchCarsResponse>('cars', { params });
  return data;
};

export const getBrands = async (): Promise<string[]> => {
  const { data } = await api.get<string[]>('brands');
  return data;
};

export const getCarById = async (id: string): Promise<Car> => {
  const { data } = await api.get<Car>(`cars/${id}`);
  return data;
};
