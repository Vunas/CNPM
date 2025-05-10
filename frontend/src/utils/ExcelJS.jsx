import ExcelJS from "exceljs";

export const exportExcel = async (dataList, columns, fileName) => {
  try {
    if (!window.confirm("Bạn có chắc chắn muốn xuất file Excel?")) return;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    // Thêm cột vào worksheet
    worksheet.columns = columns;

    // Thêm dữ liệu vào worksheet
    dataList.forEach((item) => worksheet.addRow(item));

    // Lưu file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  } catch (error) {
    console.error("Lỗi trong quá trình xuất file Excel:", error);
    alert("Có lỗi xảy ra khi xuất file Excel. Vui lòng thử lại.");
  }
};
