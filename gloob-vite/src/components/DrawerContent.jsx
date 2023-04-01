
import { Fragment, useEffect, useState } from "react";
import { Drawer, Box, Typography, Icon, Dialog } from "@mui/material"

import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { divIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";

import { data } from "../schema";

import ForestIcon from '@mui/icons-material/Forest';
import ModalContent from "./ModalContent";

export default function DrawerContent (props) {
  

    const iconMarkup = renderToStaticMarkup(
        <ForestIcon size="large"/>
    );
    
    const icon = divIcon({
        html: iconMarkup,
        iconSize: [30, 30],
        className: 'leaflet-div-icon'
    });

    const [openDialog, setOpenDialog] = useState(false)

    const [titleToShow, setTitleToShow] = useState("")
    const [modalData, setModalData] = useState('')

    const makeTitleFormat = (title) => {
        title = title.replace("_", " ")

        if (title.length === 0){
            return title
        }

        let words = title.split(" ");

        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }

        words = words.join(" ");
        return words
    }

    useEffect(() => {
        setTitleToShow(makeTitleFormat(props.drawerTitle))
    }, [props.drawerTitle])

    return (
        <Fragment>

            <ModalContent open={openDialog} close={() => setOpenDialog(false)} data={modalData}/>
            
            <Drawer
                open={props.openDrawer}
                anchor='right'
                onClose={() => props.setOpenDrawer(false)}
                PaperProps={{
                    sx: {
                        background: 'linear-gradient(to bottom, rgba(0, 153, 0, 1), rgba(61, 57, 57, 0))'
                    }
                }}
                sx={{position: 'absolute', height: '100%', top: 0, left: 0, width: 500, color: 'white'}}
            >
                <Box sx={{px: 5, pb: 2}}>
                    <Typography variant="h6" sx={{color: 'white', mt: 2, textAlign: 'center'}}>{titleToShow}</Typography>
                </Box>

                <MapContainer center={props.drawerTitle !== '' ? data[props.drawerTitle].center : [50.5151414,-135.7566231]} zoom={props.drawerTitle !== '' ? data[props.drawerTitle].zoom : 3} scrollWheelZoom={false} style={{width: 500, height: '90vh'}}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {
                        props.drawerTitle !== '' && data[props.drawerTitle].coordinates.map((element, i) => (
                            <Marker 
                                key={i}
                                position={element.coordinate} 
                                eventHandlers={{
                                    click: (e) => {
                                        setOpenDialog(true);
                                        setModalData(element.data)
                                    },
                                }}
                                icon={
                                    icon
                                }  
                            />
                        ))
                    }

            
                </MapContainer>
                
            </Drawer>

        </Fragment>
    )
} 