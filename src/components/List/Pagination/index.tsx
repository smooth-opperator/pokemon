import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { calculateOffset } from "../utils/helpers";

import {
  PaginationContainer,
  PaginationButton,
  PaginationMessage,
} from "./styles";

const Pagination: React.FC<{
  totalCount: number;
  pageCount: number;
}> = ({ totalCount, pageCount }) => {
  const { page } = useParams<{ page: string }>();

  const nextPage = parseInt(page, 10) + 1;
  const prevPage = parseInt(page, 10) - 1 || 0;
  const offset = calculateOffset(page);
  const range = `${offset} - ${offset + pageCount}`;

  const [hasPrevResults, setHasPrevResults] = useState(!!(offset >= 50));
  const [hasNextResults, setHasNextResults] = useState(!!(offset < totalCount));

  useEffect(() => {
    setHasPrevResults(!!(offset >= 50));
    setHasNextResults(!!(offset < totalCount));
  }, [page, offset, totalCount]);

  return (
    <PaginationContainer>
      <PaginationButton isDisabled={!hasPrevResults}>
        <Link to={`${prevPage}`}>Prev</Link>
      </PaginationButton>
      <PaginationMessage>
        {`Showing: ${range} of ${totalCount} Pokemon`}
      </PaginationMessage>
      <PaginationButton isDisabled={!hasNextResults}>
        <Link to={`${nextPage}`}>Next</Link>
      </PaginationButton>
    </PaginationContainer>
  );
};

export default Pagination;
