import lodash from "lodash"

const PAGE_LIST_SIZE = 10;

function getPaginator(totalCount, page, perPage = 10) {
  const PER_PAGE = perPage;
  const totalPage = Math.ceil(totalCount / PER_PAGE);

  // 시작 페이지: 몫 * PAGE_LIST_SIZE + 1
  let quot = parseInt(page / PAGE_LIST_SIZE);

  if (page % PAGE_LIST_SIZE === 0) {
    quot -= 1;
  }
  const startPage = quot * PAGE_LIST_SIZE + 1;

  // 끝 페이지: 시작 페이지 + PAGE_LIST_SIZE - 1
  const endPage = startPage + PAGE_LIST_SIZE - 1 < totalPage ? startPage + PAGE_LIST_SIZE - 1 : totalPage;
  const isFirstPage = page === 1;
  const isLastPage = page === totalPage;
  const hasPrev = page > 1;
  const hasNext = page < totalPage;

  const paginator = {
    pageList: lodash.range(startPage, endPage + 1),
    page,
    prevPage: page - 1,
    nextPage: page + 1,
    startPage,
    lastPage: totalPage,
    hasPrev,
    hasNext,
    isFirstPage,
    isLastPage
  };
  return paginator
}

export default getPaginator;
