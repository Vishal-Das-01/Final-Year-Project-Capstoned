"use client";
import { Pagination } from "flowbite-react";
import { useState } from "react";

export function PaginationComponent({totalPages, page, setPageNumber}) {
  const onPageChange = (page) => {
    setPageNumber(page)
  }

  return (
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={onPageChange} />
  );
}