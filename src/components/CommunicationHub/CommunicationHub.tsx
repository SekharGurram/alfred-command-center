import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { useState } from "react";
import Grid from '@mui/material/GridLegacy';
import styles from './Communications.module.css';
import CustomModal from '../CustomModal/CustomModal';
import { getMinutesAgo } from '../../utils/getTime';

const communicateSections = [
    {
        key: "communications",
        label: "Communications"
    }, {
        key: "ai_assistant",
        label: "AI Assistant"
    }
];

interface CommunicationProps {
    communications: any;
    onRefresh: () => void;
    showNotification: (msg: string) => void;
    lastUpdated:any
}
const CommunicationHub: React.FC<CommunicationProps> = ({ communications,onRefresh,showNotification,lastUpdated }) => {
    const [activeSection, setActiveAction] = useState("communications");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedCommunication, setSelectedCommunication] = useState<any>({});
    const [communicationAction, setCommunicationAction] = useState("");

    const handlePageClick = (key: string) => {
        if (key === 'communications') {
            // navigate('/');
            console.log("Communications")
        } else if (key === 'ai_assistant') {
            // navigate('/report');
            console.log("AI Assistant");
        }
    };
    const handleCloseDialog = () => setDialogOpen(false);
    const openDialogToUpdateCommunication = (key: string, communication: any) => {
        setDialogOpen(true);
        setSelectedCommunication(communication);
        setCommunicationAction(key);
    }
    return (
        <div>
            {selectedCommunication && dialogOpen && (
                <CustomModal
                    open={dialogOpen}
                    onClose={handleCloseDialog}
                    communication={selectedCommunication}
                    communicationAction={communicationAction}
                    onUpdateComplete={onRefresh}
                    showNotification={showNotification}
                />
            )}
            <Grid container spacing={1} sx={{ marginTop: '0px' }}>
                <Grid item xs={12}>
                    <div style={{ paddingLeft: '5px', paddingRight: '5px', marginTop: '2px' }}>
                        <h5 className={styles.section_heading}>Communication Hub</h5>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'none', md: 'flex' },
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'inline-flex',
                                    border: '1px solid black',
                                    borderRadius: '8px',
                                    marinTop: '10px',
                                    overflow: 'hidden',
                                }}
                            >
                                {communicateSections.map((section) => (
                                    <Button
                                        key={section.key}
                                        onClick={() => handlePageClick(section.key)}
                                        sx={{
                                            color: 'white',
                                            backgroundColor: activeSection === section.key ? '#266147' : 'black',
                                            borderRadius: 0,
                                            textTransform: 'none',
                                            '&:hover': {
                                                backgroundColor: activeSection === section.key ? '#2d7b59' : '#192a45',
                                            },
                                        }}
                                    >
                                        {section.label}
                                    </Button>
                                ))}
                            </Box>
                        </Box>

                        {
                            communications.map((item: any) => (
                                <Card key={item._id}
                                    sx={{
                                        minWidth: 250,
                                        border: '1px solid black',
                                        borderRadius: '10px',
                                        boxShadow: 'none',
                                    }}
                                    className={styles.main_container}>
                                    <div className={`${styles.map_content_div_item}`}>
                                        <h5 className={styles.gap_resolve}>{item.title}</h5>
                                        <p style={{color:"#999896",fontSize:"13px"}}>
                                            {item.message}
                                        </p>
                                        <div className={`${styles.map_item_container}`}>
                                            <div className={styles.map_item_header}>
                                                <p className={styles.timestamp}>{getMinutesAgo(lastUpdated)}</p>
                                                <div className={styles.hub_time_container}>
                                                    {item.status === 'High' && (
                                                        <Button variant="outlined" sx={{ textTransform: 'none', height: '5vh' }} className={styles.high_btn}>High</Button>
                                                    )}
                                                    {item.status === 'Critical' && (
                                                        <Button variant="outlined" sx={{ textTransform: 'none', height: '5vh' }} className={styles.critical_btn}>Critical</Button>
                                                    )}
                                                    {item.status === 'Normal' && (
                                                        <Button variant="outlined" sx={{ textTransform: 'none', height: '5vh' }} className={styles.normal_btn}>Normal</Button>
                                                    )}
                                                    {item.generatedByAI === true && (
                                                        <Button variant="contained" sx={{ textTransform: 'none', height: '5vh' }} className={styles.ai_btn}>AI Generated</Button>
                                                    )}
                                                </div>
                                            </div>

                                        </div>
                                        <div className={styles.map_item_container}>
                                            <div className={styles.map_item_actions}>
                                                <Button variant="outlined" sx={{ textTransform: 'none' }} className={styles.risk_btn} onClick={() => openDialogToUpdateCommunication("FlagRisk", item)}>Flag Risk</Button>
                                                <Button variant="outlined" sx={{ textTransform: 'none' }} className={styles.clarify_btn} onClick={() => openDialogToUpdateCommunication("Insight", item)}>Clarify</Button>
                                                <Button variant="contained" sx={{ textTransform: 'none' }} className={styles.update_btn} onClick={() => openDialogToUpdateCommunication("Update", item)}>Update</Button>
                                            </div>
                                        </div>

                                    </div>
                                </Card>
                            ))
                        }
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default CommunicationHub;