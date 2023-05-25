import { useTable } from "react-table";
import "./index.scss";

interface StatisticsTableProps {
  columns: any;
  data: any;
}

const StatisticsTable = ({ columns, data }: StatisticsTableProps) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
      <div className="tbl-header">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
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
                    row.values.statuses === "correct"
                      ? "correct"
                      : row.values.statuses === "uncertation"
                      ? "uncertation"
                      : row.values.statuses === "incorrect"
                      ? "incorrect"
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
