/* eslint-disable indent */
/* eslint-disable quotes */
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import axiosInstance from "../../services/axiosInstance";

function UpdateTax(props) {
  const [name, setName] = useState('');
  const [rate, setRate] = useState('');
  const [type, setType] = useState('');
  const { classes, companyID } = props;
  const { id } = useParams();

  useEffect(() => {
    const abortController = new AbortController();

    if (companyID !== '') {
      axiosInstance
        .get(`/taxes/${id}?company_id=${companyID}`, {
          headers: {
            Authorization: localStorage.getItem('authorizationValue')
          }
        })
        .then((res) => {
          setName(res?.data?.data?.name);
          setRate(res?.data?.data?.rate);
          setType(res?.data?.data?.type);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return () => {
      abortController.abort();
    };
  }, []);
  const submitForm = (e) => {
    e.preventDefault();
    axiosInstance
      .patch(`/taxes/${id}?company_id=${companyID}`, {
        company_id: Number(companyID),
        name,
        rate,
        type,
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
            id="rate-input"
            name="rate"
            label="Rate"
            type="text"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
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

UpdateTax.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default UpdateTax;
