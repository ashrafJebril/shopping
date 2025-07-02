import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Table from './Table';
import InfiniteList from './InfinitList';

const ResponsiveTable = ({
  data,
  isLoading,
  columns,
  title,
  icon,
  actionUrl,
  actionText,
  paginationConfig,
  fetchNextPage,
  hasMore,
  onRow,
  ...props
}) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return isMobile ? (
    <InfiniteList
      data={data}
      isLoading={isLoading}
      fetchNextPage={fetchNextPage}
      hasMore={hasMore}
      columns={columns}
      title={title}
      icon={icon}
      actionUrl={actionUrl}
      actionText={actionText}
      onRow={onRow}
    />
  ) : (
    <Table
      dataSource={data}
      columns={columns}
      isLoading={isLoading}
      paginationConfig={paginationConfig}
      onPaginationChange={paginationConfig?.onChange}
      title={title}
      icon={icon}
      actionUrl={actionUrl}
      actionText={actionText}
      onRow={onRow}
      {...props}
    />
  );
};

export default ResponsiveTable;
