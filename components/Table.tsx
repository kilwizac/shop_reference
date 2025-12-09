import { ReactNode } from "react";

interface TableColumn<T extends Record<string, unknown>> {
  key: Extract<keyof T, string>;
  label: string;
  align?: "left" | "center" | "right";
  className?: string;
  render?: (value: T[Extract<keyof T, string>], row: T) => ReactNode;
}

interface TableProps<T extends Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  className?: string;
  headerClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
}

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  className = "",
  headerClassName = "",
  rowClassName = "",
  cellClassName = "",
}: TableProps<T>) {
  return (
    <div className={`border border-gray-200 dark:border-gray-800 ${className}`}>
      <table className="w-full">
        <thead className={`border-b border-gray-200 dark:border-gray-800 ${headerClassName}`}>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`text-${column.align || "left"} p-3 font-bold text-sm ${column.className || ""}`}
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
                  className={`text-${column.align || "left"} p-3 text-sm ${cellClassName}`}
                >
                  {column.render
                    ? column.render(row[column.key], row)
                    : (row[column.key] as ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
