import { useSearchParams } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

interface Props {
  totalItem: number;
  maxItemPerPage: number;
}

const CustomPagination = (props: Props) => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") ?? undefined;
  const fullPath =
    window.location.pathname + `${searchTerm ? `?search=${searchTerm}` : ""}`;
  const paramPrefix = searchTerm ? "&" : "?";

  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;
  const { totalItem, maxItemPerPage } = props;
  const totalPages = Math.ceil(totalItem / maxItemPerPage) - 1;
  const paginationItems = [];

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  // Previos
  paginationItems.push(
    <PaginationItem>
      <PaginationPrevious
        className={
          prevPage === 0 ? "pointer-events-none opacity-50" : undefined
        }
        href={`${fullPath}${paramPrefix}page=${prevPage}`}
      />
    </PaginationItem>,
  );

  // 1st item
  paginationItems.push(
    <PaginationItem>
      <PaginationLink
        href={`${fullPath}${paramPrefix}page=1`}
        isActive={currentPage === 1}
      >
        1
      </PaginationLink>
    </PaginationItem>,
  );

  // Add middle pages
  let startPage = 2;
  let endPage = totalPages;
  if (totalPages > 4) {
    if (currentPage <= 4) {
      endPage = 4;
    } else if (currentPage >= totalPages - 3) {
      startPage = totalPages - 3;
    } else {
      startPage = currentPage - 1;
      endPage = currentPage + 1;
    }
    if (startPage > 2) {
      paginationItems.push(
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }
  }
  for (let i = startPage; i <= endPage; i++) {
    paginationItems.push(
      <PaginationItem>
        <PaginationLink
          href={`${fullPath}${paramPrefix}page=${i}`}
          isActive={currentPage === i}
        >
          {i}
        </PaginationLink>
      </PaginationItem>,
    );
  }

  // Add ellipsis if totalPages > 4
  if (totalPages > 4 && endPage < totalPages) {
    paginationItems.push(
      <PaginationItem>
        <PaginationEllipsis />
      </PaginationItem>,
    );
  }

  // Add last page
  paginationItems.push(
    <PaginationItem>
      <PaginationLink
        href={`${fullPath}${paramPrefix}page=${totalPages + 1}`}
        isActive={totalPages + 1 === currentPage}
      >
        {totalPages + 1}
      </PaginationLink>
    </PaginationItem>,
  );

  // Add next button
  paginationItems.push(
    <PaginationItem>
      <PaginationNext
        className={
          nextPage > totalPages + 1
            ? "pointer-events-none opacity-50"
            : undefined
        }
        href={`${fullPath}${paramPrefix}page=${nextPage}`}
      />
    </PaginationItem>,
  );

  return (
    <Pagination>
      <PaginationContent>
        {paginationItems.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
