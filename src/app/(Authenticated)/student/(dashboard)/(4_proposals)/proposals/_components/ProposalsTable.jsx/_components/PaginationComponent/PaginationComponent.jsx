"use client";

import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import { Pagination } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function PaginationComponent({totalPages, page}) {
  const [currentPage, setCurrentPage] = useState(page);
  const router = useRouter();

  const onPageChange = (page) => {
    setCurrentPage(page);
    router.replace(`${FRONTEND_ROUTES.student_dashboard_proposals_page}?page=${page}`);
  }

  return (
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
  );
}