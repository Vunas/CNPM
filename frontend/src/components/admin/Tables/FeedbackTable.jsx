import { Delete, Star, StarBorder } from "@mui/icons-material";
import React, { useMemo, useState } from "react";
import CommonToolbar from "../../CommonToolbar";
import { exportExcel } from "../../../utils/Exceljs";
import { usePagination } from "../../../utils/Pagination/Paginations";
import PaginationControls from "../../../utils/Pagination/PaginationControl";

const FeedbackTable = ({ feedbacks, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterParams, setFilterParams] = useState({ rating: "" });

  // Lọc phản hồi theo rating và từ khóa tìm kiếm
  const filterFeedbacks = (feedbacks, searchTerm, filterParams) => {
    return feedbacks.filter((feedback) => {
      const matchesSearch =
        feedback.customerName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        feedback.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter = Object.entries(filterParams).every(
        ([key, value]) => {
          if (!value) return true;
          return feedback[key].toString() === value;
        }
      );

      return matchesSearch && matchesFilter;
    });
  };

  const filteredFeedbacks = useMemo(() => {
    return filterFeedbacks(feedbacks, searchTerm, filterParams);
  }, [feedbacks, searchTerm, filterParams]);

  const { currentPage, totalPages, currentData, setPage } =
    usePagination(filteredFeedbacks);

  // Xuất phản hồi ra file Excel
  const handleExport = () => {
    exportExcel(
      feedbacks,
      [
        { header: "ID", key: "feedbackId" },
        { header: "Customer Name", key: "customerName" },
        { header: "Email", key: "email" },
        { header: "Message", key: "message" },
        { header: "Rating", key: "rating" },
      ],
      "FeedbackList.xlsx"
    );
  };

  return (
    <div className="flex flex-col h-full max-h-full relative">
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 mb-6 rounded-3xl px-4 py-3">
        {/* Bộ lọc Rating */}
        <div className="relative">
          <select
            className="bg-white text-[#4a4a4a] text-sm font-medium rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-shadow"
            onChange={(e) =>
              setFilterParams({ ...filterParams, rating: e.target.value })
            }
          >
            <option value="">All Ratings</option>
            {[1, 2, 3, 4, 5].map((rate) => (
              <option key={rate} value={rate}>
                {rate} Stars
              </option>
            ))}
          </select>
        </div>

        {/* Thanh công cụ chung */}
        <CommonToolbar
          onExport={handleExport}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      {/* Bảng hiển thị phản hồi */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              {[
                "ID",
                "Customer Name",
                "Email",
                "Message",
                "Rating",
                "Action",
              ].map((header, index) => (
                <th key={index} className="p-3 text-center">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredFeedbacks.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-3 text-center">
                  No feedback available.
                </td>
              </tr>
            ) : (
              currentData.map((feedback) => (
                <tr
                  key={feedback.feedbackId}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3">{feedback.feedbackId}</td>
                  <td className="p-3">{feedback.customerName}</td>
                  <td className="p-3">{feedback.email}</td>
                  <td className="p-3">{feedback.message}</td>
                  <td className="p-3 text-center">
                    {[...Array(5)].map((_, index) =>
                      index < feedback.rating ? (
                        <Star key={index} className="text-yellow-500" />
                      ) : (
                        <StarBorder key={index} />
                      )
                    )}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => onDelete(feedback.feedbackId)}
                      className="text-red-600 hover:underline mr-2"
                      color="secondary"
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

      {/* Điều khiển phân trang */}
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

export default FeedbackTable;
