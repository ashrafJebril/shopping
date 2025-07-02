import React from 'react';
import { Layout, Button } from 'antd';
import { Menu2 } from 'tabler-icons-react';
import CartIcon from './CartIcon';

const { Header } = Layout;

const HeaderBar = ({ onMenuClick }) => (
  <Header className='flex items-center border p-0 !bg-white flex-shrink-0'>
    <Button
      type='text'
      icon={<Menu2 size={24} />}
      className='md:!hidden ml-2'
      onClick={onMenuClick}
      aria-label='Open menu'
    />
    <div className='flex-1' />
    <div className='flex items-center gap-3 mr-4'>
      <div className='w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white text-lg font-bold shadow'>
        A
      </div>
      <span className='text-gray-700 font-semibold text-base'>
        Welcome back, <span className='text-orange-600'>Ashraf</span>
      </span>
    </div>
    <CartIcon />
  </Header>
);

export default HeaderBar;
