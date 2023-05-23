import React, { useState, useCallback } from "react"
import clsx from "clsx"
import Dropzone, { useDropzone } from "react-dropzone"
import PerfectScrollbar from "react-perfect-scrollbar"
import {FileCopy} from "@mui/icons-material"
import {More} from "@mui/icons-material"
import {
  Box,
  Button,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,

} from "@mui/material"

import './Files-Dropzone.css'

import bytesToSize from '../../src/utils/Bytes-To-Size'

const FilesDropzone = ({ className, ...rest }) => {

  const [files, setFiles] = useState([])
  const handleDrop = useCallback(acceptedFiles => {
    setFiles(prevFiles => [...prevFiles].concat(acceptedFiles))
  }, [])

  const handleRemoveAll = () => {
    setFiles([])
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop
  })

  return (
    <div className={clsx("", className)} {...rest}>
      <div
        className={clsx({
       
        })}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div>
          <img
            alt="Select file"
            className="image"
            src="/images/products/add_file.svg"
          />
        </div>
        <div>
          <Typography gutterBottom variant="h5">
            Select files
          </Typography>
          <Box mt={2}>
            <Typography color="textPrimary" variant="body1">
              Drop files here or click <Link underline="always">browse</Link>{" "}
              thorough your machine
            </Typography>
          </Box>
        </div>
      </div>
      {files.length > 0 && (
        <>
          <PerfectScrollbar options={{ suppressScrollX: true }}>
            <List className="list">
              {files.map((file, i) => (
                <ListItem divider={i < files.length - 1} key={i}>
                  <ListItemIcon>
                    <FileCopy />
                  </ListItemIcon>
                  <ListItemText
                    primary={file.name}
                    primaryTypographyProps={{ variant: "h5" }}
                    secondary={bytesToSize(file.size)}
                  />
                  <Tooltip title="More options">
                    <IconButton edge="end">
                      <More />
                    </IconButton>
                  </Tooltip>
                </ListItem>
              ))}
            </List>
          </PerfectScrollbar>
          <div className="">
            <Button onClick={handleRemoveAll} size="small">
              Remove all
            </Button>
            <Button color="secondary" size="small" variant="contained">
              Upload files
            </Button>
          </div>
        </>
      )}
    </div>
  )
}


export default FilesDropzone
