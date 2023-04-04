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

function CreateBill(props) {
  const [documentNumber, setDocumentNumber] = useState('');
  const [status, setStatus] = useState('');
  const [issuedAt, setIssuedAt] = useState('');
  const [dueAt, setDueAt] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [accountId, setAccountId] = useState('');
  const [currencyCode, setCurrencyCode] = useState('');
  const [currencyRate, setCurrencyRate] = useState('');
  const [notes, setNotes] = useState('');
  const [contactId, setContactId] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactAddress, setContactAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');

  const [inputFields, setInputFields] = useState([{}]);

  const categories = useSelector((state) => state.categories.categories);
  const currencies = useSelector((state) => state.currencies.currencies);
  const accounts = useSelector((state) => state.accounts.accounts);

  const { classes, companyID } = props;
  const submitForm = (e) => {
    e.preventDefault();
    axiosInstance
      .post('/documents/', {
        company_id: Number(companyID),
        category_id: categoryId,
        document_number: documentNumber,
        status,
        issued_at: issuedAt,
        due_at: dueAt,
        account_id: accountId,
        currency_code: currencyCode,
        currency_rate: currencyRate,
        notes,
        contact_id: contactId,
        contact_name: contactName,
        contact_email: contactEmail,
        contact_address: contactAddress,
        amount,
        type,
        search: 'type:bill',
        items: inputFields,
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
  const handleItemNameChange = (event, index) => {
    const itemsList = [...inputFields];
    itemsList[index] = {};
    itemsList[index][event.target.value] = '';
    setInputFields(itemsList);
  };
  const handleItemValueChange = (event, index) => {
    const itemsList = [...inputFields];
    const key = Object.keys(itemsList[index])[0];
    itemsList[index][key] = event.target.value;
    setInputFields(itemsList);
  };
  const addFields = () => {
    const newfield = {};
    setInputFields([...inputFields, newfield]);
  };
  const removeFields = (index) => {
    const data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
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
                <InputLabel htmlFor="name-simple">Document Number</InputLabel>
                <Input onChange={(e) => setDocumentNumber(e.target.value)} />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="name-simple">Status</InputLabel>
                <Input onChange={(e) => setStatus(e.target.value)} />
              </FormControl><br />
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="name-simple">Issued At</InputLabel>
                <Input type="date" onChange={(e) => setIssuedAt(e.target.value)} />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="name-simple">Due At</InputLabel>
                <Input type="date" onChange={(e) => setDueAt(e.target.value)} />
              </FormControl>
              <br></br>
              <FormControl className={classes.formControl}>
                <TextField
                  id="outlined-select-source-warehouse"
                  select
                  label="Select"
                  className={classes.textField}
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
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
                  value={accountId}
                  onChange={(e) => setAccountId(e.target.value)}
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
                <TextField
                  id="outlined-select-destination-warehouse"
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
                  helperText="Please select account"
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
                <InputLabel htmlFor="name-simple">Notes</InputLabel>
                <Input onChange={(e) => setNotes(e.target.value)} />
              </FormControl><br />

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="name-simple">Type</InputLabel>
                <Input onChange={(e) => setType(e.target.value)} />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="name-simple">Amount</InputLabel>
                <Input onChange={(e) => setAmount(e.target.value)} />
              </FormControl><br />

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="name-simple">Contact Id</InputLabel>
                <Input onChange={(e) => setContactId(e.target.value)} />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="name-simple">Contact Name</InputLabel>
                <Input onChange={(e) => setContactName(e.target.value)} />
              </FormControl><br />

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="name-simple">Contact Email</InputLabel>
                <Input onChange={(e) => setContactEmail(e.target.value)} />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="name-simple">Contact Address</InputLabel>
                <Input onChange={(e) => setContactAddress(e.target.value)} />
              </FormControl><br />

              <div className="border-b-2 border-gray-200  pb-4">
                <h2 className="lg:text-lg font-medium text-black">
                  Variants
                </h2>
              </div>

              <hr />

              {inputFields.map((input, index) => (
                <div key={index}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="name-simple">Name</InputLabel>
                    <Input onChange={(e) => handleItemNameChange(e, index)} />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="name-simple">Values</InputLabel>
                    <Input onChange={(e) => handleItemValueChange(e, index)} />
                  </FormControl>
                  <Button className={classes.button} onClick={() => removeFields(index)}>
                    <Icon>delete</Icon>
                  </Button>
                </div>
              ))}
              <Button color="primary" className={classes.button} onClick={addFields}>
                Add a Value
              </Button> <br />

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

CreateBill.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateBill);
