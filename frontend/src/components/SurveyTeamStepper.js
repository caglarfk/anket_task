import React, { useState } from "react";
import {
    Typography,
    TextField,
    Button,
    Stepper,
    Step,
    StepLabel,
    Box,
    Container,Select,InputLabel,FormControl,MenuItem
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ServerEndPoint = "http://localhost:8000/api/";
function getSteps() {
    return [
        "Kayıt Form",
        "Tuttuğunuz Futbol Takımı",
        "Anket Bitiş",

    ];
}



const SurveyTeamStepper = () => {
    const navigate=useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [skippedSteps, setSkippedSteps] = useState([]);
    const steps = getSteps();
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [gender, setGender] = useState();
    const [birthdate, setBirthdate] = useState();
    const [team, setTeam] = useState();
    const [description, setDescription] = useState();


    const handleSave = () => {
        let data = {
            name,
            surname,
            gender,
            birthdate,
            team,
            description,
            pollster:"Team Anketör",
            happy:0
            
        }


        console.log(data);
        axios.post(ServerEndPoint + 'all/save', data).then(res => {
            if (res) {              
                alert("Tebrikler! Yeni Haber Kaydı Başarılı!");
            }
        }).catch(err => {
            console.log(err);
        });

    }


    const isStepOptional = (step) => {
        return step === 1 || step === 2;
    };

    const isStepSkipped = (step) => {
        return skippedSteps.includes(step);
    };

    const handleNext = () => {
        setActiveStep(activeStep + 1);

    };
    const handleFinish = () => {
        console.log("biitti")
        handleSave();
        navigate("/")
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };


    function getStepContent(step) {
   
        switch (step) {
            case 0:
                return (
                    <>
                        <TextField
                            id="filled-basic"
                            label="Adınız"
                            variant="filled"
                            fullWidth
                            margin="normal"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            id="filled-basic"
                            label="Soyadınız"
                            variant="filled"
                            fullWidth
                            margin="normal"
                            onChange={(e) => setSurname(e.target.value)}
                        />
    
                        <TextField
                            id="filled-basic"
                            label="Cinsiyetiniz"
                            variant="filled"
                            fullWidth
                            margin="normal"
                            onChange={(e) => setGender(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Doğum Gününüz"
                            type="date"
                            data-date=""
                            data-date-format="DD MMMM YYYY"
                            variant="filled"
                            margin="normal"
                            onChange={(e) => setBirthdate(e.target.value)}
    
                        />
                    </>
                );
    
            case 1:
                return (
                    <>

                    <Box
                        sx={{
                            '& > legend': { mt: 2 },
                            textAlign: "center",
                        }}
                    >
                       <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-filled-label">Takım</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                onChange={(e) => setTeam(e.target.value)}>
                                <MenuItem value={"Galatasaray"}>Galatasaray</MenuItem>
                                <MenuItem value={"Fenerbahçe"}>Fenerbahçe</MenuItem>
                                <MenuItem value={"Beşiktaş"}>Beşiktaş</MenuItem>
                            </Select>
                        </FormControl>

                    </Box>
                    <Box
                        sx={{
                            '& > legend': { mt: 2 },
                            textAlign: "center",
                            mt:5
                        }}
                    >
                        <TextField
                            id="filled-multiline-static"
                            label="Açıklama"
                            multiline
                            rows={4}
                            variant="filled"
                            sx={{width:300}}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Box>
                </>
                );
            default:
                return (
                    <>
                        <Box
                    sx={{
                        '& > legend': { mt: 2 },
                        textAlign: "center",
                        mt:5
                    }}
                >
                     <Typography variant="h2" align="center" sx={{fontFamily:"bold",}}>
                            Anketör Limited Aş
                        </Typography>

                        <Typography variant="h3" align="center">
                            Teşekürler 
                        </Typography>
                </Box>
                    </>
                );
        }
    }
    return (
        <Container>
            <Stepper alternativeLabel activeStep={activeStep}>
                {steps.map((step, index) => {
                    const labelProps = {};
                    const stepProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = (
                            <Typography
                                variant="caption"
                                align="center"
                                style={{ display: "block" }}
                            >
                                optional
                            </Typography>
                        );
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step {...stepProps} key={index}>
                            <StepLabel {...labelProps}>{step}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>

            <form>{getStepContent(activeStep)}</form>


            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                >
                    Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {activeStep === steps.length - 1 ? <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleFinish()}
                >
                    Finish
                </Button> : <Button
                    onClick={() => handleNext()}
                    sx={{ mr: 1 }}
                >
                    Next
                </Button>}




            </Box>

        </Container>
    );
};

export default SurveyTeamStepper;