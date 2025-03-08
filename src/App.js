import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from '@mui/material';
import FileUploadComponent from './components/FileUploadComponent';
import CSVParserComponent from './components/CSVParserComponent';
import ExcelParserComponent from './components/ExcelParserComponent';
import { validateData } from './utils/validateData';
import { compareDatasets } from './utils/compareDatasets';

const App = () => {
  const [file1, setFile1] = useState(null);
  const [parsedData1, setParsedData1] = useState(null);
  const [validationResult1, setValidationResult1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [parsedData2, setParsedData2] = useState(null);
  const [validationResult2, setValidationResult2] = useState(null);
  const [comparisonResult, setComparisonResult] = useState(null);

  const handleFileUpload = (file, setFile, setParsedData, setValidationResult) => {
    setFile(file);
    setParsedData(null); // Reset parsed data
    setValidationResult(null); // Reset validation result
  };

  const handleParsedData = async (data, setParsedData, setValidationResult) => {
    setParsedData(data);
    const validation = await validateData(data);
    setValidationResult(validation);
  };

  useEffect(() => {
    if (parsedData1 && parsedData2 && validationResult1?.isValid && validationResult2?.isValid) {
      const differences = compareDatasets(parsedData1, parsedData2);
      setComparisonResult(differences);
    } else {
      setComparisonResult(null); // Reset comparison if validation fails
    }
  }, [parsedData1, parsedData2, validationResult1, validationResult2]);

  return (
    <Grid container spacing={3} style={{ padding: '20px' }}>
      {/* Header */}
      <Grid item xs={12}>
        <Typography variant="h4" align="center">
          File Comparison Application
        </Typography>
      </Grid>

      {/* File Upload Areas */}
      <Grid item xs={6}>
      <Typography variant="h6">{file1 ? file1.name : "File 1"}</Typography>
      <FileUploadComponent onFileAccepted={(file) => handleFileUpload(file, setFile1, setParsedData1, setValidationResult1)} />
        {file1 && !parsedData1 && <CircularProgress style={{ marginTop: '10px' }} />}
        {file1 && file1.name.endsWith('.csv') && (
          <CSVParserComponent file={file1} onParsed={(data) => handleParsedData(data, setParsedData1, setValidationResult1)} />
        )}
        {file1 && file1.name.endsWith('.xlsx') && (
          <ExcelParserComponent file={file1} onParsed={(data) => handleParsedData(data, setParsedData1, setValidationResult1)} />
        )}
        {validationResult1 && (
          <div style={{ marginTop: '10px' }}>
            <Typography>
              Validation: {validationResult1.isValid ? 'Valid' : 'Invalid'}
            </Typography>
            {validationResult1.errors && (
              <ul>
                {validationResult1.errors.map((error, idx) => (
                  <li key={idx} style={{ color: 'red' }}>{error}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </Grid>

      <Grid item xs={6}>
      <Typography variant="h6">{file2 ? file2.name : "File 2"}</Typography>
      <FileUploadComponent onFileAccepted={(file) => handleFileUpload(file, setFile2, setParsedData2, setValidationResult2)} />
        {file2 && !parsedData2 && <CircularProgress style={{ marginTop: '10px' }} />}
        {file2 && file2.name.endsWith('.csv') && (
          <CSVParserComponent file={file2} onParsed={(data) => handleParsedData(data, setParsedData2, setValidationResult2)} />
        )}
        {file2 && file2.name.endsWith('.xlsx') && (
          <ExcelParserComponent file={file2} onParsed={(data) => handleParsedData(data, setParsedData2, setValidationResult2)} />
        )}
        {validationResult2 && (
          <div style={{ marginTop: '10px' }}>
            <Typography>
              Validation: {validationResult2.isValid ? 'Valid' : 'Invalid'}
            </Typography>
            {validationResult2.errors && (
              <ul>
                {validationResult2.errors.map((error, idx) => (
                  <li key={idx} style={{ color: 'red' }}>{error}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </Grid>

      {/* Comparison Results */}
      {comparisonResult && (
        <Grid item xs={12}>
          <Typography variant="h6">Comparison Results</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Index</TableCell>
                  <TableCell>Field</TableCell>
                  <TableCell>File 1 Value</TableCell>
                  <TableCell>File 2 Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {comparisonResult.map(({ index, diffFields, onlyInFile1, onlyInFile2 }, i) => {
                  if (diffFields) {
                    return Object.entries(diffFields).map(([field, { file1, file2 }], j) => (
                      <TableRow key={`${i}-${j}`}>
                        <TableCell>{index}</TableCell>
                        <TableCell>{field}</TableCell>
                        <TableCell style={{ backgroundColor: '#ffebee' }}>{file1}</TableCell>
                        <TableCell style={{ backgroundColor: '#ffebee' }}>{file2}</TableCell>
                      </TableRow>
                    ));
                  } else if (onlyInFile1) {
                    return (
                      <TableRow key={i}>
                        <TableCell>{index}</TableCell>
                        <TableCell colSpan={3} style={{ color: 'green' }}>
                          Only in File 1: {JSON.stringify(onlyInFile1)}
                        </TableCell>
                      </TableRow>
                    );
                  } else if (onlyInFile2) {
                    return (
                      <TableRow key={i}>
                        <TableCell>{index}</TableCell>
                        <TableCell colSpan={3} style={{ color: 'green' }}>
                          Only in File 2: {JSON.stringify(onlyInFile2)}
                        </TableCell>
                      </TableRow>
                    );
                  }
                  return null;
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
    </Grid>
  );
};

export default App;