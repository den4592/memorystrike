import { useSortBy, useTable } from "react-table";
import "./index.scss";

interface StatisticsTableProps {
  columns: any;
  data: any;
}

const StatisticsTable = ({ columns, data }: StatisticsTableProps) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <>
      <div className="tbl-header">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
            {rows.map((row) => {
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
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StatisticsTable;
