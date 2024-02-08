import React, { useState } from "react";
import * as XLSX from "xlsx";
import { MappedBill } from "./ImortClass";

function Excell() {
  const [items, setItems] = useState([])
  let i =0


  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const info = XLSX.utils.sheet_to_json(ws); 

        const inf = info.map(d => new MappedBill(d))
        //console.log(info); 
        resolve(inf);
    };
    
    fileReader.onerror = (error) => {
        reject(error);
    };
});

    promise.then((d) => {
        setItems(d); 
    });

};

  return (
    <div>
      <div className="mt-2 flex items-center space-x-6">
        <input
          type="file"
          className="block w-full text-sm text-slate-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100"
          onChange={(e) => {
            const file = e.target.files[0];
            readExcel(file);
          }}
        />
      </div>
          <div class="mt-4 -mb-3">
            <div class="not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25">
              <div class="relative rounded-xl overflow-auto">
                <div class="shadow-sm overflow-hidden my-8">
                  <table className="border-collapse table-auto w-full text-sm">
                    <thead>
                      <tr>
                        <th scope="col">Item</th>
                        <th scope="col">Description</th>
                        <th scope="col">Power</th>
                      </tr>
                    </thead>
                    <tbody>
                        {items.map((d) => (
                        <tr key={d.id}>
                          <td>{d.Item}</td>
                          <td>{d.Description}</td>
                          <td>{d.Power}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
    </div>
  );
}

export default Excell