import React from 'react';
import axios from 'axios';
import { usePagination, DOTS } from './usePagination';
import {useNavigate , Link,useLocation, Navigate} from 'react-router-dom';
import {localhost,formatter,threadlURL,ItemRecommend,cartURL,itemvariation,updatecartURL} from "../constants"

const Pagination = (props) => {
  let {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    classActive,
    classNormal,
    classIcon
  } = props;
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };
  
  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <>
      <button
        className={`${classIcon} ${classIcon}--left ${currentPage === 1?'disable':""}`}
        onClick={onPrevious}
      >
        <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className="svg-icon icon-arrow-left"><g><path d="m8.5 11c-.1 0-.2 0-.3-.1l-6-5c-.1-.1-.2-.3-.2-.4s.1-.3.2-.4l6-5c .2-.2.5-.1.7.1s.1.5-.1.7l-5.5 4.6 5.5 4.6c.2.2.2.5.1.7-.1.1-.3.2-.4.2z"></path></g></svg>
      </button>
      {paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return <button className={`${classNormal} button-no-outline--non-click`}>&#8230;</button>;
        }

        return (
          <button
            className={`${pageNumber === currentPage?classActive:classNormal}`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}
      <button
        className={`${classIcon} ${classIcon}--right ${currentPage === lastPage?'disable':''}`}
        onClick={onNext}
      >
        <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className="svg-icon icon-arrow-right"><path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></path></svg>
      </button>
    </>
  );
};

export default Pagination;