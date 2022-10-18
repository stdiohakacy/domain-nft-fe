import React, { useState, useEffect } from "react"
import { Container, Grid, Box, Stack, Typography, FormControl, OutlinedInput, InputAdornment, Button, List, ListItem, Menu, MenuItem } from "@mui/material"
import SearchIcon from "icons/search"
import { ItemProfile } from "./ItemProfile"
import CopyIcon from "icons/copy"
import {
  useAccount,
} from 'wagmi'
import { getOwnedTokenIds, getTokenInfos } from "hooks"
import { truncateAddress, truncateAddress2 } from "utils"
import { ButtonExtend } from "./ButtonExtend"
import BasicModal from "components/custom/Modal"
import ListIcon from "icons/list"
import ArrowDownIcon from 'icons/arrow-down'
import ArrowUpIcon from 'icons/arrow-up'
import AZIcon from "icons/az"
import ZAIcon from "icons/za"
import ClockIcon from "icons/clock"
import styled from "@emotion/styled"

const options = [
  <ListIcon />,
  <><ArrowDownIcon /><AZIcon /></>,
  <><ArrowUpIcon /><ZAIcon /></>,
  <><ArrowDownIcon /><ClockIcon sx={{color: "#ffffff", with: 20, height: 20}} /></>,
  <><ArrowUpIcon /><ClockIcon sx={{color: "#ffffff", with: 20, height: 20}} /></>,
];

