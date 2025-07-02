import React, { memo } from 'react';
import { Table as AntdTable, Button, Input, Space, Select } from 'antd';

const statusOptions = [
  { label: 'Total', key: 'total', type: 'primary' },
  { label: 'Pending', key: 'pending' },
  { label: 'Confirmed', key: 'confirmed' },
  { label: 'Failed', key: 'failed' },
  { label: 'Rejected', key: 'rejected' },
];

const Table = memo(
  ({
    className = '',
    title,
    icon,
    actionUrl,
    actionText,
    paginationConfig,
    onPaginationChange,
    dataSource,
    isLoading,
    onRow,
    ...props
  }) => {
    return (
      <>
        {(title || actionUrl || actionText || icon) && (
          <Space className='w-full flex justify-between my-6 items-center'>
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

        <Space className='w-full flex justify-between p-2 bg-white shadow-lg rounded-lg mb-2'>
          <Space>
            {statusOptions.map(option => (
              <Button
                key={option.key}
                type={option.type || 'default'}
                className='min-w-20'
              >
                {option.label}
              </Button>
            ))}
          </Space>
          <Space>
            <Input.Search placeholder='Search...' className='w-50' />
            <Button
              type='primary'
              style={{
                background: 'linear-gradient(90deg, #217346 0%, #21b96f 100%)',
                borderColor: '#217346',
              }}
              className='hover:opacity-90 transition-opacity'
            >
              Export to Excel
            </Button>
          </Space>
        </Space>

        <div className='shadow-lg min-h-[300px] rounded border border-gray-200 bg-white'>
          <AntdTable
            bordered
            dataSource={dataSource}
            loading={isLoading}
            pagination={false}
            onRow={onRow}
            rowClassName={
              onRow
                ? 'cursor-pointer hover:bg-blue-50 transition-colors duration-200'
                : ''
            }
            {...props}
          />
        </div>

        {paginationConfig && (
          <div className='flex justify-center mx items-center mt-4 px-4 py-3 bg-white rounded-lg shadow-sm border w-full'>
            <div className='text-sm text-gray-600 mr-2'>
              {paginationConfig.showTotal(paginationConfig.total, [
                (paginationConfig.current - 1) * paginationConfig.pageSize + 1,
                Math.min(
                  paginationConfig.current * paginationConfig.pageSize,
                  paginationConfig.total
                ),
              ])}
            </div>
            <div className='flex items-center gap-2'>
              <button
                onClick={() =>
                  onPaginationChange({
                    current: paginationConfig.current - 1,
                    pageSize: paginationConfig.pageSize,
                  })
                }
                disabled={paginationConfig.current === 1 || isLoading}
                className='px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Previous
              </button>
              <span className='px-3 py-1 text-sm'>
                Page {paginationConfig.current} of{' '}
                {Math.ceil(paginationConfig.total / paginationConfig.pageSize)}
              </span>
              <button
                onClick={() =>
                  onPaginationChange({
                    current: paginationConfig.current + 1,
                    pageSize: paginationConfig.pageSize,
                  })
                }
                disabled={
                  paginationConfig.current >=
                    Math.ceil(
                      paginationConfig.total / paginationConfig.pageSize
                    ) || isLoading
                }
                className='px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Next
              </button>
              <Select
                value={paginationConfig.pageSize}
                style={{ width: 80 }}
                onChange={value =>
                  onPaginationChange({
                    current: 1,
                    pageSize: value,
                  })
                }
                options={[
                  { value: 5, label: '5 / page' },
                  { value: 10, label: '10 / page' },
                  { value: 20, label: '20 / page' },
                  { value: 50, label: '50 / page' },
                  { value: 100, label: '100 / page' },
                ]}
              />
            </div>
          </div>
        )}
      </>
    );
  }
);

export default Table;
