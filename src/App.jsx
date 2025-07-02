import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LayoutComponent from '@/components/Layout';
import { navRoutes, otherRoutes } from '@/utils/routes.jsx';
import Loading from '@/components/Loading';

const renderRoutes = routes =>
  routes.map(route => (
    <Route key={route.path} path={route.path} element={route.element} />
  ));

const App = () => (
  <Suspense fallback={<Loading />}>
    <Routes>
      <Route path='/' element={<LayoutComponent />}>
        <Route index element={<Navigate to='/products' replace />} />
        {renderRoutes(navRoutes)}
        {renderRoutes(otherRoutes)}
        <Route
          path='*'
          element={<div>Welcome! Select a page from the menu.</div>}
        />
      </Route>
    </Routes>
  </Suspense>
);

export default App;
