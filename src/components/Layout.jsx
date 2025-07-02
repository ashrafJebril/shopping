import React, { useState, useEffect } from 'react';
import { Layout, Menu, Drawer, Button, Splitter } from 'antd';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { navRoutes } from '@/utils/routes.jsx';
import { Menu2 } from 'tabler-icons-react';
import CartIcon from './CartIcon';
import HeaderBar from './HeaderBar';

const { Content, Footer, Sider } = Layout;

const AppContent = () => (
  <Content className='flex-1 overflow-auto'>
    <div className='h-full p-6 text-center hadow'>
      <Outlet />
    </div>
  </Content>
);

const LayoutComponent = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const selectedKey =
    navRoutes.find(r => location.pathname.startsWith(r.path))?.path ||
    '/products';

  const menuItems = navRoutes.map(route => ({
    key: route.path,
    icon: React.createElement(route.icon),
    label: route.label,
    onClick: () => navigate(route.path),
  }));

  return (
    <Layout hasSider className='h-screen'>
      <Sider className='hidden md:block shadow' width={200}>
        <div className='bg-white w-full  flex justify-center items-center p-2 '>
          <img src='/logo.png' alt='logo' className='w-48 h-16' />
        </div>

        <Menu
          theme='light'
          mode='inline'
          selectedKeys={[selectedKey]}
          items={menuItems}
          className='bg-white h-full sticky top-0'
        />
      </Sider>
      <Drawer
        title='Menu'
        placement='left'
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        className='md:hidden shadow'
      >
        <Menu
          theme='light'
          mode='inline'
          selectedKeys={[selectedKey]}
          items={menuItems}
          className='bg-white h-full sticky top-0'
        />
      </Drawer>
      <Layout className='flex flex-col h-full min-h-0'>
        <HeaderBar onMenuClick={() => setDrawerOpen(true)} />
        <AppContent />
        <Footer className='text-center flex-shrink-0'>
          Shopping ©{new Date().getFullYear()} Created by Ashraf
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
