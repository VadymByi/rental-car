'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import css from './BookingForm.module.css';
import './datepicker-custom.css';

export interface BookingData {
  name: string;
  email: string;
  date: Date | null;
  comment: string;
}

interface BookingFormProps {
  onSubmit: (data: BookingData) => void;
}

export default function BookingForm({ onSubmit }: BookingFormProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);

  const handleFormAction = (formData: FormData) => {
    const data: BookingData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      comment: formData.get('comment') as string,
      date: startDate,
    };

    onSubmit(data);

    const form = document.getElementById('booking-form') as HTMLFormElement;
    form?.reset();
    setStartDate(null);
  };

  return (
    <div className={css.formContainer}>
      <h3 className={css.formTitle}>Book your car now</h3>
      <p className={css.formSubtitle}>Stay connected! We are always ready to help you.</p>

      <form id="booking-form" action={handleFormAction} className={css.form}>
        <div className={css.inputGroup}>
          <input name="name" type="text" placeholder="Name*" required className={css.input} />
        </div>

        <div className={css.inputGroup}>
          <input name="email" type="email" placeholder="Email*" required className={css.input} />
        </div>

        <div className={css.inputGroup}>
          <div className={css.datepickerWrapper}>
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              placeholderText="Booking date"
              className={css.input}
              calendarClassName="custom-calendar"
              dateFormat="dd.MM.yyyy"
              minDate={new Date()}
              autoComplete="off"
              calendarStartDay={1}
              disabledKeyboardNavigation
              formatWeekDay={nameOfDay => nameOfDay.substr(0, 3).toUpperCase()}
            />
            {startDate && (
              <button
                type="button"
                className={css.clearDateBtn}
                onClick={() => setStartDate(null)}
                aria-label="Clear date"
              >
                <span className={css.clearIcon}>&times;</span>
              </button>
            )}
          </div>
        </div>

        <textarea name="comment" placeholder="Comment" className={css.textarea}></textarea>

        <button type="submit" className={css.submitBtn}>
          Send
        </button>
      </form>
    </div>
  );
}
