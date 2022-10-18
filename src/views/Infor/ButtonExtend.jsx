import { useEffect, useState } from "react"
import { Button } from "@mui/material"
// import { getExtendPriceDefault } from "hooks"
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi'
import { configContractWithABI } from "config/contracts"

export const ButtonExtend = (props) => {
  const {domainName, mappingAddress} = props

  // const priceDefault = getExtendPriceDefault()
  const dataPrices = useContractRead({
    ...configContractWithABI.ethWDomain,
    functionName: 'extendPrice',
  })

  // approve in usdt
  const usePrepareContractApprove = usePrepareContractWrite({
    ...configContractWithABI.usdtAddress,
    functionName: 'approve',
    args: [mappingAddress, dataPrices.data]
  })
  const approveUsdtContract = useContractWrite(usePrepareContractApprove.config)

  // extend in ethWDomain
  const usePrepareContractExtend = usePrepareContractWrite({
    ...configContractWithABI.ethWDomain,
    functionName: 'extend',
    args: [domainName, 1]
  })
  const { status, data, isLoading, isSuccess, write, reset } = useContractWrite(usePrepareContractExtend.config)

  const handleExtendDomain = () => approveUsdtContract.write?.()

  useEffect(() => {
    if(approveUsdtContract?.isSuccess) write?.()
  }, [])

  return (
    <Button onClick={handleExtendDomain} sx={{
      width: "134px",
      background: "#236FE0",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      borderRadius: "15px",
      color: "#ffffff",
      ":hover": {
        background: "#236FE0",
      }
    }}>{(false) ? "Pending..." : "Extend"}</Button>
  )
}