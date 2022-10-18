import { Button } from "@mui/material"
import styled from "@emotion/styled"

export const ButtonGreen = (props) => {
  return (
    <ButtonStyle {...props}>
      {props.children}
    </ButtonStyle>
  )
}

const ButtonStyle = styled(Button)`
  background: #3ED59F;
  border-radius: 5px;
  color: #ffffff;
  height: 32px;
  text-transform: inherit;
  width: 150px;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  &:hover {
    background: #3ED59F;
  }
`