import React, { lazy } from 'react';
import { ShoppingCart, Package } from 'tabler-icons-react';

const Products = lazy(() => import('@/pages/Products'));
const Cart = lazy(() => import('@/pages/Cart'));
const ProductDetails = lazy(() => import('@/pages/ProductDetails'));

// Only routes you want in the nav
export const navRoutes = [
  {
    path: '/products',
    element: <Products />,
    icon: Package,
    label: 'Products',
  },
];

// Other routes (not in nav)
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
