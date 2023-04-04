import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance';
import Grid from '@material-ui/core/Grid';
import { Icon } from '@material-ui/core';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.secondary.dark,
        backgroundColor: theme.palette.secondary.light
    },
});

function ReportList(props) {
    const { classes } = props;
    const { companyID } = props;
    const [reports, setReport] = useState([]);


    useEffect(() => {
        const abortController = new AbortController();

        if (companyID !== '') {
            axiosInstance
                .get(`/reports?company_id=${companyID}`, {
                    headers: {
                        Authorization: localStorage.getItem('authorizationValue')
                    }
                })
                .then((res) => {
                    setReport(res?.data?.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        return () => {
            abortController.abort();
        };
    }, [companyID]);

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {reports.map((report) =>
                <Grid item xs={12} sm={6}>
                   <p> {report.name}</p> <Icon>dot</Icon>
                   <p>{report.description}</p>
                </Grid>
                )}
            </Grid>
        </div>
    );
}

ReportList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReportList);