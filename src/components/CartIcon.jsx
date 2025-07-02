import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'tabler-icons-react';
import { useCart } from '@/contexts/cartProvider';

const CartIcon = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <div
      onClick={() => navigate('/cart')}
      className='cursor-pointer relative flex'
    >
      <button
        type='button'
        className='mr-4 p-0 bg-transparent border-none outline-none '
        aria-label='Cart'
      >
        <ShoppingCart size={24} />
      </button>
      {cartCount > 0 && (
        <span className='absolute top-1 right-2 bg-red-600 text-white rounded-full min-w-[18px] h-[18px] text-xs flex items-center justify-center px-1 z-10 font-bold shadow-[0_0_0_2px_white]'>
          {cartCount}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
