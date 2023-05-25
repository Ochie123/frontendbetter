import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

const FilesDropzone = ({ onFilesChange }) => {
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const formattedFiles = acceptedFiles.map((file) => {
        return new File([file], file.name, { type: file.type });
      });
  
      if (onFilesChange) {
        onFilesChange(formattedFiles);
      }
    },
    [onFilesChange]
  );
  

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop: handleDrop,
    accept: 'image/*',
    multiple: true,
  });

  const handleRemoveFile = (index) => {
    if (onFilesChange) {
      const updatedFiles = [...acceptedFiles];
      updatedFiles.splice(index, 1);
      onFilesChange(updatedFiles);
    }
  };

  return (
    <Box {...getRootProps()} p={2} border={1} borderColor="grey.400" borderRadius={4}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Typography variant="body1">Drop the files here...</Typography>
      ) : (
        <Typography variant="body1">Drag and drop files here or click to browse</Typography>
      )}
      {acceptedFiles.length > 0 && (
        <Box mt={2}>
          <List>
            {acceptedFiles.map((file, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar variant="rounded" src={URL.createObjectURL(file)} />
                </ListItemAvatar>
                <ListItemText primary={file.name} secondary={`${(file.size / 1024).toFixed(2)} KB`} />
                <IconButton onClick={() => handleRemoveFile(index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default FilesDropzone;
