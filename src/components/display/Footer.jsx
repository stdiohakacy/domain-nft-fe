import { Stack, Box } from "@mui/material"

const Footer = () => {
  return (
    <footer>
      <Stack direction="row" justifyContent="space-between" alignItems="center" py={2}>
        <Box>
          <a className="link" href="/">About Us</a>
        </Box>
        <Stack direction="row" spacing={1}>
          <a href="https://medium.com/" target="_blank" rel="noreferrer">
            <img src="./assets/icons/medium.png" alt="medium" />
          </a>
          <a href="https://telegram.com/" target="_blank" rel="noreferrer">
            <img src="./assets/icons/telegram.png" alt="telegram"/>
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noreferrer">
            <img src="./assets/icons/twitter.png" alt="twitter"/>
          </a>
        </Stack>
      </Stack>
    </footer>
  )
}

export default Footer