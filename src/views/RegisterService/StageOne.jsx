import React, { useState, useEffect } from "react"
import { Box, Stack, Typography, Button } from "@mui/material"
import { ButtonGreen } from "./ButtonGreen"
import PlusIcon from "icons/plus"
import MinusIcon from "icons/minus"
import { useParams } from "react-router-dom"
import { characterMin, characterMax, defaultAmountFollowCharacter } from "const"
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { configContractWithABI } from "config/contracts"
import { addresses } from "const/contracts"

import styled from "styled-components"
import { BigNumber, utils } from 'ethers';
import useShowError from "hooks/useShowError"

export const StageOne = (props) => {

  const { domain } = useParams()
  const { showError } = useShowError();
  const { registration, handleIncreaseRegistrationYear, handleDecreaseRegistrationYear, handleClickRequest } = props

  // get prices
  const dataPrices = useContractRead({
    ...configContractWithABI.ethWDomain,
    functionName: 'prices',
    args: domain.length,
  });
  const dataDefaultPrices = useContractRead({
    ...configContractWithABI.ethWDomain,
    functionName: 'defaultPrice',
  })

  const yearBigNumber = BigNumber.from(registration.year);
  // approve in usdt
  const { config,
    error: prepareError,
    isError: isPrepareError, } = usePrepareContractWrite({
    ...configContractWithABI.usdtAddress,
    functionName: 'approve',
    args: [addresses.ethWDomain[process.env.REACT_APP_PUBLIC_CHAIN_ID], domain.length < characterMax ? dataPrices.data?.mul(yearBigNumber) : dataDefaultPrices.data?.mul(yearBigNumber)],
  })
  const { data , isLoading, error, writeAsync } = useContractWrite(config)

  const { isLoading: isLoadingTransaction } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess() {
      handleClickRequest()
    }
  })

  useEffect(()=>{
    if(prepareError || error) {
      showError("Failed to approve");
    }
  },[prepareError ,error]);

  const calcFee = () => {
    if (domain?.length < characterMin) return 0
    const priceBigNumber = domain.length < characterMax ? dataPrices.data?.mul(yearBigNumber).toString() : dataDefaultPrices.data?.mul(yearBigNumber).toString();
    return utils.formatEther(priceBigNumber || 0);
  }

  const handleClick = async () => {
    try {
      await writeAsync?.()
    } catch (err) {
    }
  }


  return (
    <Stack mt={4} direction={{xs: "column", lg: "row"}} justifyContent="space-between" spacing={3}>
      <Box p={2} sx={{
        background: "linear-gradient(180deg, #236FE0 0%, #051B6C 100%)",
        borderRadius: "10px",
        padding: "15px",
        color: "#ffffff",
        textAlign: "center",
        width: {
          xs: "inherit", lg: "100%"
        },
        minHeight: 366,
      }}>
        <Typography fontSize={"43px"} fontWeight={600}>Stage 1: Request</Typography>
        <Box sx={{
          background: "#FBFBFC",
          borderRadius: "10px",
          padding: "20px 10px 10px",
          color: "#0A0A0B",
        }}>
          <Stack direction={{
            xs: "column", md: "row"
          }} justifyContent="space-between">
            <Stack alignItems="center">
              <BoxBlue sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <Button onClick={handleDecreaseRegistrationYear} sx={{
                  minWidth: "33px",
                  width: "33px",
                  height: "30px",
                  background: "rgba(97, 117, 122, 0.49)",
                  borderRadius: "5px",
                  "&:hover": {
                    background: "rgba(97, 117, 122, 0.49)",
                  }
                }}><MinusIcon /></Button>
                <Box width={80}>{registration.year}</Box>
                <Button onClick={handleIncreaseRegistrationYear} sx={{
                  minWidth: "33px",
                  width: "33px",
                  height: "30px",
                  background: "#3ED58A",
                  borderRadius: "5px",
                  "&:hover": {
                    background: "#3ED58A",
                  }
                }}><PlusIcon /></Button>
              </BoxBlue>
              <Typography components="span" sx={{textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", fontSize: "15px", color: "#0A0A0B", margin: "12px auto"}}>Registration Year</Typography>
              <span>*Estimated with 0.01 ETHW gas fee.</span>
            </Stack>
            <Stack mt={{xs: 2, md: 0}} alignItems={{
              xs: "center", md: "inherit"
            }}>
              <BoxBlue>{calcFee()} ETHW</BoxBlue>
              <Typography components="span" sx={{textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", fontSize: "15px", color: "#0A0A0B", margin: "12px auto"}}>Registration Fee</Typography>
            </Stack>
            <Box sx={{width: "3px", background: "#2193B0"}}></Box>
            <Stack minWidth={170} spacing={2} alignItems="center">
              <Box>Estimated</Box>
              <Box sx={{color: "#0044D3", fontWeight: 600, fontSize: "25px"}}>0.1 ETHW</Box>
              <Box>USD $10</Box>
            </Stack>
          </Stack>
        </Box>
        <Box maxWidth={700} my={2} mx={"auto"}>In this step, you may request for registration and perform the first of the two transactions. Upon requesting, the system will undergo a process to ensure other users are not trying to register for the same domain and protect you after request. This may take up to 30 seconds.</Box>
        <Box pt={2} mb={2}>
          <ButtonGreen onClick={handleClick} disabled={isLoading || isLoadingTransaction}>{isLoading || isLoadingTransaction ? "Requesting..." : "Request"}</ButtonGreen>
        </Box>
      </Box>
      <Box sx={{
        background: "linear-gradient(180deg, #0044D2 0%, #0A0A0B 100%)",
        borderRadius: "10px",
        fontSize: "30px",
        lineHeight: "36px",
        color: "#DBDDE8",
        width: {
          xs: "inherit",
          lg: "202px",
        },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        textAlign: "center"
      }}>Step 2: Complete Registration</Box>
    </Stack>
  )
}

const BoxBlue = styled(Box)`
  background: #0044D3;
  border-radius: 5px;
  color: #ffffff;
  padding: 8px;
  font-weight: 600;
  font-size: 25px;
  line-height: 30px;
  width: 190px;
`