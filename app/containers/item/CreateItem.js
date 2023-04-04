/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';
import axiosInstance from '../../services/axiosInstance';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    menu: {
        width: 200,
    },
});

function CreateItem(props) {
    const { classes, companyID } = props;
    const [dataState, setDataState] = useState({
        categories: 1,
        taxes: 1
    });
    const [warehouseId, setWarehouseId] = useState();
    const [isChecked, setIsChecked] = useState(false);
    const [inputFields, setInputFields] = useState([
        { warehouse_id: 0, opening_stock: 0, reorder_level: 0 }
    ]);

    const categories = useSelector((state) => state.categories.categories);
    const taxes = useSelector((state) => state.taxes.taxes);
    const warehouses = useSelector((state) => state.warehouses.warehouses);

    const handleWarehouseChange = (event, index, objIdx) => {
        const itemsList = [...inputFields];
        if (objIdx === 0) { itemsList[index].warehouse_id = event.target.value; } else if (objIdx === 1) { itemsList[index].opening_stock = event.target.value; } else { itemsList[index].reorder_level = event.target.value; }
        setInputFields(itemsList);
    };
    const addFields = () => {
        const newfield = { warehouse_id: 0, opening_stock: 0, reorder_level: 0 };
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
            .post('/items', {
                company_id: Number(companyID),
                name: dataState.generalName,
                description: dataState.description,
                sale_price: dataState.salePrice,
                purchase_price: dataState.purchasePrice,
                category_id: dataState.categories,
                'tax_ids[0]': dataState.taxes,
                type: 'product',
                items: inputFields,
                sku: dataState.sku
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

    const handleChange = name => event => {
        setDataState({
            ...dataState,
            [name]: name === 'salePrice' || name === 'purchasePrice' ? Number(event.target.value) : event.target.value
        });
    };
    const [openCategory, setOpenCategory] = React.useState(false);

    function handleClickCategoryOpen() {
        setOpenCategory(true);
    }

    function handleCategoryClose() {
        setOpenCategory(false);
    }
    const [openTaxes, setOpenTaxes] = React.useState(false);

    function handleClickTaxesOpen() {
        setOpenTaxes(true);
    }

    function handleTaxesClose() {
        setOpenTaxes(false);
    }

    const handleOnChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <>
            <div className="border-b-2 border-gray-200  pb-4">
                <h2 className="lg:text-lg font-medium text-black">
                    General
                </h2>
                <span className="text-sm font-light text-black">
                    Select a category to make your reports more detailed. The description will be populated when the item is selected in an invoice or bill.
                </span>
            </div>

            <form onSubmit={submitForm}>
                <div>
                    <TextField
                        id="outlined-name"
                        label="Name"
                        className={classes.textField}
                        onChange={handleChange('generalName')}
                        margin="normal"
                        variant="outlined"
                    /></div>
                <div>
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Select"
                        className={classes.textField}
                        value={dataState.categories}
                        onChange={handleChange('categories')}
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
                    </TextField></div>
                <div>
                    <TextField
                        id="outlined-description"
                        label="Description"
                        className={classes.textField}
                        onChange={handleChange('description')}
                        margin="normal"
                        variant="outlined"
                    /></div>
                <div className="border-b-2 border-gray-200  pb-4">
                    <h2 className="lg:text-lg font-medium text-black">
                        Billing
                    </h2>
                    <span className="text-sm font-light text-black">
                        Sale Information is used within invoices, and Purchase Information is used within bills. Tax will be applied to both invoices and bills.                    </span>
                </div>
                <div>
                    <TextField
                        id="outlined-name"
                        label="Name"
                        className={classes.textField}
                        onChange={handleChange('billingName')}
                        margin="normal"
                        variant="outlined"
                    /></div>
                <div>
                    <TextField
                        id="outlined-purchase-price"
                        label="Purchase Price"
                        className={classes.textField}
                        onChange={handleChange('purchasePrice')}
                        margin="normal"
                        variant="outlined"
                        inputProps={{ inputMode: 'numeric' }}
                    />
                    <TextField
                        id="outlined-sale-price"
                        label="Sale Price"
                        className={classes.textField}
                        onChange={handleChange('salePrice')}
                        margin="normal"
                        variant="outlined"
                        inputProps={{ inputMode: 'numeric' }}
                    /></div>
                <div>
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Select"
                        className={classes.textField}
                        value={dataState.taxes}
                        onChange={handleChange('taxes')}
                        SelectProps={{
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        helperText="Please select your tax"
                        margin="normal"
                        variant="outlined"
                    >
                        {taxes && taxes.length > 0 && taxes.map(option => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                        <MenuItem>
                            <Button variant="outlined" color="primary" onClick={handleClickTaxesOpen}>
                                Add Taxes
                            </Button>
                        </MenuItem>
                    </TextField>
                </div>

                <div className="border-b-2 border-gray-200  pb-4">
                    <h2 className="lg:text-lg font-medium text-black">
                        Inventory
                    </h2>
                    <span className="text-sm font-light text-black">
                        Accounting and inventory management under one roof
                    </span>
                </div>

                <div style={{ display: 'flex', gap: '60px' }}>
                    <div className="returnable-item">
                        <input type="checkbox" id="returnable-item" name="returnable-item" value="returnable-item" />Returnable Item
                    </div>
                    <div className="track-inventory">
                        <input type="checkbox" id="track-inventory" name="track-inventory" value="track-inventory" checked={isChecked}
                            onChange={handleOnChange} />Track Inventory
                    </div>
                </div>
                {
                    isChecked
                        ? <>
                            <div>
                                <TextField
                                    id="outlined-name"
                                    label="SKU"
                                    className={classes.textField}
                                    onChange={handleChange('sku')}
                                    margin="normal"
                                    variant="outlined"
                                /></div>
                        </> : null
                }
                {
                    isChecked
                        ? <>
                            {inputFields.map((input, index) => (
                                <div key={index} style={{ display: 'flex', gap: '60px' }}>
                                    <TextField
                                        id="outlined-select-warehouse"
                                        select
                                        label="Select"
                                        className={classes.textField}
                                        value={warehouseId}
                                        onChange={(e) => handleWarehouseChange(e, index, 2)}
                                        SelectProps={{
                                            MenuProps: {
                                                className: classes.menu,
                                            },
                                        }}
                                        helperText="Please select your warehouse"
                                        margin="normal"
                                        variant="outlined"
                                    >
                                        {warehouses && warehouses.length > 0 && warehouses.map(option => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                        {/* <MenuItem>
                                        <Button variant="outlined" color="primary" onClick={handleClickWarehouseOpen}>
                                            Add Warehouse
                                        </Button>
                                    </MenuItem> */}
                                    </TextField>
                                    <div>
                                        <TextField
                                            id="outlined-name"
                                            label="Opening Stock"
                                            className={classes.textField}
                                            onChange={(e) => handleWarehouseChange(e, index, 1)}
                                            margin="normal"
                                            variant="outlined"
                                        /></div>
                                    <div>
                                        <TextField
                                            id="outlined-name"
                                            label="Reorder Level"
                                            className={classes.textField}
                                            onChange={(e) => handleWarehouseChange(e, index, 2)}
                                            margin="normal"
                                            variant="outlined"
                                        /></div>
                                    <Button className={classes.button} onClick={() => removeFields(index)}>
                                        <Icon>delete</Icon>
                                    </Button>
                                </div>
                            ))}
                            <Button color="primary" className={classes.button} onClick={addFields}>
                                Add a Warehouse
                            </Button>
                        </> : null
                }
                <Button type="submit" color="primary" className={classes.button}>
                    Save
                </Button>
            </form>

            <Dialog
                open={openCategory}
                onClose={handleCategoryClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Add Category'}
                </DialogTitle>
                <form>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <TextField
                                id="outlined-name"
                                label="Name"
                                className={classes.textField}
                                onChange={handleChange('name')}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                id="outlined-name"
                                label="Color"
                                className={classes.textField}
                                onChange={handleChange('name')}
                                margin="normal"
                                variant="outlined"
                            />
                        </DialogContentText>
                        <DialogActions>
                            <Button onClick={handleCategoryClose} color="primary">
                                Close
                            </Button>
                            <Button color="primary" autoFocus>
                                Submit
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </form>
            </Dialog>
            <Dialog
                open={openTaxes}
                onClose={handleTaxesClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Add Taxes'}
                </DialogTitle>
                <form>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">

                            <TextField
                                id="outlined-name"
                                label="Name"
                                className={classes.textField}
                                onChange={handleChange('name')}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                id="outlined-name"
                                label="Rate"
                                className={classes.textField}
                                onChange={handleChange('name')}
                                margin="normal"
                                variant="outlined"
                            />
                        </DialogContentText>
                        <DialogActions>
                            <Button onClick={handleTaxesClose} color="primary">
                                Close
                            </Button>
                            <Button color="primary" autoFocus>
                                Submit
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    );
}

CreateItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateItem);
