import React from "react";
import TopBar from "../TobBar/TopBar";
import styles from './ReportingAndCompilence.module.css';

const ReportingAndCompilence:React.FC=()=>{
    return (
        <div className={styles.container}>
            <TopBar activePage="Reporting & Compilence" />

            Reporting and compilence page
        </div>
    )
}

export default ReportingAndCompilence;