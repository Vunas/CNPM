import { Create, Delete, Lock, LockOpen } from "@mui/icons-material";
import React, { useMemo, useState } from "react";
import CommonToolbar from "../../CommonToolbar";
import { usePagination } from "../../../utils/Pagination/Paginations";
import PaginationControls from "../../../utils/Pagination/PaginationControl";
import { exportExcel } from "../../../utils/Exceljs";

const AccountTable = ({ accounts, onAdd, onEdit, onDelete, onLock }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterParams, setFilterParams] = useState({ status: "" });

  const filterAccounts = (accounts, searchTerm, filterParams) => {
    return accounts.filter((account) => {
      const matchesSearch =
        account.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter = Object.entries(filterParams).every(
        ([key, value]) => {
          if (!value) return true;
          return account[key].toString() === value;
        }
      );

      return matchesSearch && matchesFilter;
    });
  };

  const filteredAccounts = useMemo(() => {
    return filterAccounts(accounts, searchTerm, filterParams);
  }, [accounts, searchTerm, filterParams]);

  const { currentPage, totalPages, currentData, setPage } =
    usePagination(filteredAccounts);

  const handleExport = () => {
    exportExcel(
      accounts,
      [
        { header: "id", key: "accountId" },
        { header: "Username", key: "username" },
        { header: "Email", key: "email" },
        { header: "Phone", key: "phone" },
        { header: "Role", key: "role" },
      ],
      "AccountList.xlsx"
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
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 mb-6 rounded-3xl px-4 py-3">
        {/* Filter Buttons */}
        <div className="relative">
          <select
            className="bg-white text-[#4a4a4a] text-sm font-medium rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-shadow"
            onChange={(e) =>
              setFilterParams({ ...filterParams, status: e.target.value })
            }
          >
            <option value="">Status</option>
            <option value="1">Active</option>
            <option value="2">Lock</option>
          </select>
        </div>

        <CommonToolbar
          onAdd={onAdd}
          onExport={handleExport}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              {[
                "Id",
                "Username",
                "Email",
                "Phone",
                "Status",
                "RestaurantID",
                "Role",
                "Action",
              ].map((header, index, array) => (
                <th
                  key={header}
                  className={`p-3 gap-4 text-center cursor-pointer ${
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
            {filteredAccounts.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-3 text-center">
                  No accounts available.
                </td>
              </tr>
            ) : (
              currentData.map((account) => (
                <tr
                  key={account.accountId}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3">{account.accountId}</td>
                  <td className="p-3">{account.username}</td>
                  <td className="p-3">{account.email}</td>
                  <td className="p-3">{account.phone}</td>
                  <td className="p-3">
                    {account.status === 1 ? (
                      <div className="bg-green-100 text-green-700 px-2 py-1 rounded-md flex items-center justify-center w-28 mx-auto">
                        <span className="mr-2">Active</span>
                        <span>✔️</span>
                      </div>
                    ) : (
                      <div className="bg-red-100 text-red-700 px-2 py-1 rounded-md flex items-center justify-center w-24 mx-auto">
                        <span className="mr-2">Lock</span>
                        <span>❌</span>
                      </div>
                    )}
                  </td>
                  <td className="p-3">{account.restaurant?.restaurantId}</td>
                  <td className="p-3">{account.role}</td>
                  <td className="p-3">
                    <button
                      onClick={() => onEdit(account)}
                      className="text-blue-600 hover:underline mr-2"
                    >
                      <Create />
                    </button>
                    <button
                      onClick={() => onDelete(account.accountId)}
                      className="text-red-600 hover:underline mr-2"
                      color="secondary"
                    >
                      <Delete />
                    </button>
                    <button
                      onClick={() => onLock(account.accountId)}
                      className={`${
                        account.status === 1 ? "text-green-600" : "text-red-600"
                      } hover:underline`}
                    >
                      {account.status === 1 ? <LockOpen /> : <Lock />}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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

export default AccountTable;
