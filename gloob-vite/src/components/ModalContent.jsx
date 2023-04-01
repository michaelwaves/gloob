import { Dialog, DialogContent, DialogTitle } from "@mui/material";

export default function ModalContent (props) {

    return (
        <Dialog open={props.open} onClose={props.close}>
            <DialogTitle>
                Info
            </DialogTitle>
            <DialogContent>

            </DialogContent>
        </Dialog>
    )
}