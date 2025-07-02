import { Button, Empty, Typography } from 'antd';
import { ShoppingCart, Plus, Minus, Trash } from 'tabler-icons-react';
import { useCart } from '@/contexts/cartProvider';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/useToast';

const { Title, Text } = Typography;

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const showToast = useToast();

  const handleQuantityChange = (id, delta) => {
    const item = cart.find(item => item.id === id);
    const newQuantity = Math.max(1, (item.quantity || 1) + delta);
    updateQuantity(id, newQuantity);
  };

  const calculateSubtotal = () => {
    return cart
      .reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
      .toFixed(2);
  };

  return (
    <div className=' bg-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <Title
          level={2}
          className='text-3xl font-bold text-gray-900 mb-8 text-center'
        >
          Your Shopping Cart
        </Title>

        {cart.length === 0 ? (
          <div className='bg-white rounded-lg shadow-lg p-12 flex flex-col items-center justify-center'>
            <ShoppingCart size={80} className='text-gray-300 mb-6' />
            <Empty
              description={
                <Text className='text-lg text-gray-600'>
                  Your cart is empty. Start shopping now!
                </Text>
              }
            />
            <Button
              type='primary'
              size='large'
              className='mt-6 bg-blue-600 hover:bg-blue-700 transition-colors duration-300'
              onClick={() => navigate('/products')}
            >
              Shop Now
            </Button>
          </div>
        ) : (
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            <div className='lg:col-span-2'>
              <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
                <div className='divide-y divide-gray-200'>
                  {cart.map(item => (
                    <div
                      key={item.id}
                      className='p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:justify-between gap-4 sm:gap-0 hover:bg-gray-50 transition-colors duration-200'
                    >
                      <div className='flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto'>
                        <img
                          src={
                            'https://www.hindustantimes.com/ht-img/img/2025/04/16/1600x900/best_android_tablets_1744798872092_1744798883425.jpeg'
                          }
                          alt={item.name}
                          className='w-20 h-20 object-cover rounded mb-2 sm:mb-0'
                        />
                        <div className='text-center sm:text-left'>
                          <Text className='text-lg font-semibold text-gray-900'>
                            {item.name}
                          </Text>
                          <Text className='text-sm text-gray-500 block'>
                            ${item.price.toFixed(2)} / unit
                          </Text>
                        </div>
                      </div>
                      <div className='flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 w-full sm:w-auto'>
                        <div className='flex items-center border rounded'>
                          <button
                            className='p-2 hover:bg-gray-100'
                            onClick={() => handleQuantityChange(item.id, -1)}
                          >
                            <Minus size={16} />
                          </button>
                          <span className='px-4 py-2 text-center w-12'>
                            {item.quantity || 1}
                          </span>
                          <button
                            className='p-2 hover:bg-gray-100'
                            onClick={() => handleQuantityChange(item.id, 1)}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <Text className='text-lg font-semibold text-gray-900'>
                          ${(item.price * (item.quantity || 1)).toFixed(2)}
                        </Text>
                        <button
                          className='text-red-500 hover:text-red-700 transition-colors duration-200'
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className='bg-white rounded-lg shadow-lg p-6 h-fit'>
              <Text className='text-xl font-semibold text-gray-900 block mb-4'>
                Order Summary
              </Text>
              <div className='flex justify-between mb-2'>
                <Text className='text-gray-600'>Subtotal</Text>
                <Text className='font-semibold text-gray-900'>
                  ${calculateSubtotal()}
                </Text>
              </div>
              <div className='flex justify-between mb-4'>
                <Text className='text-gray-600'>Shipping</Text>
                <Text className='font-semibold text-gray-900'>
                  Calculated at checkout
                </Text>
              </div>
              <Button
                type='primary'
                size='large'
                className='w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300'
                onClick={() => {
                  showToast('Checkout Complelted!');
                  clearCart();
                  navigate('/products');
                }}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
