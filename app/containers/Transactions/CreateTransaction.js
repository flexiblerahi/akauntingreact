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

function CreateTransaction(props) {
  const [number, setNumber] = useState('');
  const [type, setType] = useState('');
  const [currency, setCurrency] = useState('');
  const [currencyRate, setCurrencyRate] = useState('');
  const [paidAt, setPaidAt] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [account, setAccount] = useState('');
  const [contact, setContact] = useState('');

  const categories = useSelector((state) => state.categories.categories);
  const currencies = useSelector((state) => state.currencies.currencies);
  const accounts = useSelector((state) => state.accounts.accounts);

  const { classes, companyID } = props;
  const submitForm = (e) => {
    e.preventDefault();
    axiosInstance
      .post('/transactions/', {
        company_id: Number(companyID),
        number,
        type,
        currency_code: Number(currency),
        currency_rate: Number(currencyRate),
        paid_at: paidAt,
        payment_method: paymentMethod,
        amount,
        account_id: Number(account),
        category_id: Number(category),
        contact_id: Number(contact)
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
                <InputLabel htmlFor="name-simple">Transaction Number</InputLabel>
                <Input onChange={(e) => setNumber(e.target.value)} />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="name-simple">Type</InputLabel>
                <Input onChange={(e) => setType(e.target.value)} />
              </FormControl><br />
              <br></br>
              <FormControl className={classes.formControl}>
                <TextField
                  id="outlined-select-source-warehouse"
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
                  helperText="Please select currency"
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
                <InputLabel htmlFor="name-simple">Date</InputLabel>
                <Input type="date" onChange={(e) => setPaidAt(e.target.value)} />
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
                <TextField
                  id="outlined-select-destination-warehouse"
                  select
                  label="Select"
                  className={classes.textField}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Please select category"
                  margin="normal"
                  variant="outlined"
                >
                  {categories && categories.length > 0 && categories.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>

              <FormControl className={classes.formControl}>
                <TextField
                  id="outlined-select-destination-warehouse"
                  select
                  label="Select"
                  className={classes.textField}
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Please select account"
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
                <InputLabel htmlFor="name-simple">Contact ID</InputLabel>
                <Input onChange={(e) => setContact(e.target.value)} />
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

CreateTransaction.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateTransaction);
