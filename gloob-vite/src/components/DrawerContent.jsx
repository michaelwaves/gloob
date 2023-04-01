
import { Fragment, useState } from "react";
import { Drawer, Box, Typography, Icon, Dialog } from "@mui/material"

import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { divIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";


import ForestIcon from '@mui/icons-material/Forest';
import ModalContent from "./ModalContent";

export default function DrawerContent (props) {
  

    const iconMarkup = renderToStaticMarkup(
        <ForestIcon size="large"/>
    );
    
    const icon = divIcon({
        html: iconMarkup,
        iconSize: [40, 40],
        className: 'leaflet-div-icon'
    });

    const [openDialog, setOpenDialog] = useState(false)


    return (
        <Fragment>

            <ModalContent open={openDialog} close={() => setOpenDialog(false)}/>
            
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
                    <Typography variant="h6" sx={{color: 'white', mt: 2, textAlign: 'center'}}>{props.drawerTitle}</Typography>
                </Box>

                <MapContainer center={[50.5151414,-135.7566231]} zoom={3} scrollWheelZoom={false} style={{width: 500, height: '90vh'}}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker 
                        position={[50.5151414,-135.7566231]} 
                        eventHandlers={{
                            click: (e) => {
                                setOpenDialog(true)
                            },
                        }}
                        icon={
                            icon
                        }
                        
                    >
                        {/* <Popup onClick={() => console('hi')}>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup> */}
                    
                    </Marker>

                </MapContainer>
                
            </Drawer>

        </Fragment>
    )
} 