const InforView = () => {

  const { address } = useAccount()
  const [searchVal, setSearchVal] = useState("")
  const [listData, setListData] = useState([])
  const [listDataSearch, setListDataSearch] = useState([])
  const [itemActive, setItemActive] = useState()

  // filter menu
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const open = Boolean(anchorEl)
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index)
    setAnchorEl(null)
  }
  const handleClose = () => {
    setAnchorEl(null);
  }


  // modal transfer
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const handleOpenModalEdit = () => {
    if(!itemActive?.tokenId) return
    setOpenModalEdit(true)
  }
  const handleCloseModalEdit = () => setOpenModalEdit(false)

  const handleChangeSearch = (e) => setSearchVal(e.target.value.trim())
  const handleClickItem = (entry) => setItemActive(entry)

  useEffect(() => {
    getOwnedTokenIds(address).then(res => {
      getTokenInfos(res).then((response) => {
        setListData(response)
        setListDataSearch(response)
        setItemActive(response[0])
      })
    })
  }, [])

  useEffect(() => {
    switch (selectedIndex) {
      case 1:
        setListData((prev) => [...prev.sort((a, b) => {
          const nameA = a.domainName.toUpperCase()
          const nameB = b.domainName.toUpperCase()
          if (nameA < nameB) return -1
          if (nameA > nameB) return 1
          return 0
        })])
        return;
      case 2:
        setListData((prev) => [...prev.sort((a, b) => {
          const nameA = a.domainName.toUpperCase()
          const nameB = b.domainName.toUpperCase()
          if (nameA < nameB) return 1
          if (nameA > nameB) return -1
          return 0
        })])
        return;
      case 3:
        setListData((prev) => [...prev.sort((firstItem, secondItem) => firstItem.expiredTime - secondItem.expiredTime)])
        return;
      case 4:
        setListData((prev) => [...prev.sort((firstItem, secondItem) => secondItem.expiredTime - firstItem.expiredTime)])
        return;
      default:
        return
    }

  }, [selectedIndex])

  return (
    <Container maxWidth="xl">
    <Grid container spacing={3}>
      <Grid item xs={12} lg={4}>
        <BoxLeft>
          <Stack p={2} direction={"row"} sx={{
            background: "linear-gradient(180deg, #236FE0 0%, #0096E1 100%)",
            borderRadius: "10px"
          }}>
            <Box mr={3}>
              <img src="/assets/images/profile.png" alt="profile" />
            </Box>
            <Box>
              <Typography variant="h5" sx={{fontWeight: 700}}>{itemActive ? truncateAddress(itemActive?.owner) : truncateAddress(address)}</Typography>
                <Typography fontSize={12}>Primary SNS Name:</Typography>
              <Typography fontSize={12} color="#3ED59F">
                {itemActive ? itemActive?.domainName : "-----"}
              </Typography>
            </Box>
          </Stack>
          <Box py={3} display="flex" alignItems="center">
            <FormControl sx={{ width: "calc(100% - 30px)", paddingRight: "15px"}}>
              <OutlinedInput
                id="outlined-adornment-search"
                value={searchVal}
                onChange={handleChangeSearch}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
                aria-describedby="outlined-search-helper-text"
                inputProps={{
                  'aria-label': 'search',
                }}
                sx={{
                  background: "transparent",
                  borderRadius: "15px",
                  border: "1px solid #236FE0",
                  color: "#ffffff",
                  "& .MuiInputBase-input": {
                    padding: "3px 10px"
                  },
                  "& fieldset": { border: 'none' },
                }}
                fullWidth
                placeholder="Search"
              />
            </FormControl>
            <div>
            <List
              component="div"
              aria-label="Device settings"
              sx={{
                width: 30,
                height: 30,
                padding: 0,
              }}
            >
              <ListItem
                button
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClickListItem}
                sx={{
                  width: 30,
                  height: 30,
                  padding: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                {options[selectedIndex]}
              </ListItem>
            </List>
            <Menu
              id="lock-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'lock-button',
                role: 'listbox',
              }}
            >
              {options.map((option, index) => (
                <MenuItem
                  key={index}
                  selected={index === selectedIndex}
                  onClick={(event) => handleMenuItemClick(event, index)}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "10px",
                    margin: "0 10px",
                    "&:not(:last-child)": {
                      borderBottom: "1px solid rgba(179, 179, 179, 0.6)",
                    }
                  }}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
          </Box>
          <Box sx={{
            maxHeight: 308,
            overflowY: "auto"
          }}>
            {searchVal ? (
              <>
                {listDataSearch.length !== 0 && listDataSearch.map((entry) => {
                  if (entry.domainName.indexOf(searchVal) !== -1)
                    return (
                      <Box key={entry?.tokenId} onClick={() => handleClickItem(entry)} sx={{
                        background: itemActive?.tokenId === entry?.tokenId ? "linear-gradient(180deg, #236FE0 0%, #0096E1 100%)" : "inherit",
                        borderRadius: itemActive?.tokenId === entry?.tokenId ? "20px": "0",
                      }}>
                        <ItemProfile {...entry} />
                      </Box>
                    )
                })}
              </>
            ) : (
              <>
                {listData.length !== 0 && listData.map((entry) => (
                  <Box key={entry?.tokenId} onClick={() => handleClickItem(entry)} sx={{
                    background: itemActive?.tokenId === entry?.tokenId ? "linear-gradient(180deg, #236FE0 0%, #0096E1 100%)" : "inherit",
                    borderRadius: itemActive?.tokenId === entry?.tokenId ? "20px": "0",
                  }}>
                    <ItemProfile {...entry} />
                  </Box>
                ))}
              </>
            )}
          </Box>
        </BoxLeft>
      </Grid>
      <Grid item xs={12} lg={8}>
        <BoxRight>
          <Stack direction={"row"} spacing={4} mb={2}>
            <Box>
              <img src="/assets/images/profile-image-large.png" alt="profile" />
            </Box>
            <Box width={"100%"}>
              <Box width={"100%"}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <div>
                    <Typography variant="h5" sx={{fontWeight: 700, fontSize: "25px", lineHeight: "21px", marginBottom: "10px"}}>Registrant</Typography>
                    <Typography>{itemActive ? truncateAddress2(itemActive?.owner) : "-----"}</Typography>
                  </div>
                  <Button sx={{
                    minWidth: 30,
                    width: 30,
                    height: 30,
                    padding: 0,
                  }} onClick={() => navigator.clipboard.writeText(itemActive?.mappingAddress)}><CopyIcon/></Button>
                </Stack>
                <Box mt={3} mb={4}>
                  <Button sx={{
                    width: "134px",
                    background: "#236FE0",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: "15px",
                    color: "#ffffff",
                    ":hover": {
                      background: "#236FE0",
                    }
                  }}>Transfer</Button>
                </Box>
              </Box>
              <Box>
                <Typography variant="h5" sx={{fontWeight: 700, fontSize: "25px", lineHeight: "21px", marginBottom: "10px"}}>Expiry Date</Typography>
                <Typography>{itemActive?.expiredTime ? `Expires ${new Date(parseInt(itemActive?.expiredTime, 10) * 1000).toLocaleDateString('en-CA')}` : "-----"}</Typography>
                <Box mt={3} mb={4}>
                  {itemActive?.domainName && (<ButtonExtend {...itemActive} />)}
                </Box>
              </Box>
            </Box>
          </Stack>
          <Stack direction={{xs:"column", md: "row"}} justifyContent="space-between" alignItems="center" p={2} spacing={2} sx={{
            background: "linear-gradient(180deg, #236FE0 0%, #0096E1 100%)",
            borderRadius: "10px"
          }}>
            <div>
              <Typography mb={1} variant="h4" sx={{fontWeight: 600, fontSize: "22px"}}>Records</Typography>
              <Typography mb={1}>ETHW Address</Typography>
              <Typography mb={1}>{itemActive ? truncateAddress2(itemActive?.mappingAddress) : "------"}</Typography>
            </div>
            <div>
              <Button sx={{
                width: "134px",
                background: "#0044D2",
                borderRadius: "15px",
                color: "#ffffff",
                ":hover": {
                  background: "#0044D2",
                }
              }}
              onClick={handleOpenModalEdit}
              >Edit</Button>
            </div>
          </Stack>
        </BoxRight>
      </Grid>
    </Grid>
    {openModalEdit && (<BasicModal open={openModalEdit} handleClose={handleCloseModalEdit} tokenId={itemActive?.tokenId}/>)}
    </Container>
  )
}

const BoxLeft = styled(Box)`
  background: linear-gradient(180deg, #0A0A0B 0%, #236FE0 100%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.6);
  border-radius: 8px;
  max-height: 100%;
  height: 512px;
  color: #FFFFFF;
  padding: 15px 12px;
`

const BoxRight = styled(Box)`
  background: #0044D2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  max-height: 100%;
  height: 512px;
  color: #FFFFFF;
  padding: 30px 24px 0;
`

export default InforView