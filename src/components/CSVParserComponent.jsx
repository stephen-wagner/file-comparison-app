import React from 'react';
import { usePapaParse } from 'react-papaparse';

const CSVParserComponent = ({ file, onParsed }) => {
  const { readString } = usePapaParse();

  React.useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csv = e.target.result;
        readString(csv, {
          complete: (results) => {
            onParsed(results.data);
          },
          error: (error) => {
            console.error('CSV parsing error:', error);
          },
        });
      };
      reader.readAsText(file);
    }
  }, [file, onParsed, readString]);

  return null; // Non-rendering component
};

export default CSVParserComponent;