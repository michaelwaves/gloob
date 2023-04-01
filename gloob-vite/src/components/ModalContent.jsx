import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, TextField, Box, Grid, Typography } from "@mui/material";
import { useState } from "react";
import GPT from "./GPT";

import Image1 from '../assets/images/KI_2020.png'

export default function ModalContent (props) {

    const [togglePictures, setTogglePictures] = useState(true)

    let handleSubmit = (e)=> {
        e.preventDefault()
        setTogglePictures(false)
    }

    let handleClose = () => {
        console.log('closeeed')
        setTogglePictures(true)
        props.close()
    }

    return (
        <Dialog open={props.open} onClose={handleClose}
            PaperProps={{
                elevation: 5, 
                sx: {
                    background: 'linear-gradient(to bottom, rgba(0, 77, 26, 1), rgba(61, 57, 57, 0.9))'
                }
            }}
        
        >
            <DialogTitle sx={{textAlign: 'center', color :'white', mt: 1}}>
                Deforestation in {props.data?.title}
            </DialogTitle>

            {
                togglePictures ? (
                    <DialogContent sx={{textAlign: 'center', color: 'white', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                        <DialogContentText sx={{color: 'white', mb: 2}}>
                            Guess the year this picture was taken
                        </DialogContentText>
                        <img
                            src={props.data !== '' ? props.data?.pictures[Math.floor(Math.random() * 3)].img: null}
                            style={{width: '60%', textAlign: 'center', borderRadius: 10}}
                        />
                        <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} onSubmit={handleSubmit}>
                            <TextField
                                type="number"
                                required
                                InputProps={{
                                    type: 'number',
                                    sx: {
                                        color: 'white'
                                    }
                                }}
                                sx={{color: 'white', mt: 2, mb: 1}}
                            />
                            <Button
                                type="submit" 
                                sx={{my: 1, backgroundColor: 'green', 
                                '&:hover': {
                                    backgroundColor: 'green', 
                                    border: 'solid 1px white'
                                    }
                                }} 
                                variant="contained"
                            >
                                Submit
                            </Button>
                        </form>
                
                    </DialogContent>
                ): (
                    <DialogContent sx={{overflowX: 'auto'}}>

                        <DialogContentText sx={{color: 'white', textAlign: 'center', mb: 2}}>
                            Forest cover change from {props.data?.pictures[0].year} to {props.data?.pictures[2].year}
                        </DialogContentText>

                        <Grid container spacing={0.5} sx={{mb: 2}}>

                            {
                                props.data?.pictures?.map((element, i) => (
                                    <Grid item xs={4} key={i}>
                                        <img
                                            src={element?.img}
                                            style={{width: '100%', textAlign: 'center', borderRadius: 1}}
                                        />
                                        <Typography sx={{color: 'white', textAlign: 'center'}}>
                                            {element?.year}
                                        </Typography>
                                    </Grid>
                                ))
                            }
                                                      
                        </Grid>

                        <Grid container spacing={2} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Grid xs={5} item>
                                <img
                                    src={props.data?.forestLoss}
                                    style={{width: '100%', textAlign: 'center', borderRadius: 20}}
                                />
                            </Grid>

                            <Grid xs={7} item>
                                <Typography sx={{color: 'white', textAlign: 'center'}}>
                                    Percentage decrease in humid primary forest between {props.data?.pictures[0].year} and {props.data?.pictures[2].year}: {props.data?.percentageDecrease}%
                                </Typography>
                            </Grid>
                        </Grid>

                        <Typography variant="h4" sx={{textAlign: 'center'}}>
                            Learn more
                        </Typography>
                        <GPT/>
                    </DialogContent>
                )
            }

           
        </Dialog>
    )
}