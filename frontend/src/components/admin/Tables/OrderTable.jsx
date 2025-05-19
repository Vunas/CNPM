import {
  Delete,
  Fastfood,
  LocalShipping,
  Restaurant,
} from "@mui/icons-material";
import React, { useMemo, useState } from "react";
import CommonToolbar from "../../CommonToolbar";
import { usePagination } from "../../../utils/Pagination/Paginations";
import PaginationControls from "../../../utils/Pagination/PaginationControl";
import { format } from "date-fns";
import {
  HourglassEmpty,
  CheckCircle,
  Sync,
  DoneAll,
  Cancel,
} from "@mui/icons-material";
import { exportExcel } from "../../../utils/ExcelJS";

const OrderTable = ({ orders, onDelete, tables, restaurants }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterParams, setFilterParams] = useState({
    orderStatus: "",
    orderType: "",
    tableNumber: "",
  });

  const filterOrders = (ordersData, searchTerm, filterParams) => {
    return ordersData.filter((order) => {
      const matchesSearch =
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerContact
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        order.orderType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderStatus.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter = Object.entries(filterParams).every(
        ([key, value]) => {
          if (!value) return true;
          if (key === "orderStatus" || key === "orderType") {
            return order[key].toLowerCase() === value.toLowerCase();
          }
          if (key === "tableNumber") {
            return order.restaurantTable?.tableNumber?.toString() === value;
          }
          if (key === "restaurantId") {
            return order.restaurant?.restaurantId?.toString() === value;
          }
        }
      );
      return matchesSearch && matchesFilter;
    });
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

  const sortedAndFilteredOrders = useMemo(() => {
    let data = filterOrders(orders, searchTerm, filterParams);

    if (sortField) {
      data.sort((a, b) => {
        const aValue =
          typeof a[sortField] === "string"
            ? a[sortField].toLowerCase()
            : a[sortField];
        const bValue =
          typeof b[sortField] === "string"
            ? b[sortField].toLowerCase()
            : b[sortField];

        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : -1;
        }
        return aValue < bValue ? 1 : -1;
      });
    }
    return data;
  }, [orders, searchTerm, filterParams, sortField, sortOrder]);

  const { currentPage, totalPages, currentData, setPage } = usePagination(
    sortedAndFilteredOrders
  );

  const handleExport = () => {
    exportExcel(
      orders,
      [
        { header: "Order ID", key: "orderId" },
        { header: "Order Date", key: "orderDate" },
        { header: "Total Price", key: "totalPrice" },
        { header: "Order Status", key: "orderStatus" },
        { header: "Order Type", key: "orderType" },
        { header: "Table ID", key: "TableID" },
        { header: "Customer Contact", key: "customerContact" },
        { header: "Account ID", key: "AccountID" },
        { header: "Restaurant ID", key: "restaurant.restaurantId" },
      ],
      "OrderList.xlsx"
    );
  };

  const getOrderTypeStyles = (type) => {
    switch (type) {
      case "Dine-in":
        return {
          className: "bg-blue-100 text-blue-700",
          icon: <Restaurant className="text-blue-700" />,
        };
      case "Takeaway":
        return {
          className: "bg-orange-100 text-orange-700",
          icon: <Fastfood className="text-orange-700" />,
        };
      case "Delivery":
        return {
          className: "bg-green-100 text-green-700",
          icon: <LocalShipping className="text-green-700" />,
        };
      default:
        return {
          className: "bg-gray-100 text-gray-700",
          icon: <Fastfood className="text-gray-700" />,
        };
    }
  };

  const getorderStatusStyles = (status) => {
    switch (status) {
      case "Pending":
        return {
          className: "bg-yellow-100 text-yellow-700",
          icon: <HourglassEmpty className="text-yellow-700" />,
        };
      case "Confirmed":
        return {
          className: "bg-green-100 text-green-700",
          icon: <CheckCircle className="text-green-700" />,
        };
      case "Processing":
        return {
          className: "bg-blue-100 text-blue-700",
          icon: <Sync className="text-blue-700" />,
        };
      case "Finished":
        return {
          className: "bg-gray-300 text-gray-700",
          icon: <DoneAll className="text-gray-700" />,
        };
      case "Cancelled":
        return {
          className: "bg-red-100 text-red-700",
          icon: <Cancel className="text-red-700" />,
        };
      default:
        return {
          className: "bg-gray-100 text-gray-700",
          icon: <Cancel className="text-gray-700" />,
        };
    }
  };

  return (
    <div className="flex flex-col h-full max-h-full relative">
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 mb-6 rounded-3xl px-4 py-3">
        <div className="relative">
          <select
            className="bg-white text-[#4a4a4a] text-sm font-medium rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-shadow"
            onChange={(e) =>
              setFilterParams({ ...filterParams, tableNumber: e.target.value })
            }
            value={filterParams.tableNumber}
          >
            <option value="">Table Number</option>
            {tables
              .filter(
                (table) => table.restaurantId === filterParams.restaurantId
              )
              .map((table) => (
                <option key={table.tableNumber} value={table.tableNumber}>
                  {table.tableNumber}
                </option>
              ))}
          </select>
        </div>

        <div className="relative">
          <select
            className="bg-white text-[#4a4a4a] text-sm font-medium rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-shadow"
            onChange={(e) =>
              setFilterParams({ ...filterParams, restaurantId: e.target.value })
            }
            value={filterParams.restaurantId}
          >
            <option value="">RestaurantId</option>
            {restaurants.map((restaurant) => (
              <option
                key={restaurant.restaurantId}
                value={restaurant.restaurantId}
              >
                {restaurant.name}
              </option>
            ))}
          </select>
        </div>

        {/* Order Status Filter */}
        <div className="relative">
          <select
            className="bg-white text-[#4a4a4a] text-sm font-medium rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-shadow"
            onChange={(e) =>
              setFilterParams({ ...filterParams, orderStatus: e.target.value })
            }
            value={filterParams.orderStatus}
          >
            <option value="">Order Status</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Finished">Finished</option>
            <option value="Processing">Processing</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Order Type Filter */}
        <div className="relative">
          <select
            className="bg-white text-[#4a4a4a] text-sm font-medium rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-shadow"
            onChange={(e) =>
              setFilterParams({ ...filterParams, orderType: e.target.value })
            }
            value={filterParams.orderType}
          >
            <option value="">Order Type</option>
            <option value="Dine-in">Dine-in</option>
            <option value="Takeaway">Takeaway</option>
            <option value="Delivery">Delivery</option>
          </select>
        </div>

        <CommonToolbar
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
                "orderId",
                "orderDate",
                "totalPrice",
                "orderStatus",
                "orderType",
                "tableNumber",
                "customerContact",
                "restaurant",
                "Actions",
              ].map((header, index, array) => (
                <th
                  key={header}
                  className={`min-w-24 p-3 gap-4 text-center cursor-pointer ${
                    index === 0 ? "rounded-tl-2xl rounded-bl-2xl" : ""
                  } ${
                    index === array.length - 1
                      ? "rounded-tr-2xl rounded-br-2xl"
                      : ""
                  }`}
                  onClick={() => handleSort(header)}
                >
                  {header}{" "}
                  {sortField === header && (sortOrder === "asc" ? "▲" : "▼")}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td colSpan="10" className="p-3 text-center">
                  {" "}
                  No orders available.
                </td>
              </tr>
            ) : (
              currentData.map((order) => {
                const { className: statusClass, icon: statusIcon } =
                  getorderStatusStyles(order.orderStatus);
                const { className: typeClass, icon: typeIcon } =
                  getOrderTypeStyles(order.orderType);

                return (
                  <tr
                    key={order.orderId}
                    className="border-b hover:bg-gray-50 text-center"
                  >
                    <td className="p-3">{order.orderId}</td>
                    <td className="p-3">
                      {format(new Date(order.orderDate), "d/M/yyyy, HH:mm:ss")}
                    </td>{" "}
                    <td className="p-3">{order.totalPrice}</td>{" "}
                    <td className="p-3">
                      <div
                        className={`px-2 py-1 gap-2 rounded-md flex items-center justify-center w-32 mx-auto ${statusClass}`}
                      >
                        {order.orderStatus} {statusIcon}
                      </div>
                    </td>
                    <td className="p-3">
                      <div
                        className={`px-2 py-1 gap-2 rounded-md flex items-center justify-center w-32 mx-auto ${typeClass}`}
                      >
                        {order.orderType} {typeIcon}
                      </div>
                    </td>
                    <td className="p-3">
                      {order.restaurantTable?.tableNumber}
                    </td>
                    <td className="p-3">{order.customerContact}</td>
                    <td className="p-3">{order.restaurant.name}</td>
                    <td className="p-3">
                      <button
                        onClick={() => onDelete(order.orderId)}
                        className="text-red-600 hover:underline mr-2"
                      >
                        <Delete />
                      </button>
                    </td>
                  </tr>
                );
              })
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

export default OrderTable;
