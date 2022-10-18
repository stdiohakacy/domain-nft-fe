import * as React from "react"
import { Stack, Box } from "@mui/material"
import styled from "@emotion/styled"

export const Progress = (props) => {
  const { percent } = props
  return (
    <>
      <ProgressStyle percentprogress={`${percent}%`} />
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <BoxTitle>Request</BoxTitle>
        <BoxTitle>Confirm</BoxTitle>
        <BoxTitle>Complete</BoxTitle>
      </Stack>
    </>
  )
}

const BoxTitle = styled(Box)`
  width: 33.33%;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: #236FE0;
  text-align: center;
  padding-top: 20px;
  margin-top: 5px;
  position: relative;
  &:before {
    content: "";
    height: 18px;
    width: 2px;
    background-color: #3ED59F;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`

const ProgressStyle = styled(Box)`
  width: 100%;
  height: 14px;
  background: #0044D2;
  border-radius: 20px;
  margin-top: 22px;
  position: relative;
  &:before {
    content: "";
    height: 14px;
    width: ${props => props.percentprogress || "0"};
    background-color: #3ED59F;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 20px;
  }
`