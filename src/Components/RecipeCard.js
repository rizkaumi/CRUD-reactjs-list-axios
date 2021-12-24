import * as React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography, TextField, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {makeStyles} from "@mui/styles";
import { useState} from "react";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const useStyles = makeStyles((theme) => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
}));

function RecipeCard({card, refresh, setRefresh}){
    const classes = useStyles();
    console.log(card)

    const [formData, setFormData] = useState({
        tittle:'',
        content: '',
        image: ''
      });
    
      const [open, setOpen] = React.useState(false);
      
    const openHandler = () => {
        setFormData({
            tittle:card.tittle,
            content: card.content,
            image: card.image
        })
        setOpen(true)
    }
    
    
    const closeHandler = () => {
        setOpen(false)
    }

    const deleteHandler = async() => {
        const response = await axios.delete(
          `http://localhost:3000/recipes/${card.id}`
        );
        console.log("status delete:"+response.status)
        alert('Deleted!')
        if(response.status===200){
            setRefresh(!refresh);
        }
    }


    const putHandler = async() => {
        const data = { tittle:formData.tittle, content:formData.content , image:formData.image };
        const response = await axios.put(
            `http://localhost:3000/recipes/${card.id}`, data
        );
        console.log("status edit:"+response.status)
        alert('Updated!')
        if(response.status===200){
            setRefresh(!refresh)
        }

    }

    const handleChange = e => {
        let data = {...formData};
        data[e.target.name] = e.target.value;
        setFormData(data)
      };
    

    return (
        <>
            <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={card.image}
                        title={card.tittle}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {card.tittle}
                        </Typography>
                        <Typography>
                            {card.content}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" 
                         variant="outlined" 
                         startIcon={<EditIcon/>} 
                         onClick={openHandler}>
                            Edit
                        </Button>
                        <Button size="small" 
                         variant="outlined" 
                         startIcon={<DeleteIcon/>} 
                         onClick={deleteHandler}>
                            Delete
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
            
            <Dialog
              open={open}
              onClose={closeHandler}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">Edit Recipe</DialogTitle>
              <DialogContent>
                <form>
                  <TextField name='tittle' id="tittle" 
                   placeholder="Enter Dish Name" 
                   value={formData.tittle} onChange={handleChange} 
                   label="Title" variant="outlined" margin="dense" fullWidth />
                  <TextField multiline={true} minRows={3} 
                    name='content' id="content" 
                    placeholder="Enter Recipe" 
                    value={formData.content} onChange={handleChange} 
                    label="Content" variant="outlined" margin="dense" fullWidth />
                  <TextField name='image' id="image" 
                    placeholder="Enter Image URL" 
                    value={formData.image} onChange={handleChange}
                    label="Image source" variant="outlined" margin="dense" fullWidth />
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={closeHandler} color="secondary" variant="outlined">
                  Cancel
                </Button>
                <Button  color="primary" onClick={putHandler} variant="contained">
                  Update
                </Button>
              </DialogActions>
            </Dialog>
            
        </>
    );
};
export default RecipeCard;
