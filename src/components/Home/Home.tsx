import React from "react";
import styles from './Home.module.css';
import TopBar from "../TobBar/TopBar";
import Grid from '@mui/material/GridLegacy';
import Box from '@mui/material/Box';
import AlfredCard from "../Card/Card";

const Home: React.FC = () => {
    return (
        <div className={styles.container}>
            <TopBar activePage="Command Centre" />
            <div className={styles.page_items_container}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <AlfredCard />
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    )
}

export default Home;