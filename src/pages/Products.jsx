import React, { useMemo } from 'react';
import ResponsiveTable from '@/components/ResponsiveTable';
import Analytics from '@/components/Analytics';
import { Row, Col } from 'antd';
import { Package, Clock, Check, X, Eye, Edit, Trash } from 'tabler-icons-react';
import { get } from '@/utils/api';
import { useNavigate } from 'react-router-dom';
import usePaginatedQuery from '@/hooks/usePaginatedQuery';
import { useMediaQuery } from 'react-responsive';

const Products = () => {
  const analyticsData = [
    {
      value: 123,
      label: 'Total Products',
      icon: <Package size={24} color='#4096ff' />,
      iconBg: '#e6f4ff',
    },
    {
      value: 12,
      label: 'Low Stock (< 50)',
      icon: <Clock size={24} color='#faad14' />,
      iconBg: '#fffbe6',
    },
    {
      value: 100,
      label: 'In Stock',
      icon: <Check size={24} color='#52c41a' />,
      iconBg: '#f6ffed',
    },
    {
      value: 11,
      label: 'Out of Stock',
      icon: <X size={24} color='#ff4d4f' />,
      iconBg: '#fff1f0',
    },
  ];

  const navigate = useNavigate();

  const handleRowClick = record => {
    navigate(`/products/product-details/${record.id}`);
  };

  const handleActionClick = (e, action) => {
    e.stopPropagation();

    if (action === 'edit') {
      console.log('Edit clicked');
    } else if (action === 'delete') {
      console.log('Delete clicked');
    }
  };

  const columns = useMemo(
    () => [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: price => (
          <span className='font-medium text-green-600'>${price}</span>
        ),
      },
      {
        title: 'Stock',
        dataIndex: 'stock',
        key: 'stock',
        render: stock => (
          <span
            className={
              stock < 50 ? 'text-red-500 font-medium' : 'text-green-600'
            }
          >
            {stock}
          </span>
        ),
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        render: description => (
          <span className='max-w-xs truncate' title={description}>
            {description}
          </span>
        ),
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (_, record) => (
          <div className='flex gap-2 justify-center'>
            <Eye
              size={18}
              className='cursor-pointer text-blue-500 hover:text-blue-700'
              onClick={e => {
                e.stopPropagation();
                navigate(`/products/product-details/${record.id}`);
              }}
            />
            <Edit
              size={18}
              className='cursor-pointer text-green-500 hover:text-green-700'
              onClick={e => handleActionClick(e, 'edit')}
            />
            <Trash
              size={18}
              className='cursor-pointer text-red-500 hover:text-red-700'
              onClick={e => handleActionClick(e, 'delete')}
            />
          </div>
        ),
      },
    ],
    [navigate]
  );

  const fetchProducts = async (page, pageSize) => {
    const result = await get(`/products?page=${page}&size=${pageSize}`);
    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch products');
    }

    return {
      data: result.data,
      pagination: result.pagination,
    };
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasMore,
    page,
    pageSize,
    total,
    setPage,
    setPageSize,
    mobileItems,
    mobileHasMore,
    fetchNextMobilePage,
  } = usePaginatedQuery({
    queryKey: ['products'],
    fetchFn: fetchProducts,
  });

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const paginationConfig = {
    current: page,
    pageSize,
    total,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    onChange: ({ current, pageSize: newPageSize }) => {
      if (newPageSize !== pageSize) {
        setPageSize(newPageSize);
      } else {
        setPage(current);
      }
    },
  };

  return (
    <Row justify='center' style={{ padding: '5px' }}>
      <Col xs={24} lg={22} xl={20} xxl={18}>
        <Analytics data={analyticsData} />
        <ResponsiveTable
          data={isMobile ? mobileItems : data?.data || []}
          isLoading={isLoading}
          columns={columns}
          title='Products'
          icon={<Package />}
          rowKey='id'
          paginationConfig={paginationConfig}
          fetchNextPage={isMobile ? fetchNextMobilePage : fetchNextPage}
          hasMore={isMobile ? mobileHasMore : hasMore}
          onRow={record => ({
            onClick: () => handleRowClick(record),
            className: 'cursor-pointer ',
          })}
        />
      </Col>
    </Row>
  );
};

export default Products;
