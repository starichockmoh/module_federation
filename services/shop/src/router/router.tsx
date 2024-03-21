import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { App } from '@/components/App';
import { Shop } from '@/pages/Shop';

const routes = [
  {
    path: '/shop',
    element: <App />,
    children: [
      {
        path: '/shop/main',
        element: (
          <Suspense fallback={'Ожидайте...'}>
            <Shop />
          </Suspense>
        ),
      },
      {
        path: '/shop/panel',
        element: (
          <Suspense fallback={'Ожидайте...'}>
            <div>PANEL</div>
          </Suspense>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

export default routes;
