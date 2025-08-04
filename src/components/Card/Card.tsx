    import Card from '@mui/material/Card';
    import Typography from '@mui/material/Typography';
    import styles from './Card.module.css';
    import ProjectSiteMap from '../ProjectSiteMap/ProjectSiteMap';
    import { useEffect, useState } from "react";
    import Grid from '@mui/material/GridLegacy';
    import CommunicationHub from '../CommunicationHub/CommunicationHub';
    import ActionCenter from '../ActionCenter/ActionCenter';
    import Loading from '../Loading/Loading';
    import Notification from '../Notification/Notification';
    import { LinearProgress } from '@mui/material';

    type Site = {
        _id: string;
        name: string;
        location: { lat: number; lng: number };
        weather: { temp: number; wind: number; condition: string };
        capacity: string;
        capacityChange: string;
        progress: number;
        spi: number;
        created_at: string;
        updated_at: string;
        __v: number;
    };

    interface Communication {
        _id: string;
        siteId: string;
        message: string;
        timestamp: string;
    };

    interface Action {
        _id: string;
        siteId: string;
        title: string;
        dueDate: string;
        status: string;
    };

    const AlfredCard = () => {
        const [activeSection, setActiveAction] = useState("communications");
        const [sites, setSites] = useState<Site[]>([]);
        const [selectedSite, setSelectedSite] = useState<Site | null>(null);
        const [communications, setCommunications] = useState<Communication[]>([]);
        const [actions, setActions] = useState<Action[]>([]);
        const [showBriefing, setShowBriefing] = useState(false);
        const [initialLoading, setInitialLoading] = useState(true);
        const [sectionLoading, setSectionLoading] = useState(false);
        const [notifOpen, setNotifOpen] = useState(false);
        const [notifMessage, setNotifMessage] = useState('');
        const [lastUpdated, setLastUpdated] = useState<Date | null>(new Date());
        const baseUrl=process.env.REACT_APP_API_BASE_URL;


        useEffect(() => {
            const fetchSites = async () => {
                try {
                    const res = await fetch(`${baseUrl}/projects`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }

                    const response = await res.json();
                    setSites(response.data);
                } catch (err: any) {
                    console.log("err:", err);
                } finally {
                    setInitialLoading(false);
                }
            };
            fetchSites();
        }, []);

        useEffect(() => {
            if (sites.length > 0 && !selectedSite) {
                setSelectedSite(sites[0]);
            }
        }, [sites]);

        useEffect(() => {
            const fetchData = async () => {
                if (!selectedSite) return;
                setSectionLoading(true);
                await Promise.all([
                    fetchCommunicationsForSite(selectedSite._id),
                    fetchActionsForSite(selectedSite._id)
                ]);
                setSectionLoading(false);
            };

            fetchData();
        }, [selectedSite]);

        useEffect(() => {
            if (!selectedSite) return;

            const intervalId = setInterval(async () => {
                await Promise.all([
                    fetchCommunicationsForSite(selectedSite._id),
                    fetchActionsForSite(selectedSite._id)
                ]);
                setLastUpdated(new Date());
            }, 2 * 60 * 1000); // every 2 minutes

            return () => clearInterval(intervalId);//clean up when site change
        }, [selectedSite]);


        const fetchCommunicationsForSite = async (siteId: string) => {
            try {
                const res = await fetch(`${baseUrl}/communications/${siteId}`);
                const result = await res.json();
                setCommunications(result.data);
            } catch (error) {
                console.error("Failed to fetch communications:", error);
            }
        };

        const fetchActionsForSite = async (siteId: string) => {
            try {
                const res = await fetch(`${baseUrl}/actions/${siteId}`);
                const result = await res.json();
                setActions(result.data);
            } catch (error) {
                console.log("Failed to fetch actions:", error);
            }
        };


        const handlePageClick = (key: string) => {
            if (key === 'communications') {
                // navigate('/');
                console.log("Communications")
            } else if (key === 'ai_assistant') {
                // navigate('/report');
                console.log("AI Assistant");
            }
        };
        const handleSiteClick = (site: any) => {
            if (selectedSite && selectedSite._id === site._id) {
                return;
            }
            setSelectedSite(site);
            setSectionLoading(true);
            setShowBriefing(true);
        };

        const showNotification = (msg: string) => {
            setNotifMessage(msg);
            setNotifOpen(true);
        };


        if (initialLoading) {
            return (
                <Loading />
            )
        }
        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={5}>
                        <Card sx={{ minWidth: 250 }} className={styles.main_container}>
                            <div style={{ paddingLeft: '5px', paddingRight: '5px', marginTop: '2px' }}>
                                <h5 className={styles.section_heading}>{selectedSite?.name}</h5>
                                <ProjectSiteMap
                                    sites={sites}
                                    selectedSite={selectedSite}
                                    onSiteClick={handleSiteClick}
                                />
                            </div>
                            <div className={styles.map_item_container}>
                                <p className={`${styles.map_item} ${styles.map_para_item}`}>{selectedSite?.weather?.temp}°C</p>
                                <p className={`${styles.map_item} ${styles.map_para_item}`}>{selectedSite?.weather?.wind}km/h</p>
                                <p className={`${styles.map_item} ${styles.map_para_item} ${styles.fake_button}`}>Clear</p>
                            </div>
                            <div className={styles.map_item_container} style={{ paddingLeft: '5px', paddingRight: '5px', marginTop: '2px' }}>
                                <div className={`${styles.map_item} ${styles.map_content_div_item}`}>
                                    <Typography variant="caption" className={styles.gap_resolve}>TOTAL CAPACITY</Typography>
                                    <Typography variant="h6" className={styles.gap_resolve}>{selectedSite?.capacity}</Typography>
                                    <Typography className={styles.gap_resolve} style={{color:"#629499"}}>{selectedSite?.capacityChange}</Typography>
                                </div>
                                <div className={`${styles.map_item} ${styles.map_content_div_item}`}>
                                    <Typography variant="caption" className={styles.gap_resolve}>PROGRESS</Typography>
                                    <Typography variant="h6" className={styles.gap_resolve}>
                                        {selectedSite?.progress ?? 0}%
                                    </Typography>
                                    <div className={styles.gap_resolve} style={{ width: '100%', marginTop: 4 }}>
                                        <LinearProgress
                                            variant="determinate"
                                            value={selectedSite?.progress ?? 0}
                                            sx={{
                                                height: 8,
                                                borderRadius: 4,
                                                '& .MuiLinearProgress-bar': {
                                                    backgroundColor: '#1fb7c4',
                                                },
                                                backgroundColor: '#434747'
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={7}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={7}>
                                <Card sx={{ minWidth: 250 }} className={styles.main_container}>
                                    {sectionLoading ? <Loading /> :
                                        <CommunicationHub
                                            communications={communications}
                                            onRefresh={() => {
                                                if (selectedSite) {
                                                    setSectionLoading(true);
                                                    fetchCommunicationsForSite(selectedSite._id).finally(() => {
                                                        setSectionLoading(false);
                                                    });
                                                }
                                            }}
                                            showNotification={showNotification}
                                            lastUpdated={lastUpdated}
                                        />
                                    }
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <Card sx={{ minWidth: 250 }} className={styles.main_container}>
                                    {sectionLoading ? <Loading /> :
                                    <ActionCenter actions={actions}
                                    lastUpdated={lastUpdated}
                                    />}
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Notification
                    open={notifOpen}
                    message={notifMessage}
                    onClose={() => setNotifOpen(false)}
                />

            </div >
        );
    }
    export default AlfredCard;
