import * as React from "react"
import { Modal, Button, Box, Stack } from '@mui/material'
import { useConnect } from 'wagmi'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: "15px",
};

export default function SelectWalletModal({ isOpen, closeModal }) {

  const { connect, connectors, isLoading, pendingConnector } = useConnect()

  return (
    <Modal open={isOpen} onClose={closeModal}>
      <Box sx={style}>
        <Stack spacing={1}>
        {connectors.map((connector) => (
          <Button
            variant="outlined"
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect({ connector })}
          >
            {connector.name}
            {!connector.ready && ' (unsupported)'}
            {isLoading &&
              connector.id === pendingConnector?.id &&
              ' (connecting)'}
          </Button>
        ))}
        </Stack>
      </Box>
    </Modal>
  );
}
