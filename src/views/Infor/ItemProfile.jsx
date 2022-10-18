import * as React from "react"
import { Box, Typography } from "@mui/material"

export const ItemProfile = (props) => {
  const { domainName, expiredTime } = props
  return (
    <Box p={2} sx={{
      cursor: "pointer",
      "&:hover": {
        background: "linear-gradient(180deg, #236FE0 0%, #0096E1 100%)",
        borderRadius: "20px",
      }
    }}>
      <Typography variant="h4" sx={{
        fontWeight: 600,
        fontSize: "19px",
        lineHeight: "21px",
        color: "#6DD5ED"
      }}>{domainName}</Typography>
      <Typography>expires {new Date(parseInt(expiredTime, 10) * 1000).toLocaleDateString('en-CA')}</Typography>
    </Box>
  )
}