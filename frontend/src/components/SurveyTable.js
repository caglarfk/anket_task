import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ServerEndPoint = "http://localhost:8000/api/";


function SurveyTable() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [uptadeData, setUpdateData] = useState(null);
  const [happy, setHappy] = useState(0);
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [gender, setGender] = useState();
  const [birthdate, setBirthdate] = useState();
  const [description, setDescription] = useState()
  const [team, setTeam] = useState();
  const [pollster, setPollster] = useState();

  useEffect(() => {
    allData();
  }, []);

  const allData = () => {

    axios.get(ServerEndPoint + 'all/list').then(res => {
      setData(res.data);
    }).catch(err => {
      console.log(err);
    });

  }


  const handleDel = (name) => {

    axios.delete(ServerEndPoint + "all/del/" + name).then(res => {

      if (res.statusText === "OK") {
        allData();
        alert("veriler silindi");
      }
    }).catch(err => {
      console.log(err);
    });
  }
  const handleClose = () => [
    setOpen(false)
  ]

  const handleDialog = (data) => {
    setOpen(true)
    console.log(data)
    setUpdateData(data)
  }
 
   const handleUpdate = (getId) => {
console.log(getId)

    let data = {
        name: name||uptadeData?.name,
        surname: surname||uptadeData?.surname,
        gender: gender||uptadeData?.gender,
        birthdate: birthdate||uptadeData?.birthdate,
        description: description||uptadeData?.description,
        team:team||uptadeData?.team,
        pollster:pollster||uptadeData?.pollster,
        happy:happy||4
    };
    axios.put(ServerEndPoint + "all/uptade/" + getId , data ).then(res => {
        console.log(res);

        if (res.statusText === "OK") {
          allData();
          setOpen(false)
            alert("veriler güncellendi");
        }
    }).catch(err => {
        console.log(err);
    });
} 

  return (

    <TableContainer component={Paper} sx={{ mt: 10, border: 1, borderColor: "olive" }}>
      <Table sx={{ minWidth: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><h3>İsim</h3></TableCell>
            <TableCell><h3>Soyisim</h3></TableCell>
            <TableCell><h3>Doğum tarihi</h3></TableCell>
            <TableCell><h3>Cinsiyet</h3></TableCell>
            <TableCell><h3>Tuttuğu Takım</h3></TableCell>
            <TableCell><h3>Mutluluk Oranı</h3></TableCell>
            <TableCell><h3>Açıklama</h3></TableCell>
            <TableCell><h3>Anketör</h3></TableCell>
            <TableCell></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {
            data && data.map((item, i) => (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell >{item.name}</TableCell>
                <TableCell >{item.surname}</TableCell>
                <TableCell >{item.birthdate}</TableCell>
                <TableCell >{item.gender}</TableCell>
                {
                  item.team ? <TableCell >{item.team}</TableCell> : <TableCell>Ankete katılmadı</TableCell>
                }
                {
                  item.happy !== 0 ? <TableCell >{item.happy}</TableCell> : <TableCell>Ankete katılmadı</TableCell>
                }


                <TableCell >{item.description}</TableCell>
                <TableCell >{item.pollster}</TableCell>


                <TableCell sx={{ display: "flex", flexDirection: "column" }}>
                  <Button variant="contained" color="primary" onClick={() => handleDialog(item)}> Güncelle</Button>
                  <Dialog
                    open={open}
                    maxWidth={'lg'}
                    TransitionComponent={Transition}
                    onClose={handleClose}>

                    <DialogContent sx={{ maxWidth: 500 }}>
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        defaultValue={uptadeData?.name}
                        label="Yeni İsim"
                        variant="outlined"
                        onChange={(e) => setName(e.target.value)}
                        rows={10}
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        margin="normal"
                        id="outlined-basic"
                        defaultValue={uptadeData?.surname}
                        label="Yeni Soyisim"
                        variant="outlined"
                        onChange={(e) => setSurname(e.target.value)}
                        rows={10}
                      />
                      <TextField
                        fullWidth
                        margin="normal"
                        id="outlined-basic"
                        defaultValue={uptadeData?.gender}
                        label="Yeni Cinsiyet"
                        variant="outlined"
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <TextField
                        fullWidth
                        margin="normal"
                        defaultValue={uptadeData?.birthdate}
                        id="outlined-basic"
                        label="Yeni Doğum Tarihi"
                        variant="outlined"
                        onChange={(e) => setBirthdate(e.target.value)}
                        rows={10}
                      />
                      <TextField
                        fullWidth
                        margin="normal"
                        defaultValue={uptadeData?.team}
                        id="outlined-basic"
                        label="Yeni Tuttuğunuz Takım"
                        variant="outlined"
                        onChange={(e) => setTeam(e.target.value)}
                        rows={10}
                      />
                      <TextField
                        fullWidth
                        margin="normal"
                        defaultValue={uptadeData?.description}
                        id="outlined-basic"
                        label="Yeni Açıklama"
                        variant="outlined"
                        onChange={(e) => setDescription(e.target.value)}
                        rows={10}
                      />
                      <TextField
                        fullWidth
                        margin="normal"
                        id="outlined-basic"
                        defaultValue={uptadeData?.happy}
                        label="Yeni Mutluluk Seviyesi"
                        variant="outlined"
                        onChange={(e) => setHappy(e.target.value)}
                        rows={10}
                      />
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Anketör isim"
                        defaultValue={uptadeData?.pollster}
                        variant="outlined"
                        onChange={(e) => setPollster(e.target.value)}
                        rows={10}
                        margin="normal"
                      />
                    </DialogContent>

                    <DialogActions>
                  <Button variant={"contained"} color={"primary"} onClick={() => handleUpdate(uptadeData._id)}>
                        Kaydet
                      </Button> 
                      <Button onClick={handleClose}>Vazgeç</Button>

                    </DialogActions>







                  </Dialog>
                  <Button variant="contained" color="secondary" sx={{ mt: 1 }} onClick={() => handleDel(item.name)}>Sil</Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>

  )
}

export default SurveyTable