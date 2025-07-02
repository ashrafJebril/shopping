import { useQuery } from '@tanstack/react-query';
import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const usePaginatedQuery = ({
  queryKey,
  fetchFn,
  initialPage = 1,
  pageSize = 5,
  enabled = true,
  useUrlParams = true,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getInitialPage = () => {
    if (!useUrlParams) return initialPage;
    const urlPage = searchParams.get('page');
    return urlPage ? parseInt(urlPage, 10) : initialPage;
  };

  const getInitialPageSize = () => {
    if (!useUrlParams) return pageSize;
    const urlPageSize = searchParams.get('pageSize');
    return urlPageSize ? parseInt(urlPageSize, 10) : pageSize;
  };

  const [page, setPage] = useState(getInitialPage);
  const [pageSizeState, setPageSizeState] = useState(getInitialPageSize);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [mobileItems, setMobileItems] = useState([]);
  const [mobilePage, setMobilePage] = useState(getInitialPage);
  const [mobileHasMore, setMobileHasMore] = useState(true);

  const updateUrlParams = useCallback(
    (newPage, newPageSize) => {
      if (!useUrlParams) return;

      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('page', newPage.toString());
      newSearchParams.set('pageSize', newPageSize.toString());
      setSearchParams(newSearchParams);
    },
    [searchParams, setSearchParams, useUrlParams]
  );

  useEffect(() => {
    if (!useUrlParams) return;

    const urlPage = searchParams.get('page');
    const urlPageSize = searchParams.get('pageSize');

    if (urlPage && parseInt(urlPage, 10) !== page) {
      setPage(parseInt(urlPage, 10));
    }

    if (urlPageSize && parseInt(urlPageSize, 10) !== pageSizeState) {
      setPageSizeState(parseInt(urlPageSize, 10));
    }
  }, [searchParams, useUrlParams, page, pageSizeState]);

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: [...queryKey, page, pageSizeState],
    queryFn: () => fetchFn(page, pageSizeState),
    placeholderData: previousData => previousData,
    staleTime: 2 * 60 * 1000,
    enabled,
    onSuccess: result => {
      if (page === 1) {
        setItems(result.data);
      } else {
        setItems(prev => [...prev, ...result.data]);
      }
      setHasMore(
        result.pagination.currentPage * result.pagination.pageSize <
          result.pagination.totalItems
      );
    },
    onError: err => {
      console.error('Query error:', err);
    },
  });

  const fetchNextPage = useCallback(() => {
    if (
      data &&
      data.pagination.currentPage * data.pagination.pageSize >=
        data.pagination.totalItems
    ) {
      setHasMore(false);
      return;
    }
    const newPage = page + 1;
    setPage(newPage);
    updateUrlParams(newPage, pageSizeState);
  }, [data, page, pageSizeState, updateUrlParams]);

  const reset = useCallback(() => {
    setPage(initialPage);
    setItems([]);
    setHasMore(true);
    updateUrlParams(initialPage, pageSizeState);
  }, [initialPage, pageSizeState, updateUrlParams]);

  const fetchNextMobilePage = useCallback(async () => {
    const result = await fetchFn(mobilePage, pageSize);
    setMobileItems(prev => [...prev, ...result.data]);
    setMobilePage(prev => prev + 1);
    setMobileHasMore(
      result.pagination.currentPage * result.pagination.pageSize <
        result.pagination.totalItems
    );
  }, [fetchFn, mobilePage, pageSize]);

  const resetMobile = useCallback(() => {
    setMobilePage(initialPage);
    setMobileItems([]);
    setMobileHasMore(true);
  }, [initialPage]);

  const setPageSize = useCallback(
    newPageSize => {
      setPageSizeState(newPageSize);
      setPage(1);
      updateUrlParams(1, newPageSize);
    },
    [updateUrlParams]
  );

  const setPageWithUrl = useCallback(
    newPage => {
      setPage(newPage);
      updateUrlParams(newPage, pageSizeState);
    },
    [pageSizeState, updateUrlParams]
  );

  return {
    items,
    isLoading,
    isError,
    error,
    isFetching,
    page,
    pageSize: pageSizeState,
    hasMore,
    fetchNextPage,
    setPage: setPageWithUrl,
    setPageSize,
    reset,
    total: data?.pagination.totalItems || 0,
    data,
    mobileItems,
    mobileHasMore,
    fetchNextMobilePage,
    resetMobile,
  };
};

export default usePaginatedQuery;
