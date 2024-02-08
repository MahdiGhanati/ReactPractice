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
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />

      <table className="table container">
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
  );
}

export default Excell