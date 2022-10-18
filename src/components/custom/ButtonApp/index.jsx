import { Button } from "@mui/material"

const ButtonApp = (props) => {
  return (
    <Button
      sx={{
        fontWeight: 700,
        fontSize: "17px",
        lineHeight: "20px",
        textTransform: "inherit",
        padding: "10px 20px",
        color: "#FFFFFF",
        borderRadius: "15px",
        background: "linear-gradient(90deg, #0044D3 0%, #03196B 100%)",
      }}
      {...props}
    >{props.children}</Button>
  )
}

export default ButtonApp