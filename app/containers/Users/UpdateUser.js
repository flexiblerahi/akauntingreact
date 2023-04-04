/* eslint-disable indent */
/* eslint-disable quotes */
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import axiosInstance from "../../services/axiosInstance";

function UpdateUser(props) {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currencyCode, setCurrencyCode] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [type, setType] = useState('');
  const [city, setCity] = useState('');
  const [postCode, setPostCode] = useState('');
  const [country, setCountry] = useState('');
  const [company, setCompany] = useState();
  const [role, setRole] = useState('');
  const { classes, companyID } = props;
  // const handleItemChange = (event, index) => {
  //   const itemsList = [...companyFields];
  //   itemsList[index] = event.target.value;
  //   setCompanyFields(itemsList);
  // };
  // const addFields = () => {
  //   setCompanyFields([...companyFields, '']);
  // };
  // const removeFields = (index) => {
  //   const data = [...companyFields];
  //   data.splice(index, 1);
  //   setCompanyFields(data);
  // };
  const submitForm = (e) => {
    e.preventDefault();
    axiosInstance
      .patch(`/users/${id}?company_id=${companyID}`, {
        company_id: Number(companyID),
        search: 'type:users',
        name,
        email,
        currency_code: currencyCode,
        phone,
        address,
        type,
        city,
        post_code: postCode,
        country,
        companies: company,
        roles: role,
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
        </Grid>
        <Grid item>
          <TextField fullWidth
            id="email-input"
            name="email"
            label="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField fullWidth
            id="currency-input"
            name="currency"
            label="Currency"
            type="text"
            value={currencyCode}
            onChange={(e) => setCurrencyCode(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField fullWidth
            id="phone-input"
            name="phone"
            label="Phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField fullWidth
            id="address-input"
            name="address"
            label="Address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField fullWidth
            id="type-input"
            name="type"
            label="Type"
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField fullWidth
            id="city-input"
            name="city"
            label="City"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField fullWidth
            id="post-code-input"
            name="post-code"
            label="Post-code"
            type="text"
            value={postCode}
            onChange={(e) => setPostCode(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField fullWidth
            id="country-input"
            name="country"
            label="Country"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField fullWidth
            id="company-input"
            name="company"
            label="Company"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField fullWidth
            id="role-input"
            name="role"
            label="Role"
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </Grid>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Grid>
    </form >
  );
}

UpdateUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default UpdateUser;
