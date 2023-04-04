import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
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

function UpdateVariant(props) {
  const { id } = useParams();
  const [name, setName] = useState('');
  const { classes, companyID } = props;
  const [inputFields, setInputFields] = useState([
    { name: '' }
  ]);
  const handleNameChange = event => {
    setName(event.target.value);
  };
  const handleItemChange = (event, index) => {
    const itemsList = [...inputFields];
    itemsList[index].name = event.target.value;
    setInputFields(itemsList);
  };
  const addFields = () => {
    const newfield = { name: '' };
    setInputFields([...inputFields, newfield]);
  };
  const removeFields = (index) => {
    const data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };
  const submitForm = (e) => {
    e.preventDefault();
    axiosInstance
      .patch(`/variants/${id}`, {
        company_id: Number(companyID),
        name,
        items: inputFields,
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
              New Variant
            </h2>
            <span className="text-sm font-light text-black">
              General
            </span>
          </div>

          <hr />

          <form onSubmit={submitForm}>

            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="name-simple">Name</InputLabel>
              <Input onChange={handleNameChange} />
            </FormControl>

            <div className="border-b-2 border-gray-200  pb-4">
              <h2 className="lg:text-lg font-medium text-black">
                Values
              </h2>
            </div>
            <hr />
            {inputFields.map((input, index) => (
              <div key={index}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="name-simple">Name</InputLabel>
                  <Input onChange={(e) => handleItemChange(e, index)} />
                </FormControl>
                <Button className={classes.button} onClick={() => removeFields(index)}>
                  <Icon>delete</Icon>
                </Button>
              </div>
            ))}
            <br />
            <Button color="primary" className={classes.button} onClick={addFields}>
              Add a Value
            </Button> <br />

            <Button type="submit" color="secondary" className={classes.button}>
              Submit
            </Button>
          </form>
        </Grid>
      </Grid>
    </>
  );
}

UpdateVariant.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpdateVariant);
