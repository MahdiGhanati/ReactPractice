
import * as XLSX from "xlsx";

export const downloadExcel = (data,name)=>{
    var workbook = XLSX.utils.book_new(),
    worksheet = XLSX.utils.json_to_sheet(data);
    workbook.SheetNames.push("First");
    workbook.Sheets["First"] = worksheet;
    XLSX.writeFile(workbook, name ? name+".xlsx" :"dem.xlsx")
}
