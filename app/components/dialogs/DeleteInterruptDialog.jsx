import React from 'react'
import { 
    Button, 
    Dialog,
    DialogActions, 
    DialogContent, 
    DialogTitle
} from '@mui/material';


function DeleteInterruptDialog({props}) {
    // modal open state on the parent component & pass down as props (for onClose)
    const { showConfirmation, setShowConfirmation, handleDelete } = props

    const handleCancelDelete = () => {
        setShowConfirmation(false);
    };

    return (
        <Dialog open={showConfirmation} onClose={handleCancelDelete}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
                <p>Are you sure you want to permanantly delete this project?</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancelDelete} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleDelete} color="error">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteInterruptDialog;