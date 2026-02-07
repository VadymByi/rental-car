'use client';

import { Listbox } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { getBrands } from '@/api/cars-service';
import { useCarStore } from '@/store/useCarStore';
import { useState } from 'react';
import css from './Filters.module.css';

export default function Filters() {
  const { setFilters } = useCarStore();

  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [minMileage, setMinMileage] = useState('');
  const [maxMileage, setMaxMileage] = useState('');

  const { data: brands } = useQuery({
    queryKey: ['brands'],
    queryFn: getBrands,
  });

  const prices = Array.from({ length: 13 }, (_, i) => ((i + 3) * 10).toString());

  const formatDisplayValue = (value: string) => {
    const digits = value.replace(/\D/g, '');
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleMileageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (val: string) => void
  ) => {
    setter(formatDisplayValue(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cleanNumber = (val: string) => {
      const digits = val.replace(/,/g, '');
      return digits ? Number(digits) : undefined;
    };

    setFilters({
      brand: selectedBrand === 'All brands' || !selectedBrand ? undefined : selectedBrand,
      price: selectedPrice === 'All prices' || !selectedPrice ? undefined : selectedPrice,
      minMileage: cleanNumber(minMileage),
      maxMileage: cleanNumber(maxMileage),
    });

    setSelectedBrand('');
    setSelectedPrice('');
    setMinMileage('');
    setMaxMileage('');

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
                  <SimpleBar className={css.scrollArea}>
                    <Listbox.Option value="All brands" className={css.option}>
                      All brands
                    </Listbox.Option>
                    {brands?.map(brand => (
                      <Listbox.Option key={brand} value={brand} className={css.option}>
                        {brand}
                      </Listbox.Option>
                    ))}
                  </SimpleBar>
                </Listbox.Options>
              </div>
            )}
          </Listbox>
        </div>

        <div className={css.fieldGroup}>
          <label className={css.label}>Price / 1 hour</label>
          <Listbox value={selectedPrice} onChange={setSelectedPrice}>
            {({ open }) => (
              <div className={css.selectWrapper}>
                <Listbox.Button className={css.select}>
                  <span>
                    {selectedPrice === 'All prices'
                      ? 'All prices'
                      : selectedPrice
                        ? `To ${selectedPrice}$`
                        : 'Choose a price'}
                  </span>
                  <svg className={`${css.iconChevron} ${open ? css.rotate : ''}`}>
                    <use href="/sprite.svg#icon-chevron-down" />
                  </svg>
                </Listbox.Button>
                <Listbox.Options className={css.options}>
                  <SimpleBar className={css.scrollArea}>
                    <Listbox.Option value="All prices" className={css.option}>
                      All prices
                    </Listbox.Option>
                    {prices.map(price => (
                      <Listbox.Option key={price} value={price} className={css.option}>
                        {price}
                      </Listbox.Option>
                    ))}
                  </SimpleBar>
                </Listbox.Options>
              </div>
            )}
          </Listbox>
        </div>

        <div className={css.fieldGroup}>
          <label className={css.label}>Car mileage / km</label>
          <div className={css.mileageInputs}>
            <div className={css.inputWrapper}>
              <span className={css.inputLabel}>From</span>
              <input
                type="text"
                value={minMileage}
                onChange={e => handleMileageChange(e, setMinMileage)}
                className={css.inputLeft}
                autoComplete="off"
              />
            </div>
            <div className={css.inputWrapper}>
              <span className={css.inputLabel}>To</span>
              <input
                type="text"
                value={maxMileage}
                onChange={e => handleMileageChange(e, setMaxMileage)}
                className={css.inputRight}
                autoComplete="off"
              />
            </div>
          </div>
        </div>

        <button type="submit" className={css.searchBtn}>
          Search
        </button>
      </form>
    </div>
  );
}
