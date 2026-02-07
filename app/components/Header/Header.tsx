'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import css from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', onScroll);
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${css.header} ${scrolled ? css.scrolled : ''}`}>
      <div className={css.container}>
        <Link href="/" className={css.logo}>
          <svg className="icon icon-RentalCar" width="102" height="16" viewBox="0 0 102 16">
            <use href="/sprite.svg#icon-RentalCar" />
          </svg>
        </Link>

        <nav className={css.nav}>
          <Link href="/" className={`${css.link} ${pathname === '/' ? css.active : ''}`}>
            Home
          </Link>
          <Link
            href="/catalog"
            className={`${css.link} ${pathname === '/catalog' ? css.active : ''}`}
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
