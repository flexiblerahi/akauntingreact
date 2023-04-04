/* eslint-disable indent */
/* eslint-disable quotes */
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import axiosInstance from "../../services/axiosInstance";

function CreateCategories(props) {
    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const [type, setType] = useState('');
    const { classes, companyID } = props;
    const submitForm = (e) => {
        e.preventDefault();
        axiosInstance
            .post(`/categories?company_id=${companyID}`, {
                company_id: Number(companyID),
                type,
                name,
                color,
                enabled: 1
            }, {
                headers: {
                    Authorization: localStorage.getItem('authorizationValue')
                }
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <form onSubmit={submitForm}>
            <Grid container alignItems="start" justify="start" direction="column" md={4}>
                <Grid item>
                    <TextField fullWidth
                        id="name-input"
                        name="name"
                        label="Name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField fullWidth
                        id="color-input"
                        name="color"
                        label="Color"
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <TextField fullWidth
                        id="type-input"
                        name="type"
                        label="type"
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    />
                </Grid>
                <Button variant="contained" color="primary" type="submit">
                    Submit
                </Button>
            </Grid>
        </form>
    );
}

CreateCategories.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default CreateCategories;
