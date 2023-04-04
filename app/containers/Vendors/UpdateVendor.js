/* eslint-disable indent */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
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

function UpdateVendor(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [taxNumber, setTaxNumber] = useState('');
  const [currencyCode, setCurrencyCode] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [reference, setReference] = useState('');

  const currencies = useSelector((state) => state.currencies.currencies);

  const { classes, companyID } = props;

  const { id } = useParams();

  const submitForm = (e) => {
    e.preventDefault();
    axiosInstance
      .patch(`/contacts/${id}`, {
        company_id: Number(companyID),
        name,
        email,
        tax_number: taxNumber,
        currency_code: currencyCode,
        phone,
        website,
        address,
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
                <InputLabel htmlFor="name-simple">Name</InputLabel>
                <Input onChange={(e) => setName(e.target.value)} />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="name-simple">Email</InputLabel>
                <Input onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="name-simple">Tax Number</InputLabel>
                <Input onChange={(e) => setTaxNumber(e.target.value)} />
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
                  helperText="Please Select Currency"
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
                <InputLabel htmlFor="name-simple">Phone</InputLabel>
                <Input onChange={(e) => setPhone(e.target.value)} />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="name-simple">Website</InputLabel>
                <Input onChange={(e) => setWebsite(e.target.value)} />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="name-simple">Address</InputLabel>
                <Input onChange={(e) => setAddress(e.target.value)} />
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

UpdateVendor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpdateVendor);
