/* eslint-disable indent */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
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

function UpdateTransferOrder(props) {
  const [transferOrder, setTransferOrder] = useState('');
  const [transferOrderNumber, setTransferOrderNumber] = useState('');
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const [sourceWarehouse, setSourceWarehouse] = useState('');
  const [destinationWarehouse, setDestinationWarehouse] = useState('');
  const [inputFields, setInputFields] = useState([{}]);

  const warehouses = useSelector((state) => state.warehouses.warehouses);

  const { classes, companyID } = props;

  const { id } = useParams();

  const submitForm = (e) => {
    e.preventDefault();
    axiosInstance
      .patch(`/transfer-orders/${id}`, {
        company_id: Number(companyID),
        transfer_order: transferOrder,
        transfer_order_number: transferOrderNumber,
        date,
        reason,
        source_warehouse_id: sourceWarehouse,
        destination_warehouse_id: destinationWarehouse,
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
                <InputLabel htmlFor="name-simple">Transfer Order</InputLabel>
                <Input onChange={(e) => setTransferOrder(e.target.value)} />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="name-simple">Transfer Order Number</InputLabel>
                <Input onChange={(e) => setTransferOrderNumber(e.target.value)} />
              </FormControl><br />
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="name-simple">Reason</InputLabel>
                <Input onChange={(e) => setReason(e.target.value)} />
              </FormControl>
              <FormControl className={classes.formControl}>
                <Input type="date" onChange={(e) => setDate(e.target.value)} />
              </FormControl>
              <br></br>
              <FormControl className={classes.formControl}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select"
                  className={classes.textField}
                  value={sourceWarehouse}
                  onChange={(e) => setSourceWarehouse(e.target.value)}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Please select source warehouse"
                  margin="normal"
                  variant="outlined"
                >
                  {warehouses && warehouses.length > 0 && warehouses.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
              <FormControl className={classes.formControl}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select"
                  className={classes.textField}
                  value={destinationWarehouse}
                  onChange={(e) => setDestinationWarehouse(e.target.value)}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Please select destination warehouse"
                  margin="normal"
                  variant="outlined"
                >
                  {warehouses && warehouses.length > 0 && warehouses.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>

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

UpdateTransferOrder.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpdateTransferOrder);
