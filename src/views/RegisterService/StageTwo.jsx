/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { Box, Stack, Typography } from "@mui/material"
import { ButtonGreen } from "./ButtonGreen"
import { useParams, Link } from "react-router-dom"
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from 'wagmi'
import { configContractWithABI } from "config/contracts"
import { BigNumber } from 'ethers';
import useShowError from "hooks/useShowError";

export const StageTwo = (props) => {

  const { handleRegisterSuccess, registration } = props
  const { domain } = useParams()
  const { showError } = useShowError();
  // create in ethWDomain
  const { config, error: prepareError } = usePrepareContractWrite({
    ...configContractWithABI.ethWDomain,
    functionName: 'create',
    args: [domain, BigNumber.from(registration.year)],
  })
  const { data, error, isSuccess, isLoading, writeAsync } = useContractWrite(config)

  const { isLoading: isLoadingTransaction } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess() {
      handleRegisterSuccess();
    }
  })

  const handleRegister = async () => {
    try {
      const ethWDomainNFT = await writeAsync?.();
      await ethWDomainNFT?.wait();
      if (error) {
        return;
      }
    } catch (error) {
      console.log("🚀 ~ file: StageTwo.jsx ~ line 37 ~ handleRegister ~ error", error)
    }
  }

  useEffect(()=>{
    if(prepareError || error) {
      showError("Failed to register domain");
    }
  },[prepareError ,error]);

  return (
    <Stack mt={4} direction={{xs: "column", lg: "row"}} justifyContent="space-between" spacing={3}>
      <Box sx={{
        background: "linear-gradient(180deg, #0044D2 0%, #0A0A0B 100%)",
        borderRadius: "10px",
        fontSize: "22px",
        lineHeight: "26px",
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
      }}><div>Step 1: Request Estimated Total <Box sx={{fontSize: "30px", lineHeight: "45px",}}>0.1 ETHW</Box> USD 10</div></Box>
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
        <Typography fontSize={"43px"} fontWeight={600}>Stage 2: Confirm</Typography>
        <Box maxWidth={700} my={2} mx={"auto"}>Confirm the registration, perform payment and complete the registration. Please note that if the second transaction is not processed within 7 days after the first, the registration will be forfeited and has to be restarted from the first step.</Box>
        <Box pt={5}>
          <img src="/assets/images/register.png" alt="register" />
        </Box>
        <Box pt={2} mb={2}>
          <Box sx={{color: "#53BDFF", fontSize: "16px", height: "18px"}} mb={2}>{isLoading || isLoadingTransaction ? "Pending..." : isSuccess ? "Registration completed!" : ""}</Box>
          {!isSuccess && <ButtonGreen disabled={isLoading || isLoadingTransaction} onClick={handleRegister}>Register</ButtonGreen>}
          {isSuccess && <Link to="/my-profile"><ButtonGreen>Manage Profile</ButtonGreen></Link>}
        </Box>
      </Box>
    </Stack>
  )
}