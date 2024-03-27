"use client"
import { Button } from "@/components/ui/button";
import React, { useState, ChangeEvent, FormEvent } from "react";
import * as XLSX from 'xlsx';
import { Divider, Radio, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { CldUploadWidget } from "next-cloudinary";


interface ExcelDataType {
  [key: string]: any;
}

const XlReader: React.FC = () => {
  const [excelFile, setExcelFile] = useState<ArrayBuffer | null>(null);
  const [typeError, setTypeError] = useState<string | null>(null);
  const [excelData, setExcelData] = useState<ExcelDataType[] | null>(null);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    let fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
    let selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          if (e.target) {
            setExcelFile(e.target.result as ArrayBuffer);
          }
        }
      }
      else {
        setTypeError('Please select only excel file types');
        setExcelFile(null);
      }
    }
    else {
      console.log('Please select your file');
    }
  }

  const handleFileSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: 'buffer' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data: ExcelDataType[] = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
      console.log('Uploaded Excel file information:');
      console.log('Sheet names:', workbook.SheetNames);
      console.log('First sheet data:', data);
      console.log('Number of rows:', data.length);
      console.log('Number of columns:', Object.keys(data[0]).length);
    }
  }

  const columns: TableColumnsType<ExcelDataType> = excelData ? Object.keys(excelData[0]).map((key) => ({
    title: key,
    dataIndex: key,
  })) : [];

  return (
    <div className="container">
      <h3 className="bg-red-400 text-white p-2">Upload & View Excel Sheets</h3>

      <form className="form-group custom-form mt-2" onSubmit={handleFileSubmit}>
        <input type="file" className="form-control" required onChange={handleFile} />
        <Button type="submit" className="btn btn-success btn-md">UPLOAD</Button>
        {typeError && (
          <div className="alert alert-danger" role="alert">{typeError}</div>
        )}
      </form>


      <div className="viewer">
        {excelData ? (
          <div>
            <Divider />
            <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
              <Table
                columns={columns}
                dataSource={excelData}
                rowKey={(record, index) => (index ?? '').toString()}
              />
            </div>
          </div>
        ) : (
          <div className="mt-4">No File is uploaded yet!</div>
        )}
      </div>
    </div>
  );
}

export default XlReader;


// "use client"

// import { Button } from "@/components/ui/button";
// import React, { useState, ChangeEvent, FormEvent } from "react";
// import * as XLSX from 'xlsx';
// import { Divider, Radio, Table } from 'antd';
// import type { TableColumnsType } from 'antd';
// import { CldUploadWidget } from "next-cloudinary";

// const XlReader: React.FC = () => {
//   const [typeError, setTypeError] = useState<string | null>(null);
//   const [excelData, setExcelData] = useState<any[] | null>(null);

//   const handleFileSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const fileInput = (e.target as HTMLFormElement).getElementsByTagName('input')[0];
//     const selectedFile = fileInput.files && fileInput.files[0];

//     if (!selectedFile) {
//       setTypeError('Please select a file');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', selectedFile);

//     try {
//       const response = await fetch('/api/companiesxl', { // Update the API endpoint to match your backend
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         console.log('File uploaded successfully');
//         const responseData = await response.json();
//         console.log('Response from server:', responseData);
//         // Here you can perform any additional actions based on the response from the server
//       } else {
//         console.error('Error uploading file:', await response.text());
//       }
//     } catch (error: any) {
//       console.error('Error handling file upload:', error);
//     }
//   };

//   return (
//     <div className="container">
//       <h3 className="bg-red-400 text-white p-2">Upload & View Excel Sheets</h3>

//       <form className="form-group custom-form mt-2" encType="multipart/form-data" onSubmit={handleFileSubmit}>
//         <input type="file" className="form-control" required />
//         <Button type="submit" className="btn btn-success btn-md">UPLOAD</Button>
//         {typeError && (
//           <div className="alert alert-danger" role="alert">{typeError}</div>
//         )}
//       </form>

//       <div className="viewer">
//         {excelData ? (
//           <div>
//             <Divider />
//             <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
//               <Table
//                 columns={Object.keys(excelData[0]).map(key => ({
//                   title: key,
//                   dataIndex: key,
//                   key,
//                 }))}
//                 dataSource={excelData}
//                 rowKey={(record, index) => (index ?? '').toString()}
//               />
//             </div>
//           </div>
//         ) : (
//           <div className="mt-4">No File is uploaded yet!</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default XlReader;
