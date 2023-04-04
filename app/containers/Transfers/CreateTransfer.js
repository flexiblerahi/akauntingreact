/* eslint-disable indent */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
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

function CreateTransfer(props) {
  const [fromCurrencyCode, setFromCurrencyCode] = useState();
  const [toCurrencyCode, setToCurrencyCode] = useState();
  const [fromAccountRate, setFromAccountRate] = useState();
  const [toAccountRate, setToAccountRate] = useState();
  const [fromAccountId, setFromAccountId] = useState();
  const [toAccountId, setToAccountId] = useState();
  const [currencyCode, setCurrencyCode] = useState('');
  const [currencyRate, setCurrencyRate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [amount, setAmount] = useState('');
  const [reference, setReference] = useState();

  const currencies = useSelector((state) => state.currencies.currencies);
  const accounts = useSelector((state) => state.accounts.accounts);

  const { classes, companyID } = props;
  const submitForm = (e) => {
    e.preventDefault();
    axiosInstance
      .post('/transfers/', {
        company_id: Number(companyID),
        from_currency_code: fromCurrencyCode,
        to_currency_code: toCurrencyCode,
        from_account_rate: Number(fromAccountRate),
        to_account_rate: Number(toAccountRate),
        from_account_id: fromAccountId,
        to_account_id: toAccountId,
        currency_code: currencyCode,
        currency_rate: Number(currencyRate),
        amount,
        payment_method: paymentMethod,
        reference
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
              New Transfer Order
            </h2>
            <span className="text-sm font-light text-black">
              General
            </span>
          </div>

          <hr />
          <form onSubmit={submitForm}>

            <div>
              <FormControl className={classes.formControl}>
                <TextField
                  id="outlined-select-source-warehouse"
                  select
                  label="Select"
                  className={classes.textField}
                  value={fromCurrencyCode}
                  onChange={(e) => setFromCurrencyCode(e.target.value)}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Select From Currency Code"
                  margin="normal"
                  variant="outlined"
                >
                  {currencies && currencies.length > 0 && currencies.map(option => (
                    <MenuItem key={option.id} value={option.code}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
              <FormControl className={classes.formControl}>
                <TextField
                  id="outlined-select-source-warehouse"
                  select
                  label="Select"
                  className={classes.textField}
                  value={toCurrencyCode}
                  onChange={(e) => setToCurrencyCode(e.target.value)}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Select To Currency Code"
                  margin="normal"
                  variant="outlined"
                >
                  {currencies && currencies.length > 0 && currencies.map(option => (
                    <MenuItem key={option.id} value={option.code}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="name-simple">From Account Rate</InputLabel>
                <Input onChange={(e) => setFromAccountRate(e.target.value)} />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="name-simple">To Account Rate</InputLabel>
                <Input onChange={(e) => setToAccountRate(e.target.value)} />
              </FormControl>
              <FormControl className={classes.formControl}>
                <TextField
                  id="outlined-select-source-warehouse"
                  select
                  label="Select"
                  className={classes.textField}
                  value={fromAccountId}
                  onChange={(e) => setFromAccountId(e.target.value)}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Select From Account"
                  margin="normal"
                  variant="outlined"
                >
                  {accounts && accounts.length > 0 && accounts.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
              <FormControl className={classes.formControl}>
                <TextField
                  id="outlined-select-source-warehouse"
                  select
                  label="Select"
                  className={classes.textField}
                  value={toAccountId}
                  onChange={(e) => setToAccountId(e.target.value)}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Select To Account"
                  margin="normal"
                  variant="outlined"
                >
                  {accounts && accounts.length > 0 && accounts.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
              <FormControl className={classes.formControl}>
                <TextField
                  id="outlined-select-source-warehouse"
                  select
                  label="Select"
                  className={classes.textField}
                  value={currencyCode}
                  onChange={(e) => setCurrencyCode(e.target.value)}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Select Currency Code"
                  margin="normal"
                  variant="outlined"
                >
                  {currencies && currencies.length > 0 && currencies.map(option => (
                    <MenuItem key={option.id} value={option.code}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="name-simple">Currency Rate</InputLabel>
                <Input onChange={(e) => setCurrencyRate(e.target.value)} />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="name-simple">Payment Method</InputLabel>
                <Input onChange={(e) => setPaymentMethod(e.target.value)} />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="name-simple">Amount</InputLabel>
                <Input onChange={(e) => setAmount(e.target.value)} />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="name-simple">Reference</InputLabel>
                <Input onChange={(e) => setReference(e.target.value)} />
              </FormControl>
            </div>

            <Button type="submit" color="primary" className={classes.button}>
              Submit
            </Button>
          </form>
        </Grid>
      </Grid>
    </>
  );
}

CreateTransfer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateTransfer);
