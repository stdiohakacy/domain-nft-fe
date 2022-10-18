import { addresses } from "const/contracts"
import ethWDomainABI from "config/abi/ethWDomain.json"
import usdtAddressABI from "config/abi/usdtAddress.json"

export const configContractWithABI = {
  ethWDomain: {
    addressOrName: addresses.ethWDomain[97],
    contractInterface: ethWDomainABI,
  },
  usdtAddress: {
    addressOrName: addresses.usdt[97],
    contractInterface: usdtAddressABI,
  },
}