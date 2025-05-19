import { Create, Delete, Lock, LockOpen } from "@mui/icons-material";
import React, { useMemo, useState } from "react";
import CommonToolbar from "../../CommonToolbar";
import { usePagination } from "../../../utils/Pagination/Paginations";
import PaginationControls from "../../../utils/Pagination/PaginationControl";
import { exportExcel } from "../../../utils/ExcelJS";

const ProductTable = ({ products, onAdd, onEdit, onDelete, onLock }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterParams, setFilterParams] = useState({ status: "" });

  const filterProducts = (productsData, searchTerm, filterParams) => {
    return productsData.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter = Object.entries(filterParams).every(
        ([key, value]) => {
          if (!value) return true;
          return product[key].toString() === value;
        }
      );

      return matchesSearch && matchesFilter;
    });
  };

  const filteredProducts = useMemo(() => {
    return filterProducts(products, searchTerm, filterParams);
  }, [products, searchTerm, filterParams]);

  const { currentPage, totalPages, currentData, setPage } =
    usePagination(filteredProducts);

  const handleExport = () => {
    exportExcel(
      products,
      [
        { header: "Product ID", key: "productId" },
        { header: "Name", key: "name" },
        { header: "Description", key: "description" },
        { header: "Price", key: "price" },
        { header: "Category", key: "category?.name" },
        { header: "status", key: "status" },
      ],
      "ProductList.xlsx"
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
            value={filterParams.status}
          >
            <option value="">Status</option>
            <option value="1">Available</option>{" "}
            <option value="0">Unavailable</option>{" "}
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
        <table className="w-full mb-20">
          <thead>
            <tr className="bg-gray-200">
              {[
                "productId",
                "image",
                "name",
                "price",
                "category",
                "status",
                "actions",
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
            {currentData.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-3 text-center">
                  No products available.
                </td>
              </tr>
            ) : (
              currentData.map((product) => (
                <tr
                  key={product.productId}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3">{product.productId}</td>
                  <td className="p-3">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      style={{ width: 80, height: 88 }}
                    />
                  </td>
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">{product.price}</td>
                  <td className="p-3">{product.category?.name}</td>
                  <td className="p-3">
                    {product.status === 1 ? (
                      <div className="bg-green-100 text-green-700 px-2 py-1 rounded-md flex items-center justify-center w-28 mx-auto">
                        <span className="mr-2">Available</span>
                        <span>✔️</span>
                      </div>
                    ) : (
                      <div className="bg-red-100 text-red-700 px-2 py-1 rounded-md flex items-center justify-center w-32 mx-auto">
                        <span className="mr-2">Unavailable</span>
                        <span>❌</span>
                      </div>
                    )}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => onEdit(product)}
                      className="text-blue-600 hover:underline mr-2"
                    >
                      <Create />
                    </button>
                    <button
                      onClick={() => onDelete(product.productId)}
                      className="text-red-600 hover:underline mr-2"
                      color="secondary"
                    >
                      <Delete />
                    </button>
                    <button
                      onClick={() => onLock(product.productId)}
                      className={`${
                        product.status === 1 ? "text-green-600" : "text-red-600"
                      } hover:underline`}
                    >
                      {product.status === 1 ? <LockOpen /> : <Lock />}
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

export default ProductTable;
