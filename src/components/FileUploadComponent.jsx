import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUploadComponent = ({ onFileAccepted }) => {
  const onDrop = useCallback((acceptedFiles) => {
    // Pass the first file to the parent component
    if (acceptedFiles.length > 0) {
      onFileAccepted(acceptedFiles[0]);
    }
  }, [onFileAccepted]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false, // Restrict to one file per upload area
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: '2px dashed #cccccc',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
      }}
    >
      <input {...getInputProps()} />
      <p>Drag 'n' drop a file here, or click to select a file</p>
    </div>
  );
};

export default FileUploadComponent;