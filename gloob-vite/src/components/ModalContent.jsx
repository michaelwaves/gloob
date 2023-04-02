import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, TextField, Box, Grid, Typography, Divider, CircularProgress } from "@mui/material";
import { useState } from "react";
import GPT from "./GPT";
import Dalle from "./Dalle";

import {TWILIO_SID, TWILIO_AUTH_TOKEN, FROM_PHONE_NUMBER} from '../APIKey'

export default function ModalContent (props) {

    const [togglePictures, setTogglePictures] = useState(true)
    const [loadingTwilio, setLoadingTwilio]= useState(false)
    const [phone, setPhone] = useState('')
    const [textSent, setTextSent] = useState(false)

    let handleSubmit = (e)=> {
        e.preventDefault()
        setTogglePictures(false)
    }

    let handleClose = () => {
        setTogglePictures(true)
        setTextSent(false)
        setPhone('')
        props.close()
    }

    let sendTwilioMessage = (e) => {

        e.preventDefault()

        setLoadingTwilio(true)

        
        const accountSid = TWILIO_SID;
        const authToken = TWILIO_AUTH_TOKEN;
        const from = FROM_PHONE_NUMBER;
        const data = new FormData();

        data.append('To', phone);
        data.append('From', from);
        //data.append('Body', 'Here is a copy of your custom ad');
        data.append('Body', props.data?.companies);
        
        //data.append('MediaUrl', 'https://demo.twilio.com/owl.png')
        setLoadingTwilio(true)


        fetch('https://api.twilio.com/2010-04-01/Accounts/' + accountSid + '/Messages.json', {
            method: 'post',
            body: data,
            headers: {
                'Authorization': 'Basic ' + btoa(accountSid + ':' + authToken),
            },
        }).then(response => {
            if (response.ok) {
                setLoadingTwilio(false)
                setTextSent(true)
            } else {
                console.log('Error sending text message: ' + response.status);
            }

        }).catch(error => {
            console.log('Error sending text message: ' + error);
        });


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
                    
                        <img
                            src={props.data !== '' ? props.data?.pictures[Math.floor(Math.random() * 3)].img: null}
                            style={{width: '60%', textAlign: 'center', borderRadius: 10}}
                        />

                        <DialogContentText sx={{color: 'white', mt: 2}}>
                            Guess the year this picture was taken
                        </DialogContentText>
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
                                sx={{color: 'white', mt: 2, mb: 1, border: 'solid white', borderRadius: 5}}
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
                                    Percentage decrease in tree cover between {props.data?.pictures[0].year} and {props.data?.pictures[2].year}: {props.data?.percentageDecrease}%
                                </Typography>
                            </Grid>
                        </Grid>

                        <Divider sx={{ borderBottomWidth: 3, borderColor: 'white', mx: 5,  my: 2 }} />
                        <Typography variant="h6" sx={{textAlign: 'center', color: 'white'}}>
                            Learn more
                        </Typography>
                        <Typography variant="body1" sx={{textAlign: 'center', color: 'white', mb: 2}}>
                            Ask Glooby any questions you may have on this topic
                        </Typography>
                        <GPT location={props.data?.title}/>

                        <Divider sx={{ borderBottomWidth: 3, borderColor: 'white', mx: 5, my: 3 }} />
                        <Typography variant="h6" sx={{textAlign: 'center', color: 'white', mb: 1}}>
                            Make some art!
                        </Typography>

                        <Dalle location={props.data?.title}/>

                        <Divider sx={{ borderBottomWidth: 3, borderColor: 'white', mx: 5,  my: 2 }} />
                        <Typography variant="h5" sx={{textAlign: 'center', color: 'white', mb: 2}}>
                            Call to action
                        </Typography>
                        <Typography variant="body1" sx={{textAlign: 'center', color: 'white', mb: 2}}>
                            Do your part and adopt sustainable living! Input your phone number below to receive recommendations of country specific up-and-coming sustainable companies and products.
                        </Typography>


                        {
                            !textSent ? (
                                <Box>

                                    <Typography variant="body2" sx={{textAlign: 'center', color: 'white'}}>
                                        Format: 1234567890
                                    </Typography>
                        
                                    <form onSubmit={sendTwilioMessage} style={{ color: 'white',display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                        <TextField 
                                            value={phone}
                                            type='tel' 
                                            sx={{my: 2}}
                                            InputProps={{
                                                sx: {
                                                    color: 'white'
                                                }
                                            }}
                                            required
                                            onChange={(e) => setPhone(e.target.value)}
                        
                                        />
                                        <Button disabled={loadingTwilio} sx={{textAlign: 'center', width: 100, backgroundColor: 'green',
                                            '&:hover': {
                                                backgroundColor: 'green',
                                                border: 'solid 1px white'
                                            }}} variant="contained" 
                                            type="submit"
                                        >
                                            {
                                                !loadingTwilio ? (
                                                    'Send'
                                                ): (
                                                    <CircularProgress size={25} sx={{color: 'white'}}/>
                                                )
                                            }
                                        </Button>
                                    </form>

                                </Box>
                                ): (
                                    <Typography sx={{textAlign: 'center', py: 10, color: 'white'}}>
                                        A text message has been sent to you !
                                    </Typography>
                                )
                            }

                    </DialogContent>
                    
                )
            }

           
        </Dialog>
    )
}