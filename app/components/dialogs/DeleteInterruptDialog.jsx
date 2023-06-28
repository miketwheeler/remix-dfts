import { 
    Button, 
    Dialog,
    DialogActions, 
    DialogContent, 
    DialogTitle
} from '@mui/material';


function DeleteInterruptDialog({props}) {
    // modal open state on the parent component & pass down as props (for onClose)
    const { showConfirmation, setShowConfirmation, handleDelete, deleteDialogSubject } = props

    const handleCancelDelete = () => {
        setShowConfirmation(false);
    };

    return (
        <Dialog open={showConfirmation} onClose={handleCancelDelete}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
                <p>{deleteDialogSubject}</p>
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