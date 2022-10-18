import Web3EthContract from "web3-eth-contract";
import { configContractWithABI } from "config/contracts";
import { addresses } from "const/contracts";

export async function getOwnedTokenIds(userAddress) {
  Web3EthContract.setProvider(process.env.REACT_APP_PUBLIC_NODE);
  const domainNftContract = new Web3EthContract(
    configContractWithABI.ethWDomain.contractInterface,
    addresses.ethWDomain[process.env.REACT_APP_PUBLIC_CHAIN_ID]
  );
  const ownedNftCount = await domainNftContract.methods
    .balanceOf(userAddress)
    .call();

  const tokenIdCall = [];
  for (let i = 0; i < ownedNftCount; i++) {
    tokenIdCall.push(
      domainNftContract.methods.tokenOfOwnerByIndex(userAddress, i).call()
    );
  }

  const tokenIds = await Promise.all(tokenIdCall);
  const res = tokenIds.map((tokenId) => Number(tokenId));
  return res;
}

export async function getTokenInfos(tokenIds) {
  Web3EthContract.setProvider(process.env.REACT_APP_PUBLIC_NODE);
  const domainNftContract = new Web3EthContract(
    configContractWithABI.ethWDomain.contractInterface,
    addresses.ethWDomain[process.env.REACT_APP_PUBLIC_CHAIN_ID]
  );
  const tokenInfos = await domainNftContract.methods
    .getTokenInfos(tokenIds)
    .call();

  const res = tokenInfos.map((tokenInfo) => ({
    tokenId: tokenInfo["tokenId"],
    owner: tokenInfo["owner"],
    mappingAddress: tokenInfo["mappingAddress"],
    expiredTime: tokenInfo["expiredTime"],
    domainName: tokenInfo["domainName"],
  }));
  return res;
}

export async function getAddressByDomain(domainName) {
  Web3EthContract.setProvider(process.env.REACT_APP_PUBLIC_NODE);
  const domainNftContract = new Web3EthContract(
    configContractWithABI.ethWDomain.contractInterface,
    addresses.ethWDomain[process.env.REACT_APP_PUBLIC_CHAIN_ID]
  );

  const mappingAddress = await domainNftContract.methods
    .getMappingAddressByDomain(domainName)
    .call();

  return mappingAddress;
}

export async function getExtendPriceDefault() {
  Web3EthContract.setProvider(process.env.REACT_APP_PUBLIC_NODE);
  const domainNftContract = new Web3EthContract(
    configContractWithABI.ethWDomain.contractInterface,
    addresses.ethWDomain[process.env.REACT_APP_PUBLIC_CHAIN_ID]
  );

  return await domainNftContract.methods
    .extendPrice()
    .call();
}

//getOwnedTokenIds("0x3E3432569431736767196195Dc5a4BE6773a8018");
//getTokenInfos([0, 1, 2, 3]);
//getAddressByDomain("bsc.ethw");
