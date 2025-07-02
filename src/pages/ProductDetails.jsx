import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, Button, Descriptions, Image, Spin } from 'antd';

import { get } from '@/utils/api';
import { useCart } from '@/contexts/cartProvider';

import { useToast } from '@/hooks/useToast';

const ProductDetails = () => {
  const { id } = useParams();

  const { addToCart } = useCart();
  const showToast = useToast();

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const result = await get(`/products/${id}`);
      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch product');
      }
      return result.data;
    },
    enabled: !!id,
  });

  const handleAddToCart = () => {
    addToCart(response);
    showToast('Product added to cart!');
  };

  if (isLoading)
    return (
      <Spin size='large' style={{ display: 'block', margin: '40px auto' }} />
    );
  if (isError)
    return (
      <div style={{ color: 'red', textAlign: 'center' }}>{error.message}</div>
    );
  if (!response) return null;

  return (
    <div className='flex flex-col items-center justify-center bg-gray-100 p-4 md:p-6'>
      <Card
        title={<span className='font-bold text-2xl'>{response.name}</span>}
        className='w-full max-w-[700px] shadow-lg rounded-2xl mx-auto p-0'
        styles={{
          body: { padding: 16, paddingTop: 32, paddingBottom: 32 },
        }}
        actions={[
          <Button
            type='primary'
            onClick={handleAddToCart}
            key='add-to-cart'
            className='w-full md:w-44 h-12 text-lg rounded-lg font-semibold mx-auto block'
          >
            Add to Cart
          </Button>,
        ]}
      >
        <div className='flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center w-full'>
          <Image
            src={
              'https://www.hindustantimes.com/ht-img/img/2025/04/16/1600x900/best_android_tablets_1744798872092_1744798883425.jpeg'
            }
            alt={response.name}
            width='100%'
            height={200}
            className='rounded-3xl shadow-2xl object-cover bg-white border-4 border-blue-600 max-w-xs w-full mb-4 md:mb-0'
            style={{ transition: 'transform 0.3s', transform: 'scale(1.03)' }}
            preview={true}
          />
          <Descriptions
            column={1}
            bordered
            size='middle'
            className='w-full min-w-0 max-w-xs bg-white rounded-xl p-4'
            styles={{
              label: {
                fontWeight: 600,
                fontSize: 16,
                background: '#fafafa',
              },
              content: { fontSize: 16, padding: '12px 16px' },
            }}
          >
            <Descriptions.Item label='Name'>
              <span className='font-medium'>{response.name}</span>
            </Descriptions.Item>
            <Descriptions.Item label='Description'>
              <span className='text-gray-600'>{response.description}</span>
            </Descriptions.Item>
            <Descriptions.Item label='Price'>
              <span className='text-blue-600 font-bold text-lg'>
                ${response.price}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label='Stock'>
              <span className='font-medium'>{response.stock}</span>
            </Descriptions.Item>
          </Descriptions>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetails;
