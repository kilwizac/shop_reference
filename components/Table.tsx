import { ReactNode } from "react";

interface TableColumn {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
  className?: string;
}

interface TableProps {
  columns: TableColumn[];
  data: Record<string, any>[];
  className?: string;
  headerClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
}

export function Table({
  columns,
  data,
  className = "",
  headerClassName = "",
  rowClassName = "",
  cellClassName = "",
}: TableProps) {
  return (
    <div className={`border border-gray-200 dark:border-gray-800 ${className}`}>
      <table className="w-full">
        <thead className={`border-b border-gray-200 dark:border-gray-800 ${headerClassName}`}>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`text-${column.align || "left"} p-4 font-bold text-sm ${column.className || ""}`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`border-b border-gray-100 dark:border-gray-800 last:border-b-0 ${rowClassName}`}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`text-${column.align || "left"} p-4 text-sm ${cellClassName}`}
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
