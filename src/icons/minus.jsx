import * as React from "react"
import { SvgIcon } from "@mui/material"

export default function MinusIcon(props) {
  return (
    <SvgIcon width="19" height="19" viewBox="0 0 19 19" {...props}>
      <circle cx="9.5" cy="9.5" r="9" stroke="white"/>
      <rect x="4.56006" y="8.74" width="9.88" height="1.52" rx="0.76" fill="white"/>
    </SvgIcon>
  )
}