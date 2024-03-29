import { useState } from 'react';
import { Count } from '@/components/Count/Count';
import { Link, Outlet } from 'react-router-dom';
import image from '@/assets/radio.png';
import Eye from '@/assets/eye.svg';
import { shopRoutes } from '@packages/shared/src/routes/shop';
import { adminRoutes } from '@packages/shared/src/routes/admin';

import styles from './App.module.scss';

export function App() {
  const [count, setCount] = useState(0);

  function incCount() {
    setCount((prev) => prev + 1);
  }
  function setZero() {
    setCount(0);
  }
  return (
    <div>
      <h1>Hello!!!</h1>
      <h2>{__PLATFORM__}</h2>
      <div>
        <img src={image} alt={''}></img>
      </div>
      <div>
        <Eye width={'70px'} height={'70px'} style={{ color: 'red' }} />
      </div>
      {__ENV__ === 'development' && <div>Only dev element!</div>}
      <div data-testid={'App.Links'} className={styles.nav}>
        <Link to={adminRoutes.about}>About</Link>
        <Link to={shopRoutes.main}>Shop</Link>
        <Link to={shopRoutes.panel}>Shop panel</Link>
        <Link to={'/'}>Home</Link>
      </div>
      <div data-testid={'App.Increase'} className={styles.elements}>
        <button className={styles.elements__btn_inc} onClick={incCount}>
          INCREASE
        </button>
        <button
          disabled={!count}
          className={styles.elements__btn_zero}
          onClick={setZero}
        >
          SET 0
        </button>
      </div>

      <Count count={count} />

      <Outlet />
    </div>
  );
}
