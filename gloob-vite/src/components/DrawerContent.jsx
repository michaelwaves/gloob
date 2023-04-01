
import { Drawer, Box, Typography } from "@mui/material"

export default function DrawerContent (props) {
  
    

    return (
        <Drawer
            open={props.openDrawer}
            anchor='right'
            onClose={() => props.setOpenDrawer(false)}
            PaperProps={{
                sx: {
                    background: 'linear-gradient(to bottom, rgba(0, 153, 0, 1), rgba(61, 57, 57, 0))'
                  
                }
              }}

            sx={{position: 'absolute', height: '100%', top: 0, left: 0, width: '1000px', color: 'white'}}
        >
            <Box sx={{px: 5}}>
                <Typography variant="h6" sx={{color: 'white', mt: 2}}>{props.drawerTitle}</Typography>
            </Box>
        </Drawer>
    )
} 