import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Box, Typography } from "@mui/material"
import { StageOne } from "./StageOne"
import { StageTwo } from "./StageTwo"
import { Progress } from "./Progress"

const RegisterService = () => {

  const { domain } = useParams()
  const [stage, setStage] = useState(1)
  const [percentProgress, setPercentProgress] = useState(30)
  const [registration, setRegistration] = useState({
    year: 1
  })

  const handleIncreaseRegistrationYear = () => {
    if (registration.year >= 99) return
    const yearRegister = registration.year + 1
    setRegistration({
      ...registration,
      year: yearRegister
    })
  }

  const handleDecreaseRegistrationYear = () => {
    if (registration.year <= 1) return
    const yearRegister = registration.year - 1
    setRegistration({
      ...registration,
      year: yearRegister
    })
  }

  const goToNextStage2 = () => {
    setStage(2)
    setPercentProgress(50)
  }

  const handleRegisterSuccess = () => {
    setPercentProgress(100)
  }

  return (
    <Box mx={{xs: 1, lg: 10}}>
      <Box textAlign="center">
        <Typography variant="h2" sx={{
          fontWeight: 600,
          fontSize: "31px",
          lineHeight: "37px",
          color: "#0044D3",
          border: "4px solid #42A5F4",
          borderRadius: "20px",
          padding: "13px",
          display: "inline-block",
        }}>{domain}.ethw</Typography>
      </Box>
      <Box maxWidth={1066} mx="auto">
        {stage === 1 && (<StageOne registration={registration} handleIncreaseRegistrationYear={handleIncreaseRegistrationYear} handleDecreaseRegistrationYear={handleDecreaseRegistrationYear} handleClickRequest={goToNextStage2} />)}
        {stage === 2 && (<StageTwo registration={registration} handleRegisterSuccess={handleRegisterSuccess}/>)}
        <Progress percent={percentProgress}/>
      </Box>
    </Box>
  )
}

export default RegisterService