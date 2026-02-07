'use client';

import { Listbox } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import { getBrands } from '@/api/cars-service';
import { useCarStore } from '@/store/useCarStore';
import { useState } from 'react';
import css from './Filters.module.css';

export default function Filters() {
  const { setFilters } = useCarStore();

  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');

  const { data: brands } = useQuery({
    queryKey: ['brands'],
    queryFn: getBrands,
  });

  const prices = Array.from({ length: 13 }, (_, i) => ((i + 3) * 10).toString());

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setFilters({
      brand: selectedBrand || undefined,
      price: selectedPrice || undefined,
      minMileage: formData.get('minMileage') ? Number(formData.get('minMileage')) : undefined,
      maxMileage: formData.get('maxMileage') ? Number(formData.get('maxMileage')) : undefined,
    });

    setSelectedBrand('');
    setSelectedPrice('');
    e.currentTarget.reset();
  };

  return (
    <div className={css.filterContainer}>
      <form onSubmit={handleSubmit} className={css.form}>
        <div className={css.fieldGroup}>
          <label className={css.label}>Car brand</label>
          <Listbox value={selectedBrand} onChange={setSelectedBrand}>
            {({ open }) => (
              <div className={css.selectWrapper}>
                <Listbox.Button className={css.select}>
                  <span className={css.truncate}>{selectedBrand || 'Choose a brand'}</span>
                  <svg className={`${css.iconChevron} ${open ? css.rotate : ''}`}>
                    <use href="/sprite.svg#icon-chevron-down" />
                  </svg>
                </Listbox.Button>
                <Listbox.Options className={css.options}>
                  <Listbox.Option value="" className={css.option}>
                    All brands
                  </Listbox.Option>
                  {brands?.map(brand => (
                    <Listbox.Option key={brand} value={brand} className={css.option}>
                      {brand}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            )}
          </Listbox>
        </div>

        <div className={css.fieldGroup}>
          <label className={css.label}>Price/ 1 hour</label>
          <Listbox value={selectedPrice} onChange={setSelectedPrice}>
            {({ open }) => (
              <div className={css.selectWrapper}>
                <Listbox.Button className={css.select}>
                  {selectedPrice ? `To ${selectedPrice}$` : 'Choose a price'}
                  <svg className={`${css.iconChevron} ${open ? css.rotate : ''}`}>
                    <use href="/sprite.svg#icon-chevron-down" />
                  </svg>
                </Listbox.Button>
                <Listbox.Options className={css.options}>
                  <Listbox.Option value="" className={css.option}>
                    All prices
                  </Listbox.Option>
                  {prices.map(price => (
                    <Listbox.Option key={price} value={price} className={css.option}>
                      {price}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            )}
          </Listbox>
        </div>

        <div className={css.fieldGroup}>
          <label className={css.label}>Car mileage / km</label>
          <div className={css.mileageInputs}>
            <input name="minMileage" type="number" placeholder="From" className={css.inputLeft} />
            <input name="maxMileage" type="number" placeholder="To" className={css.inputRight} />
          </div>
        </div>

        <button type="submit" className={css.searchBtn}>
          Search
        </button>
      </form>
    </div>
  );
}
