/* eslint-disable indent */
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import axiosInstance from '../../services/axiosInstance';

function CreateCurrencies(props) {
    const [name, setName] = useState('');
    const [rate, setRate] = useState('');
    const [symbol, setSymbol] = useState('');
    const [decimalMark, setDecimalMark] = useState('');
    const [thousandSeperator, setThousandSeperator] = useState('');
    const [code, setCode] = useState('');
    const [symbolFirst, setSymbolFirst] = useState('');
    const [precision, setPrecision] = useState('');
    const { classes, companyID } = props;
    const submitForm = (e) => {
        e.preventDefault();
        axiosInstance
            .post(`/currency?company_id=${companyID}`, {
                company_id: Number(companyID),
                name,
                rate,
                symbol,
                code,
                symbol_first: symbolFirst,
                precision,
                decimal_mark: precision,
                thousands_separator: thousandSeperator,
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
                        id="code-input"
                        name=" code"
                        label="Code"
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <TextField fullWidth
                        id="rate-input"
                        name="rate"
                        label="Rate"
                        type="text"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                    />
                    <TextField fullWidth
                        id="symbol-first-input"
                        name="symbol-first"
                        label="Symbol-first"
                        type="text"
                        value={symbolFirst}
                        onChange={(e) => setSymbolFirst(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <TextField fullWidth
                        id="symbol-input"
                        name="symbol"
                        label="Symbol"
                        type="text"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                    />
                    <TextField fullWidth
                        id="precision-input"
                        name="precision"
                        label="precision"
                        type="text"
                        value={precision}
                        onChange={(e) => setPrecision(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <TextField fullWidth
                        id="decimel-input"
                        name="decimel"
                        label="Decimel Mark"
                        type="text"
                        value={decimalMark}
                        onChange={(e) => setDecimalMark(e.target.value)}
                    />

                    <TextField fullWidth
                        id="thousand-separator-input"
                        name="thousand-separator"
                        label="Thousand Separator"
                        type="text"
                        value={thousandSeperator}
                        onChange={(e) => setThousandSeperator(e.target.value)}
                    />
                </Grid>
                <Button variant="contained" color="primary" type="submit">
                    Submit
                </Button>
            </Grid>
        </form>
    );
}

CreateCurrencies.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default CreateCurrencies;
