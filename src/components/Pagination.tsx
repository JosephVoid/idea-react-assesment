type PaginationProps = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = (props: PaginationProps) => {
  return (
    <div className="mt-6 flex justify-between">
      <button
        onClick={() => props.setPage((prev: number) => Math.max(prev - 1, 1))}
        disabled={props.page === 1}
        className="text-blue-600"
      >
        Prev
      </button>
      <span>Page {props.page}</span>
      <button
        onClick={() => props.setPage((prev: number) => prev + 1)}
        className="text-blue-600"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
