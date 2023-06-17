import React from 'react'
import { 
    Box, Typography, Paper, Button, Chip, Divider, Grid, TextField,
    useMediaQuery, Breadcrumbs, Link as MuiLink, Dialog, DialogActions, 
    DialogContent, DialogContentText, DialogTitle
} from '@mui/material';


function EditProjectDialog(props) {
    // modal open state on the parent component & pass down as props (for onClose)
    const {modalOpen, setModalOpen, project, handleEditProject} = props

    return (
        <div style={{ position: 'absolute', top: '-50%', left: "50%"}}>
            <Dialog open={modalOpen} onClose={setModalOpen(false)}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        edit this project 
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="text" onClick={setModalOpen(false)}>cancel</Button>
                    <Button variant="contained" onClick={setModalOpen(false)}>save updates</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditProjectDialog;