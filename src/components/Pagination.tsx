import { Button } from "./ui/button";

type PaginationProps = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = (props: PaginationProps) => {
  return (
    <div className="mt-6 flex justify-around">
      <Button
        onClick={() => props.setPage((prev: number) => Math.max(prev - 1, 1))}
        disabled={props.page === 1}
      >
        Prev
      </Button>
      <span>Page {props.page}</span>
      <Button onClick={() => props.setPage((prev: number) => prev + 1)}>
        Next
      </Button>
    </div>
  );
};

export default Pagination;
