"use client";
const Pagination = ({ page, setPage, hasMore }) => {
  return (
    <div className="mt-12 flex justify-between w-full">
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
        className="rounded-md bg-white text-black p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-200"
      >
        Previous
      </button>
      <button
        onClick={() => setPage((prev) => prev + 1)}
        disabled={!hasMore}
        className="rounded-md bg-white text-black p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-200"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
