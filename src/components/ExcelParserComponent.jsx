import React from 'react';
import * as XLSX from 'xlsx';

const ExcelParserComponent = ({ file, onParsed }) => {
  React.useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        onParsed(jsonData);
      };
      reader.readAsArrayBuffer(file);
    }
  }, [file, onParsed]);

  return null; // Non-rendering component
};

export default ExcelParserComponent;