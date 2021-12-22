import * as React from 'react';
import {useEffect, useState} from 'react';
import RecipeCard from './RecipeCard'
import useStyles from './Style'
import {Button, Container, CssBaseline, Grid, Typography, TextField, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import axios from "axios";


function Recipes() {
  const classes = useStyles();
  const [cards, setCards] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const [formData, setFormData] = useState({
    tittle:"",
    content: "",
    image: ""
  });
  const url='http://localhost:3000/recipes'
  
  //deps = [] -- dijalankan hanya sekali
  useEffect(()=>{
    console.log('useEffect')
    axios.get(url).then(res => {
      setCards(res.data)
    })
  },[refresh])


  const handleChange = e => {
    let data = {...formData};
    data[e.target.name] = e.target.value;
    setFormData(data)
  };

  const postHandler = async(e) => {
    e.preventDefault();
    const data = { tittle:formData.tittle, content:formData.content , image:formData.image };
 
    const response = await axios.post(url, data);
    console.log("status post:"+response.status)
    alert("Posted!")

    if (response.status===201){
      setFormData({
        tittle:"",
        content: "",
        image: ""
      });
      setRefresh(!refresh);
    }
  }

  const doRefresh = () => {
    console.log('doRefresh')
    setRefresh(!refresh)
  }
  const [open, setOpen] = React.useState(false);
  const openHandler = e => {
    e.preventDefault();
    setOpen(true)
  }


  const closeHandler = e => {
    e.preventDefault();
    setOpen(false)
  }


  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Button onClick={doRefresh}>Refresh</Button>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom>
              Recipes
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Aneka macam ide resep masakan dan makanan yang simpel
              tersaji disini untuk memberi panduan dan mempermudah dalam menentukan hidangan lezat untuk
              keluarga anda
            </Typography>
            <div className={classes.heroButtons}></div>

            <Grid align="center">
            <Button variant="contained" onClick={openHandler}>Add Recipe</Button>
            </Grid>

            <Dialog
              open={open}
              onClose={closeHandler}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">Create new recipe</DialogTitle>
              <DialogContent>
                <form>
                  <TextField name='tittle' id="tittle" placeholder="Enter Dish Name" 
                   value={formData.tittle} onChange={handleChange} 
                   label="Title" variant="outlined" margin="dense" fullWidth />
                  <TextField multiline={true} minRows={3} name='content' id="content" 
                   placeholder="Enter Description" value={formData.content} onChange={handleChange} 
                   label="Content" variant="outlined" margin="dense" fullWidth />
                  <TextField name='image' id="image" placeholder="Enter Image URL" 
                   value={formData.image} onChange={handleChange} label="Image source" 
                   variant="outlined" margin="dense" fullWidth />
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={closeHandler} color="secondary" variant="outlined">
                  Cancel
                </Button>
                <Button  color="primary" onClick={postHandler} variant="contained">
                  Post
                </Button>
              </DialogActions>
            </Dialog>             
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <RecipeCard 
                key={card.id} 
                card={card}
                refresh={refresh}
                setRefresh={setRefresh}/>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}

export default Recipes;