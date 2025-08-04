import * as React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Grid from '@mui/material/GridLegacy';
import styles from './ActionCenter.module.css';
import { getMinutesAgo } from '../../utils/getTime';


interface ActionProps {
    actions: any;
    lastUpdated:any
}

const ActionCenter: React.FC<ActionProps> = ({ actions,lastUpdated }) => {
    const criticalActions = actions.filter((action: any) => action.type === 'Critical Risk Register');
    const immediateActions = actions.filter((action: any) => action.type === 'Immediate Action Required');

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <div className={styles.communication_hub_container}>
                    <h5 className={styles.section_heading}>Action Center</h5>
                    {criticalActions.length > 0 && (
                        <h5>Critical Risk Register</h5>
                    )}
                    {
                        criticalActions.map((item: any) => (
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
                                        {item.description}
                                    </p>
                                    <div className={`${styles.map_item_container}`}>
                                        <div className={styles.map_item_header}>
                                            <p className={styles.timestamp}>{getMinutesAgo(lastUpdated)}</p>
                                            <div className={styles.hub_time_container}>
                                                {item.priority === 'High' && (
                                                    <Button variant="outlined" sx={{ textTransform: 'none', height: '5vh' }} className={styles.high_btn}>High Priority</Button>
                                                )}
                                                {item.status === 'New' && (
                                                    <Button variant="outlined" sx={{ textTransform: 'none', height: '5vh' }} className={styles.normal_btn}>New</Button>
                                                )}
                                                {item.generatedByAI === true && (
                                                    <Button variant="contained" sx={{ textTransform: 'none', height: '5vh' }} className={styles.ai_btn}>AI Generated</Button>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </Card>
                        ))
                    }
                    {immediateActions.length > 0 && (
                        <h5>Immediate Action Required</h5>
                    )}
                    {
                        immediateActions.map((item: any) => (
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
                                        {item.description}
                                    </p>
                                    <div className={`${styles.map_item_container}`}>
                                        <div className={styles.map_item_header}>
                                            <p className={styles.timestamp}>14 minutes ago</p>
                                            <div className={styles.hub_time_container}>
                                                {item.priority === 'High' && (
                                                    <Button variant="outlined" sx={{ textTransform: 'none', height: '5vh' }} className={styles.high_btn}>High Priority</Button>
                                                )}
                                                {item.status === 'New' && (
                                                    <Button variant="outlined" sx={{ textTransform: 'none', height: '5vh' }} className={styles.normal_btn}>New</Button>
                                                )}
                                                {item.generatedByAI === true && (
                                                    <Button variant="contained" sx={{ textTransform: 'none', height: '5vh' }} className={styles.ai_btn}>AI Generated</Button>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </Card>
                        ))
                    }
                </div>
            </Grid>
        </Grid>
    );
}

export default ActionCenter;