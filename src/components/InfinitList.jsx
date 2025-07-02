import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Button, Space } from 'antd';

const InfiniteList = ({
  data,
  isLoading,
  fetchNextPage,
  hasMore,
  columns,
  title,
  icon,
  actionUrl,
  actionText,
  onRow,
}) => {
  useEffect(() => {
    if (data.length === 0 && hasMore) {
      fetchNextPage();
    }
  }, [data.length, hasMore, fetchNextPage]);

  return (
    <>
      {(title || actionUrl || actionText || icon) && (
        <Space className='w-full flex justify-between my-4 items-center'>
          <div className='font-bold text-xl flex items-center'>
            <span className='flex items-center'>{icon}</span>
            {title}
          </div>
          {actionUrl && actionText && (
            <Button type='primary' href={actionUrl}>
              {actionText}
            </Button>
          )}
        </Space>
      )}
      <div
        id='scrollableDiv'
        style={{
          height: '70vh',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <InfiniteScroll
          dataLength={data.length}
          next={() => {
            fetchNextPage();
          }}
          hasMore={hasMore}
          loader={<div className='text-center py-4'>Loading...</div>}
          endMessage={<div className='text-center py-4'>No more items</div>}
          scrollableTarget='scrollableDiv'
        >
          {data.map((item, index) => (
            <div
              key={index}
              className='p-4 mb-2 bg-white rounded-lg shadow-md border cursor-pointer hover:bg-blue-50 transition-colors duration-200'
              onClick={() => onRow?.(item)?.onClick?.()}
            >
              {columns.map(col => (
                <div key={col.key} className='mb-2'>
                  <strong>{col.title}: </strong>
                  {col.render
                    ? col.render(item[col.dataIndex], item)
                    : item[col.dataIndex]}
                </div>
              ))}
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default InfiniteList;
