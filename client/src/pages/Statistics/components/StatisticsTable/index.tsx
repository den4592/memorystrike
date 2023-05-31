import { useSortBy, useTable, useRowSelect, usePagination } from "react-table";
import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import ShuffleIcon from "../../../../assets/svgs/shuffle.svg";

interface StatisticsTableProps {
  columns: any;
  data: any;
}

interface Props {
  indeterminate?: boolean;
  name: string;
}

const useCombinedRefs = (
  ...refs: React.Ref<HTMLInputElement>[]
): React.MutableRefObject<any> => {
  const targetRef = React.useRef();

  useEffect(() => {
    refs.forEach((ref: any) => {
      if (!ref) return;

      if (typeof ref === "function") {
        ref(targetRef.current!);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
};

const IndeterminateCheckbox = forwardRef<HTMLInputElement, Props>(
  ({ indeterminate, ...rest }, ref: React.Ref<HTMLInputElement>) => {
    const defaultRef = React.useRef(null);
    const combinedRef = useCombinedRefs(ref, defaultRef);

    useEffect(() => {
      if (combinedRef?.current) {
        combinedRef.current.indeterminate = indeterminate ?? false;
      }
    }, [combinedRef, indeterminate]);

    return (
      <React.Fragment>
        <input type="checkbox" ref={combinedRef} {...rest} />
      </React.Fragment>
    );
  }
);

const StatisticsTable = ({ columns, data }: StatisticsTableProps) => {
  const [topics, setTopics] = useState<any>();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    selectedFlatRows,

    //
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 10,
        sortBy: columns.map((one: any) => {
          return {
            desc: true,
            id: one.accessor === "timestamp",
          };
        }),
      },
    },

    useSortBy,
    usePagination,
    useRowSelect,

    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox
                name={""}
                {...getToggleAllRowsSelectedProps()}
              />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox
                name={""}
                {...row.getToggleRowSelectedProps()}
              />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  const handleSelectedRow = useCallback(() => {
    if (selectedFlatRows.length) {
      setTopics(selectedFlatRows.map((d) => d.original));
    }
  }, [selectedFlatRows]);

  useEffect(() => {
    handleSelectedRow();
  }, [selectedFlatRows]);

  return (
    <div className="statistics-table">
      {page.length ? (
        <>
          <div className="tbl-header">
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {column.render("Header")}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " 🔽"
                              : " 🔼"
                            : ""}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
            </table>
          </div>
          <div className="tbl-content">
            <table>
              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      className={
                        row.values.statuses === "정답"
                          ? "tbl-content-correct"
                          : row.values.statuses === "확인 필요"
                          ? "tbl-content-uncertation"
                          : row.values.statuses === "틀림"
                          ? "tbl-content-incorrect"
                          : ""
                      }
                    >
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="statistics-table-bottom-container">
            <div className="pagination">
              <div className="pagination-btn-container">
                <button
                  className="pagination-btn-container-btn"
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                >
                  {"<<"}
                </button>
                <button
                  className="pagination-btn-container-btn"
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  {"<"}
                </button>
                <button
                  className="pagination-btn-container-btn"
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                >
                  {">"}
                </button>
                <button
                  className="pagination-btn-container-btn"
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                >
                  {">>"}
                </button>
              </div>

              <span>
                페이지{" "}
                <strong>
                  {pageIndex + 1} - {pageOptions.length}
                </strong>{" "}
              </span>
            </div>
            <div className="statistics-table-btn-container">
              <Link
                to={{
                  pathname: `/memory/shuffled`,
                  state: { topics: topics },
                }}
                className={`btn content-main-btn-container-shuffle ${
                  !selectedFlatRows.length && "disabled-link"
                }`}
              >
                토픽 셔플
                <ShuffleIcon />
              </Link>
            </div>
          </div>
        </>
      ) : (
        <p className="statistics-table-text">
          "선택한 날짜에 해당하는 데이터가 존재하지 않습니다."
        </p>
      )}
    </div>
  );
};

export default memo(StatisticsTable);
