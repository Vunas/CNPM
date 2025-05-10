import { Create, Delete } from "@mui/icons-material";
import React, { useMemo, useState } from "react";
import CommonToolbar from "../../CommonToolbar";
import { exportExcel } from "../../../utils/Exceljs";
import { usePagination } from "../../../utils/Pagination/Paginations";
import PaginationControls from "../../../utils/Pagination/PaginationControl";

const RestaurantTableList = ({ tables, onAdd, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const filterTables = (tableData, searchTerm) => {
    return tableData.filter((table) =>
      table.tableNumber.toString().includes(searchTerm)
    );
  };

  const filteredTables = useMemo(() => {
    return filterTables(tables, searchTerm);
  }, [tables, searchTerm]);

  const { currentPage, totalPages, currentData, setPage } =
    usePagination(filteredTables);

  const handleExport = () => {
    exportExcel(
      tables,
      [
        { header: "Table ID", key: "tableId" },
        { header: "Table Number", key: "tableNumber" },
        { header: "QR Code", key: "qrCode" },
        { header: "Restaurant ID", key: "restaurantId" },
      ],
      "RestaurantTableList.xlsx"
    );
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);

    currentData.sort((a, b) => {
      if (order === "asc") {
        return a[field] > b[field] ? 1 : -1;
      }
      return a[field] < b[field] ? 1 : -1;
    });
  };

  return (
    <div className="flex flex-col h-full max-h-full relative">
      <div className="flex flex-wrap items-center gap-3 text-center sm:gap-4 md:gap-6 mb-6 rounded-3xl px-4 py-3">
        <CommonToolbar
          onAdd={onAdd}
          onExport={handleExport}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        <table className="w-full mb-20">
          <thead>
            <tr className="bg-gray-200">
              {[
                "tableId",
                "tableNumber",
                "qrCode",
                "restaurantId",
                "actions",
              ].map((header, index, array) => (
                <th
                  key={header}
                  className={`p-3 text-center cursor-pointer ${
                    index === 0 ? "rounded-tl-2xl rounded-bl-2xl" : ""
                  } ${
                    index === array.length - 1
                      ? "rounded-tr-2xl rounded-br-2xl"
                      : ""
                  }`}
                  onClick={() => handleSort(header.toLowerCase())}
                >
                  {header}{" "}
                  {sortField === header.toLowerCase() &&
                    (sortOrder === "asc" ? "▲" : "▼")}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-3 text-center">
                  No tables available.
                </td>
              </tr>
            ) : (
              currentData.map((table) => (
                <tr key={table.tableId} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-center">{table.tableId}</td>
                  <td className="p-3 text-center">{table.tableNumber}</td>
                  <td className="p-3 text-center">{table.qrCode}</td>
                  <td className="p-3 text-center">{table.restaurantId}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => onEdit(table)}
                      className="text-blue-600 hover:underline mr-2"
                    >
                      <Create />
                    </button>
                    <button
                      onClick={() => onDelete(table.tableId)}
                      className="text-red-600 hover:underline"
                    >
                      <Delete />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="sticky bottom-0 bg-white p-4">
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default RestaurantTableList;
