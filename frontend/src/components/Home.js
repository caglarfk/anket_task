import { Container, Grid } from '@mui/material'
import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SurveyTable from './SurveyTable';
import { useNavigate } from "react-router-dom";
function Home() {

    const navigate = useNavigate();
    
    return (
        <Container >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: "row",
                    textAlign: "center",
                    justifyContent: "center",

                    '& > :not(style)': {
                        m: 1,
                        width: 350,
                        height: 128,
                    },

                }}
            >
                <Paper elevation={3} sx={{ display: "flex", m: 20, backgroundColor: "#66fff1", alignItems: "center", cursor: "pointer" }} onClick={() => navigate("/happy")}>

                    <Typography sx={{ fontSize: 24, fontFamily: "bold", textAlign: "center", justifyContent: "center" }}>
                        Memnuniyet Anketine Katılmak İçin Tıklayınız!
                    </Typography>





                </Paper>
                <Paper  elevation={3} sx={{ display: "flex", m: 20, backgroundColor: "#d2ce7e", alignItems: "center", cursor: "pointer" }} onClick={() => navigate("/team")}>
                    <Typography sx={{ fontSize: 24, fontFamily: "bold", textAlign: "center", justifyContent: "center" }}>
                        Takım Anketine Katılmak İçin Tıklayınız!
                    </Typography>

                </Paper>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: "row",
                textAlign: "center",
                justifyContent: "center",


            }}>
                <SurveyTable />
            </Box>
        </Container>
    )
}

export default Home