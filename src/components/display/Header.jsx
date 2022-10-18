import { Stack, Box } from "@mui/material"
import ConnectWallet from "components/custom/ConnectWallet"

const Header = () => {
  return (
    <header>
      <Stack direction="row" justifyContent="space-between" alignItems="center" py={2}>
        <Box>
          <a href="/">
            <img src="/assets/images/logo.png" alt="logo" />
          </a>
        </Box>
        <ConnectWallet />
      </Stack>
    </header>
  )
}

export default Header