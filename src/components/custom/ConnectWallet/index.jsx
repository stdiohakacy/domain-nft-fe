/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react"
import ButtonApp from "components/custom/ButtonApp"
import { Stack, Button, Box, Divider, Typography, Avatar, IconButton, Menu, MenuItem } from "@mui/material"
import {
  useAccount,
  useDisconnect,
  useEnsAvatar,
} from 'wagmi'
import ModalConnectWallet from "components/display/ModalConnectWallet"
import { truncateAddress } from "utils"
import { useNavigate, Link } from "react-router-dom"

const ConnectWallet = () => {

  let navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const [anchorEl, setAnchorEl] = React.useState(null)
  const openMenu = Boolean(anchorEl)
  const handleClickMenu = (event) => setAnchorEl(event.currentTarget)
  const handleCloseMenu = () => setAnchorEl(null)

  const { address, isConnected } = useAccount()
  const { data: ensAvatar } = useEnsAvatar({ addressOrName: address })
  const { disconnect } = useDisconnect()

  const handleDisconnect = () => {
    disconnect()
    navigate("/")
  }

  if (isConnected) {
    return (
      <div>
        <IconButton
          onClick={handleClickMenu}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={openMenu ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? 'true' : undefined}
        >
          <Avatar src={ensAvatar ? ensAvatar : "/assets/images/profile.png"} sx={{ width: 70, height: 70 }} />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleCloseMenu}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          PaperProps={{
            sx: {
              background: "linear-gradient(180deg, #0B293D 0%, #15193A 100%)",
              borderRadius: "10px",
              color: "#ffffff",
            }
          }}
        >
          <MenuItem onClick={handleCloseMenu}>
            <Stack width={"100%"} direction="row" alignItems="center">
              <Avatar src="/assets/images/profile.png" sx={{ width: 32, height: 32 }} />
              <Typography component="span" ml={2}>{truncateAddress(address)}</Typography>
            </Stack>
          </MenuItem>
          <Divider variant="middle" sx={{ background: "#6DD5ED" }} />
          <MenuItem onClick={handleCloseMenu} sx={{p:0, m:1, borderRadius: "10px"}}>
            <Link to="/my-profile">
              <Button sx={{ color: "#0044D2", background: "#ffffff", borderRadius: "10px", "&:hover": {background: "#ffffff"} }} fullWidth>Account Management</Button>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleCloseMenu}>
            <Button onClick={handleDisconnect} sx={{ color: "#ffffff" }} fullWidth>Disconnect</Button>
          </MenuItem>
        </Menu>
      </div>
    )
  }

  return (
    <Box>
      <ButtonApp onClick={handleOpen}>Connect Wallet</ButtonApp>
      <ModalConnectWallet isOpen={isOpen} closeModal={handleClose} />
    </Box>
  )
}

export default ConnectWallet