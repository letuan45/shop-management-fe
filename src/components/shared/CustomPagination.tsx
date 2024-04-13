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
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;
  const { totalItem, maxItemPerPage } = props;
  const totalPages = Math.ceil(totalItem / maxItemPerPage);
  const paginationItems = [];

  // Previos
  paginationItems.push(
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>,
  );

  // 1st item
  paginationItems.push(
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
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
        <PaginationLink href="#">{i}</PaginationLink>
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
      <PaginationLink href="#">{totalPages}</PaginationLink>
    </PaginationItem>,
  );

  // Add next button
  paginationItems.push(
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>,
  );

  return (
    <Pagination>
      <PaginationContent>{paginationItems}</PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
