import * as React from 'react';
import { useState,useEffect } from 'react';
import {
    Dialog,
    DialogActions,
    Button,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { InputLabel} from '@mui/material';
import styles from './CustomModal.module.css';

interface Props {
    open: boolean;
    onClose: () => void;
    communication: any;
    communicationAction: string;
    onUpdateComplete: () => void;
    showNotification: (msg: string) => void;
}

const CustomModal: React.FC<Props> = ({ open, onClose, communication, communicationAction,onUpdateComplete,showNotification}) => {
    const [title, setTitle] = useState("");
    const [discription, setDiscription] = useState("");
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);
    const baseUrl=process.env.REACT_APP_API_BASE_URL;


    const getDialogContent = () => {
        if (communicationAction === "FlagRisk") {
            return (
                <div>
                    Do You want to Escalate the severity of the communication?
                </div>
            )
        } else if (communicationAction === "Insight") {
            return (
                <div>
                    <h3 className={styles.heading}>Add note</h3>
                    <TextField
                        id="note"
                        multiline
                        rows={4}
                        fullWidth
                        value={note}
                        onChange={handleNote}
                        InputProps={{
                            style: {
                                backgroundColor: '#1e1e1e',
                                color: '#ffffff',
                            },
                        }}
                        InputLabelProps={{
                            style: {
                                color: '#b0b0b0',
                            },
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#444',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#42a5f5',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#42a5f5',
                                },
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#42a5f5',
                            },
                        }}
                    />
                </div>
            )
        } else {
            return (
                <div>
                    <div>
                        <h3 className={styles.heading}>Update Communication</h3>
                        <InputLabel htmlFor="title" className={styles.label}>Title</InputLabel>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            value={title}
                            onChange={handleTitle}
                            InputProps={{
                                style: {
                                    backgroundColor: '#1e1e1e',
                                    color: '#ffffff',
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: '#b0b0b0',
                                },
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#444',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#42a5f5',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#42a5f5',
                                    },
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#42a5f5',
                                },
                            }}
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="description" className={styles.label}>Description</InputLabel>
                        <TextField
                            id="description"
                            multiline
                            value={discription}
                            onChange={handleDiscription}
                            rows={4}
                            fullWidth
                            InputProps={{
                                style: {
                                    backgroundColor: '#1e1e1e',
                                    color: '#ffffff',
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: '#b0b0b0',
                                },
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#444',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#42a5f5',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#42a5f5',
                                    },
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#42a5f5',
                                },
                            }}
                        />
                    </div>
                </div>
            )
        }
    }
    const handleTitle = (event: any) => {
        setTitle(event.target.value)
    }
    const handleDiscription = (event: any) => {
        setDiscription(event.target.value)
    }
    const handleNote = (event: any) => {
        setNote(event.target.value)
    }
    const updateCommunication = async () => {
        try {
            setLoading(true);
            let data: any = {};
            if (communicationAction === "FlagRisk") {
                data.operation = communicationAction;
                data.data = {
                    status: communication.status
                };
            } else if (communicationAction === "Insight") {
                data.operation = communicationAction;
                data.data = {
                    note: note
                };
            } else {
                data.operation = communicationAction;
                data.data = {
                    title: title,
                    description: discription
                };
            }
            const res = await fetch(`${baseUrl}/communications/${communication._id}/update`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            onClose();
             showNotification('Communication updated successfully!');
            onUpdateComplete();
        } catch (err) {
            console.log("issue getting while updating communication");
            showNotification('Update failed');
        }finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        if (communication) {
            setTitle(communication.title || "");
            setDiscription(communication.message || "");
            setNote(communication.note || "");
        }
    }, [communication]);

    return (
        <Dialog
            fullWidth maxWidth="sm"
            open={open}
            onClose={onClose}
            aria-labelledby="responsive-dialog-title"
            PaperProps={{
                sx: {
                    backgroundColor: '#0e161c',
                    color: 'white',
                    padding: 2,
                    borderRadius: 2,
                }
            }}
        >
            {getDialogContent()}
            <DialogActions>
                <Button variant="outlined"
                    onClick={onClose}
                    sx={{ textTransform: 'none' }}>Cancel</Button>
                {communicationAction === "FlagRisk" && (
                    <Button variant="contained"
                        onClick={updateCommunication}
                        sx={{ textTransform: 'none' }}>Yes</Button>
                )}
                {communicationAction === "Insight" && (
                    <Button variant="contained"
                        onClick={updateCommunication}
                        sx={{ textTransform: 'none' }}>Add Note</Button>
                )}
                {communicationAction === "Update" && (
                    <Button variant="contained"
                        onClick={updateCommunication}
                        sx={{ textTransform: 'none' }}>
                            {loading ? "Processing..." : "Update"}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}

export default CustomModal;