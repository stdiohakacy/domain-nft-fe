import React, { useState } from "react"
import { Box, Stack, Typography, FormControl, OutlinedInput, InputAdornment } from "@mui/material"
import ButtonApp from "components/custom/ButtonApp"
import { ResultItem } from "./ResultItem"
import { characterMin, defaultAddress } from "const"
import SearchIcon from "icons/search"
import {
  useAccount,
  useContractRead
} from 'wagmi'
import { configContractWithABI } from "config/contracts"

const HomeView = () => {

  const { isConnected } = useAccount()
  const [value, setValue] = useState("")

  const handleChange = (event) => setValue(event.target.value.trim())

  const { data } = useContractRead({
    ...configContractWithABI.ethWDomain,
    functionName: 'getMappingAddressByDomain',
    args: value?.length >= characterMin ? `${value}.ethw` : "000",
  })

  return (
    <div>
      <Typography variant="h1" sx={{
        fontWeight: 700,
        fontSize: "68px",
        lineHeight: "81px",
        textAlign: "center",
        marginBottom: "50px",
      }}><Box color="#1070F4" display="inline-block">ETHW</Box> NAME SERVICE</Typography>

      {isConnected && (
        <Box width={"100%"} maxWidth={708} mx="auto">
          {/* search box */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <FormControl sx={{width: "calc(100% - 132px)"}} variant="outlined">
              <OutlinedInput
                id="outlined-adornment-search"
                value={value}
                onChange={handleChange}
                endAdornment={<InputAdornment position="end"><Typography component="span" sx={{color: "#0044D2", fontWeight: 600, fontSize: "15px"}}>.ethw</Typography></InputAdornment>}
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
                  background: "#ECECEC",
                  borderRadius: "15px",
                  "& .MuiInputBase-input": {
                    padding: "10px 0"
                  },
                  "& fieldset": { border: 'none' },
                }}
                fullWidth
                placeholder="Search"
              />
            </FormControl>
            <Box width="132px">
              <ButtonApp fullWidth>
              Search
              </ButtonApp>
            </Box>
          </Stack>

          {/* result box */}
          <Box mt={2} minHeight={36}>
          {(data && value?.length >= characterMin) && (
            <>
              {data === defaultAddress ? (
                <ResultItem title={value} available={true} />
              ) : (
                <ResultItem title={value} address={data} />
              )}
            </>
          )}
          </Box>
        </Box>
      )}
      
    </div>
  )
}

export default HomeView