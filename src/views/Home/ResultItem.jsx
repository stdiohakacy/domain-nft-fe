import * as React from "react"
import { Link } from "react-router-dom"
import { Box, Stack, Typography, Button } from "@mui/material"
import styled from "@emotion/styled"

export const ResultItem = (props) => {
  return (
    <Box sx={{
      background: "linear-gradient(90deg, #0044D3 0%, #2193B0 100%)",
      borderRadius: "15px",
      padding: "3px 11px",
      color: "#ffffff",
    }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center" spacing={2}>
          <img src={props?.available ? "/assets/images/service-available.png" : "/assets/images/service-lost.png"} alt="available" />
          <Typography component="span" fontSize={"12px"} fontWeight={600}>{props.title}.ethw</Typography>
        </Stack>
        {props?.available ? (
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography component="span" fontSize={"12px"} fontWeight={600}>Available</Typography>
            <Link to={`/register-service/${props.title}`}><ButtonAvailable>Register</ButtonAvailable></Link>
          </Stack>
        ) : (
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography component="span" fontSize={"12px"} fontWeight={600}>Sorry - Unavailable</Typography>
            <ButtonView><a href={`${process.env.REACT_APP_PUBLIC_BSCAN}/address/${props?.address}`} target="_blank">View</a></ButtonView>
          </Stack>
        )}
      </Stack>
    </Box>
  )
}

const ButtonView = styled(Button)`
  background: #DA3737;
  border-radius: 5px;
  color: #ffffff;
  height: 23px;
  text-transform: inherit;
  width: 75px;
  font-size: 12px;
  &:hover {
    background: #DA3737;
  }
  a {
    color: #ffffff;
  }
`

const ButtonAvailable = styled(Button)`
  background: #236FE0;
  border-radius: 5px;
  color: #ffffff;
  height: 23px;
  text-transform: inherit;
  width: 75px;
  font-size: 12px;
  &:hover {
    background: #236FE0;
  }
`