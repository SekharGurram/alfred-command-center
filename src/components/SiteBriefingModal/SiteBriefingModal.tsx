import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import styles from './SiteBriefingModal.module.css'
import { useState } from 'react';
import {
    Dialog,
    DialogActions,
    Button,
    Box,
    ToggleButton,
    ToggleButtonGroup
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface Props {
    open: boolean;
    onClose: () => void;
    site: any,
    tasksInfo: any
}

const SiteBriefingModal: React.FC<Props> = ({ open, onClose, site, tasksInfo }) => {
    const theme = useTheme();
    const [view, setView] = useState<'overview' | 'details'>('details');

    const handleViewChange = (_event: any, newView: any) => {
        if (newView !== null) {
            setView(newView);
        }
    };
    const handleClose = () => {
        onClose();
    }

    const getTaskButton = (sTask: any) => {
        if (sTask.completion === 0 && new Date(sTask.dueDate) > new Date()) {
            return (
                <Button
                    variant="contained"
                    sx={{ textTransform: 'none', height: '5vh' }}
                    className={styles.due_btn}
                >
                    {new Date(sTask.dueDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                    })}
                </Button>
            )
        } else if (sTask.completion === 100) {
            return (<Button variant="outlined" sx={{ textTransform: 'none', height: '5vh' }} className={styles.normal_btn}>Completed</Button>)
        } else if (sTask.completion > 0) {
            return (<Button variant="outlined" sx={{ textTransform: 'none', height: '5vh' }} className={styles.progress_btn}>In Progress</Button>)
        }
    }

    return (
        <Dialog
            fullWidth maxWidth="md"
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
            <div className={styles.dialog_container}>
                <div style={{ marginTop: "0px" }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between"
                        sx={{ marginTop: "0px" }}
                    >
                        <h4 style={{ marginBottom: "0px", marginTop: "0px", color: "#5b93cf", fontWeight: 700 }}>
                            Daily Site Briefing - Maharashtra Solar Network
                        </h4>
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            edge="end"
                        >
                            <CancelPresentationIcon sx={{ backgroundColor: 'white' }} />
                        </IconButton>
                    </Box>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <Box>
                        <ToggleButtonGroup
                            value={view}
                            exclusive
                            onChange={handleViewChange}
                            fullWidth
                            sx={{
                                width: '100%',
                                height: "12px",
                            }}
                        >
                            <ToggleButton
                                value="overview"
                                sx={{
                                    flex: 1,
                                    borderRadius: '8px 0 0 8px',
                                    backgroundColor: '#0f1924', // default inactive
                                    color: '#5b93cf',
                                    textTransform: 'none',
                                    '&:hover': {
                                        backgroundColor: '#222', // slightly lighter black on hover
                                    },
                                    '&.Mui-selected': {
                                        backgroundColor: '#536e8c', // active blue
                                        color: '#5b93cf',
                                        '&:hover': {
                                            backgroundColor: '#536e8c', // darker blue on hover
                                        },
                                    },
                                }}
                            >
                                Network Overview
                            </ToggleButton>
                            <ToggleButton
                                value="details"
                                sx={{
                                    flex: 1,
                                    borderRadius: '8px 0 0 8px',
                                    backgroundColor: '#0f1924',
                                    textTransform: 'none',
                                    color: '#5b93cf',
                                    '&:hover': {
                                        backgroundColor: '#222',
                                    },
                                    '&.Mui-selected': {
                                        backgroundColor: '#536e8c',
                                        color: '#5b93cf',
                                        '&:hover': {
                                            backgroundColor: '#536e8c',
                                        },
                                    },
                                }}
                            >
                                Project Schematic
                            </ToggleButton>
                        </ToggleButtonGroup>

                    </Box>
                </div>
                <div>
                    {view === 'overview' ? (
                        <div>
                            Network Overview Section
                        </div>
                    ) : (
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p style={{ marginTop: 0, marginBottom: '10px' }}>{tasksInfo.projectName}</p>

                                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ margin: 0, fontSize: '12px', color: '#555' }}>SPI</p>
                                        <p style={{ margin: 0,color:"orange" }}>{tasksInfo.spi}</p>
                                    </div>

                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ margin: 0, fontSize: '12px', color: '#555' }}>Completion</p>
                                        <p style={{ margin: 0,color:"blue" }}>{tasksInfo.completion}%</p>
                                    </div>
                                </div>
                            </div>


                            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                                {
                                    tasksInfo.tasks.map((task: any) => (
                                        <div className={styles.flex_container} key={task._id} style={{ marginBottom: "10px" }}>
                                            <div className={styles.card_container}>
                                                <p style={{ color: "orange",textAlign:"center" }}>{task._id}</p>
                                                {
                                                    task.tasks.map((sTask: any) => (
                                                        <div className={styles.inner_container} key={sTask._id}>
                                                            <div className={`${styles.flex_container}`}>
                                                                {sTask.completion === 100 && (
                                                                    <CheckCircleOutlineIcon sx={{ backgroundColor: "green", width: "12px", height: "12px" }} />
                                                                )}
                                                                {sTask.completion === 0 && (
                                                                    <CheckCircleOutlineIcon sx={{ backgroundColor: "black", width: "12px", height: "12px" }} />
                                                                )}
                                                                {sTask.completion > 0 && sTask.completion !== 100 && (
                                                                    <AccessTimeIcon sx={{ backgroundColor: "orange", width: "12px", height: "12px" }} />
                                                                )}
                                                                <h6>{sTask.name}</h6>
                                                                <p>{sTask.completion}%</p>
                                                            </div>
                                                            {getTaskButton(sTask)}
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>


                        </div>
                    )}
                </div>

            </div>
            <DialogActions>
                <Button variant="outlined" onClick={onClose} sx={{ textTransform: 'none' }}>Close</Button>
                <Button variant="contained" onClick={onClose} sx={{ textTransform: 'none' }}>Export Network Report</Button>
            </DialogActions>
        </Dialog>
    );
};

export default SiteBriefingModal;
