import React, { lazy } from 'react';
import { ShoppingCart, Package } from 'tabler-icons-react';

const Products = lazy(() => import('@/pages/Products'));
const Cart = lazy(() => import('@/pages/Cart'));
const ProductDetails = lazy(() => import('@/pages/ProductDetails'));

export const navRoutes = [
  {
    path: '/products',
    element: <Products />,
    icon: Package,
    label: 'Products',
  },
];

export const otherRoutes = [
  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: 'products/product-details/:id',
    element: <ProductDetails />,
  },
];
