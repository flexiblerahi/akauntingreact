import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
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

function CreateGroup(props) {
  const { classes, companyID } = props;
  const [openCategory, setOpenCategory] = useState(false);
  const [name, setName] = useState('');
  const [dataState, setDataState] = useState({
    taxes: 1,
    unit: 'Units',
    categories: 1
  });
  const [description, setDescription] = useState('');
  const [inputFields, setInputFields] = useState([{}]);

  const categories = useSelector((state) => state.categories.categories);
  const taxes = useSelector((state) => state.taxes.taxes);
  const unit = [
    {
      name: 'Box'
    },
    {
      name: 'Dozen'
    },
    {
      name: 'Grams'
    },
    {
      name: 'Kilograms'
    },
    {
      name: 'Liters'
    },
    {
      name: 'Meters'
    },
    {
      name: 'Pairs'
    },
    {
      name: 'Pieces'
    },
    {
      name: 'Tablets'
    },
    {
      name: 'Units'
    },
  ];
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
  function handleClickCategoryOpen() {
    setOpenCategory(true);
  }

  function handleCategoryClose() {
    setOpenCategory(false);
  }
  const submitForm = (e) => {
    e.preventDefault();
    axiosInstance
      .post('/item-groups/', {
        company_id: Number(companyID),
        name,
        category_id: dataState.categories,
        items: inputFields,
        description,
        unit: dataState.unit,
        'tax_ids[0]': dataState.taxes,
        enabled: 1,
        type: 'product'
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
              New Group
            </h2>
            <span className="text-sm font-light text-black">
              General
            </span>
          </div>

          <hr />

          <form onSubmit={submitForm}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="name-simple">Name</InputLabel>
              <Input onChange={(e) => setName(e.target.value)} />
            </FormControl> <br />
            <FormControl className={classes.formControl}>
              <TextField
                id="outlined-select-currency"
                select
                label="Select"
                className={classes.textField}
                value={dataState.categories}
                onChange={(e) => setDataState({ ...dataState, categories: e.target.value })}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                helperText="Please select your category"
                margin="normal"
                variant="outlined"
              >
                {categories && categories.length > 0 && categories?.map(option => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
                <MenuItem>
                  <Button variant="outlined" color="primary" onClick={handleClickCategoryOpen}>
                    Add Category
                  </Button>
                </MenuItem>
              </TextField>
            </FormControl><br />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="name-simple">Description</InputLabel>
              <Input onChange={(e) => setDescription(e.target.value)} />
            </FormControl> <br />
            <TextField
              id="outlined-select-currency"
              select
              label="Select"
              className={classes.textField}
              value={dataState.taxes}
              onChange={(e) => setDataState({ ...dataState, taxes: e.target.value })}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Please select your taxes"
              margin="normal"
              variant="outlined"
            >
              {taxes && taxes.length > 0 && taxes?.map(option => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-currency"
              select
              label="Select"
              className={classes.textField}
              value={dataState.unit}
              onChange={(e) => setDataState({ ...dataState, unit: e.target.value })}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Please select your unit"
              margin="normal"
              variant="outlined"
            >
              {unit && unit.length > 0 && unit?.map(option => (
                <MenuItem key={option.name} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
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

            <Button type="submit" color="primary" className={classes.button}>
              Submit
            </Button>
          </form>
        </Grid>
      </Grid>
    </>
  );
}

CreateGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateGroup);
