import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';

import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import { configContractWithABI } from "config/contracts"
import useShowError from "hooks/useShowError";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: 300, md: 400
  },
  background: 'linear-gradient(180deg, #236FE0 0%, #0096E1 100%)',
  borderRadius: "10px",
  boxShadow: 24,
  p: 3,
};

export default function BasicModal(props) {
  const {open, handleClose, tokenId} = props
  const [iptAddress, setIptAddress] = useState("")
  const { showError } = useShowError();

  const { config, error: prepareError } = usePrepareContractWrite({
    ...configContractWithABI.ethWDomain,
    functionName: 'changeMapping',
    args: [iptAddress, tokenId],
  })
  const { data, isLoading, error, write } = useContractWrite(config)
  const { isLoading: isLoadingTransaction } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess() {
      handleClose();
    }
  })

  useEffect(()=>{
    if ((prepareError || error) && iptAddress) {
      showError("Failed to register domain");
    }
  },[prepareError ,error]);

  const handleChangeIptAddress = (e) => setIptAddress(e.target.value)

  const handleChangeAddress = async () => {
    if(!iptAddress || isLoading) return
    try {
      await write?.()
    } catch(err) {
      console.log("🚀 ~ file: index.jsx ~ line 47 ~ handleChangeAddress ~ err", err)
    }
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" sx={{
            fontWeight: 600, fontSize: "25px", lineHeight: "30px", color: "#ffffff", marginBottom: "10px"
          }}>
            Edit Address
          </Typography>
          <Typography id="modal-modal-title" variant="body1" sx={{
            fontWeight: 500, fontSize: "12px", lineHeight: "30px", color: "#ffffff"
          }}>
            Address*
          </Typography>
          <Box my={1} sx={{
            "& input": {
              background: "#FFFFFF",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "10px",
              width: "calc(100% - 24px)",
              border: 0,
              height: "37px",
              padding: "7px 13px",
              fontFamily: "Rubik",
            },
            "& input:focus": {
              border: 0,
              outline: 0,
            }
          }}>
            <input
              label="address"
              value={iptAddress}
              onChange={handleChangeIptAddress}
              placeholder="Enter the address"
            />
            <Typography id="modal-modal-title" variant="body1" sx={{
              fontWeight: 500, fontSize: "12px", lineHeight: "30px", color: "#ffffff", marginTop: "10px"
            }}>
              *Required field must be filled in.
            </Typography>
          </Box>
          <Box display={"flex"} justifyContent="center">
            <Button disabled={isLoading || isLoadingTransaction} onClick={handleChangeAddress} sx={{
              width: "134px",
              background: "#0044D2",
              borderRadius: "15px",
              color: "#ffffff",
              ":hover": {
                background: "#0044D2",
              }
            }}>{isLoading || isLoadingTransaction ? "Pending..." : "Save"}</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
