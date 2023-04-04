/* eslint-disable indent */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axiosInstance from '../../services/axiosInstance';

const styles = theme => ({
    demo: {
        height: 'auto',
    },
    divider: {
        margin: `${theme.spacing(3)}px 0`,
    },
    input: {
        margin: theme.spacing(3),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(3),
    },
});

function UpdateAccount(props) {
    const { companyID } = props;
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [currency, setCurrency] = useState('');
    const [openingBalance, setOpeningBalance] = useState('');
    const [bankName, setBankName] = useState('');
    const [bankNumber, setBankNumber] = useState('');
    const [address, setAddress] = useState('');
    const { classes } = props;
    const { id } = useParams();
    const currencies = useSelector((state) => state.currencies.currencies);
    const submitForm = (e) => {
        e.preventDefault();
        axiosInstance
            .patch(`/accounts/${id}?company_id=${companyID}`, {
                name,
                number,
                currency_code: currency,
                opening_balance: openingBalance,
                bank_name: bankName,
                bank_phone: bankNumber,
                bank_address: address,
                type: 'bank',
                enabled: 1,
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
        <>
            <Grid
                container
                alignItems="center"
                justifyContent="flex-start"
                direction="row"
                spacing={2}
            >
                <Grid
                    item
                    md={6}
                    className={classes.demo}
                >
                    <div className="border-b-2 border-gray-200  pb-4">
                        <h2 className="lg:text-lg font-medium text-black">
                            General
                        </h2>
                        <span className="text-sm font-light text-black">
                            Select a category to make your reports more detailed. The description will be populated when the item is selected in an invoice or bill.
                        </span>
                    </div>

                    <hr />

                    <form onSubmit={submitForm}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="name-simple">Name</InputLabel>
                            <Input onChange={(e) => setName(e.target.value)} />
                        </FormControl> <br />
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="name-simple">Number</InputLabel>
                            <Input onChange={(e) => setNumber(e.target.value)} />
                        </FormControl><br />
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Select"
                            className={classes.textField}
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            SelectProps={{
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}
                            helperText="Please select your currency"
                            margin="normal"
                            variant="outlined"
                        >
                            {currencies && currencies.length > 0 && currencies.map(option => (
                                <MenuItem key={option.code} value={option.code}>
                                    {option.symbol}
                                </MenuItem>
                            ))}
                        </TextField>
                        <br />
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="name-simple">Opening Balance</InputLabel>
                            <Input onChange={(e) => setOpeningBalance(e.target.value)} />
                        </FormControl>

                        <div className="border-b-2 border-gray-200  pb-4">
                            <h2 className="lg:text-lg font-medium text-black">
                                Bank
                            </h2>
                            <span className="text-sm font-light text-black">
                                You may have multiple bank accounts in more than one banks. Recording information about your bank will make it easier to match the transactions within your bank.
                            </span>
                        </div>
                        <hr />

                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="name-simple">Bank Name</InputLabel>
                            <Input onChange={(e) => setBankName(e.target.value)} />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="name-simple">Bank Number</InputLabel>
                            <Input onChange={(e) => setBankNumber(e.target.value)} />
                        </FormControl><br />
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="name-simple">Bank Address</InputLabel>
                            <Input onChange={(e) => setAddress(e.target.value)} />
                        </FormControl>
                        <br />

                        <Button type="submit" color="primary" className={classes.button}>
                            Submit
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </>
    );
}

UpdateAccount.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpdateAccount);
