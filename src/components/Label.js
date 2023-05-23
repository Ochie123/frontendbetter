import React from "react"
import clsx from "clsx"
import { Fade, createStyles } from "@mui/material"

const Label = ({
  className = "",
  color = "secondary",
  children,
  style,
  ...rest
}) => {

  return (
    <span
      className={clsx(
       "",
        {
         
        },
        className
      )}
      {...rest}
    >
      {children}
    </span>
  )
}


export default Label
