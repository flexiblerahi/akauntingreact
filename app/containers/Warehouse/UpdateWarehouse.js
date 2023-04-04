/* eslint-disable indent */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
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

function UpdateWarehouse(props) {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const { classes, companyID } = props;
    const submitForm = (e) => {
        e.preventDefault();
        axiosInstance
            .patch(`/warehouses/${id}`, {
                name,
                email,
                phone,
                city,
                zip_code: zipCode,
                state,
                country,
                address,
                description,
                enabled: 1,
                default_warehouse: 1
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
                            New Warehouse
                        </h2>
                        <h5>General</h5>
                    </div>

                    <hr />

                    <form onSubmit={submitForm}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="name-simple">Name</InputLabel>
                            <Input onChange={(e) => setName(e.target.value)} />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="name-simple">Email</InputLabel>
                            <Input onChange={(e) => setEmail(e.target.value)} />
                        </FormControl><br />
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="name-simple">Phone</InputLabel>
                            <Input onChange={(e) => setPhone(e.target.value)} />
                        </FormControl> <br />
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="name-simple">Address</InputLabel>
                            <Input onChange={(e) => setAddress(e.target.value)} />
                        </FormControl>
                        <br />
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="name-simple">Town / City</InputLabel>
                            <Input onChange={(e) => setCity(e.target.value)} />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="name-simple">postal / Zip code</InputLabel>
                            <Input onChange={(e) => setZipCode(e.target.value)} />
                        </FormControl><br />
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="name-simple">Province / State</InputLabel>
                            <Input onChange={(e) => setState(e.target.value)} />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="name-simple">Country</InputLabel>
                            <Input onChange={(e) => setCountry(e.target.value)} />
                        </FormControl>
                        <br />
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="name-simple">Description</InputLabel>
                            <Input onChange={(e) => setDescription(e.target.value)} />
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

UpdateWarehouse.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpdateWarehouse);
