import React, { useEffect, useState } from 'react';
import {
    createTheme,
    MuiThemeProvider,
    withStyles, makeStyles
} from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import { Link } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import axiosInstance from '../../services/axiosInstance';
import { getCategories, } from '../../redux/slice/categoriesSlice';
import { getWarehouses } from '../../redux/slice/warehouseSlice';
import { getItems } from '../../redux/slice/itemsSlice';
import { getTaxes } from '../../redux/slice/taxesSlice';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Box, Grid, MenuItem, Paper, Select, TextField, Toolbar, Typography } from '@material-ui/core';
import ItemCarousel from './details/ItemCarousel';
import AddIcon from '@material-ui/icons/Add';
import FormControl from '@material-ui/core/FormControl';
import { Clear, FileCopy, Print } from '@material-ui/icons';
import { connect } from 'react-redux';
import { closeRightSidebar, openRightSidebar } from 'enl-redux/actions/uiActions';
import { bindActionCreators } from 'redux';

const typographyTheme = createTheme({
    typography: {
        subtitle1: {
            fontSize: '14px',
        },
        body1: {
            fontWeight: 500,
        },
        button: {
            fontStyle: 'italic',
        },
    },
});


const styles = theme => ({
    '@global': {
        '*::-webkit-scrollbar': {
            width: '5px'
        },
        '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)'
        }
    },
    table: {
        '& > div': {
            overflow: 'auto'
        },
        '& table': {
            '& td': {
                wordBreak: 'keep-all'
            },
            [theme.breakpoints.down('md')]: {
                '& td': {
                    height: 60,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }
            }
        }
    }
});



const theme = createTheme();

theme.typography.customFont = {
    fontSize: '0.875rem',
    color: '#58698d',
    '@media (min-width:600px)': {
        fontSize: '0.875rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '1.5rem',
    },
};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        position: "fixed",
        height: "80vh",
        overflow: "hidden"
    },
    tableOpen: {
        border: '1px solid rgb(0,0,0,0.2)',
        height: '80vh',
        overflowY: 'scroll',
        "@media (min-width: 1401px)": {
            width: '1500px'
        },
        "@media (max-width: 1400px)": {
            width: '1200px'
        },
        "@media (max-width: 800px)": {
            width: '600px'
        },
        "@media (max-width: 500px)": {
            width: '300px'
        }
    },
    tableClose: {
        border: '1px solid rgb(0,0,0,0.2)',
        height: '80vh',
        overflowY: 'scroll',
        "@media (min-width: 1401px)": {
            width: '500px'
        },
        "@media (max-width: 1400px)": {
            width: '300px'
        },
        "@media (max-width: 800px)": {
            width: '300px'
        },
        "@media (max-width: 500px)": {
            width: '0'
        }
    },
    drawerOpen: {
        marginRight: '0',
        position: 'relative',
        boxShadow: '0 0 10px rgb(0,0,0, 0.2)',
    },
    drawerClose: {
        marginRight: '-900px',
        boxShadow: '0 0 10px rgb(0,0,0, 0.2)',
    },
    handleDrawer: {
        position: 'absolute',
        boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 50%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
        left: '-10px',
        background: 'white',
        overflow: "visible",
        borderRadius: '50%',
        zIndex: '11111'
    },
    MuiPaper: {
        root: {
            padding: '0 20px',
        }
    },
    title: {
        flexGrow: 1,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 800,
    },
    textFieldName: {
        backgroundColor: '#F2F6FA'
    },
    input: {
        color: "white"
    },
    itemName: {
        fontFamily: 'sans-serif',
        fontSize: '14px',
        fontWeight: '900',
        letterSpacing: 'normal',
        color: 'rgb(74, 74, 74)',
        textShadow: 'rgb(0 0 0 / 0%) 1px 1px 1px',
        whiteSpace: 'nowrap',
    },
    columnText: {
        fontFamily: 'sans-serif',
        fontSize: '12px',
        fontWeight: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        color: 'rgb(96, 96, 96)',
        textShadow: 'rgb(0 0 0 / 0%) 1px 1px 1px',
        whiteSpace: 'nowrap'
    }
}));
function CreateItemDrawer({ props }) {
    const customClasses = useStyles();

    const {
        rightSidebar,
        companyID,
        closeRightDrawer,
        openRightDrawer,
    } = props;
    const [items, setItems] = useState([])
    const [category, setCategory] = useState([])
    const [item_id, setItemId] = useState('')

    const warehouses = useSelector((state) => state.warehouses.warehouses);

    const [inputFields, setInputFields] = useState([
        { warehouse_id: 0, opening_stock: 0, reorder_level: 0 }

    ]);
    const addFields = () => {
        const newfield = { warehouse_id: 0, opening_stock: 0, reorder_level: 0 };
        setInputFields([...inputFields, newfield]);
    };

    const removeFields = (index) => {
        const data = [...inputFields];
        data.splice(index, 1);
        setInputFields(data);
    };

    const [data, setData] = useState({
        'name': '',
        'type': '',
        'sku': '',
        'category': '',
        'description': '',
        'purchase_price': '',
        'sale_price': '',
        "total_stock": '',
        "items": {},
        "category_id": ''
    })

    return (
        <Paper>
            <Toolbar style={{
                padding: '10px 30px'
            }}>
                <Grid container spacing={2}>
                    <Grid item md={3}>
                        <Link to='/app/create/item/' style={{
                            color: '#58698d',
                            textDecoration: 'none'
                        }}>
                            <Box display='flex' width={'120px'}>
                                <AddIcon fontSize='small' />
                                <Typography style={{
                                    marginLeft: '2px',
                                    fontSize: '14px'
                                }}>   New
                                </Typography>
                            </Box>
                        </Link>
                    </Grid>
                    <Grid item md={3}>
                        <button style={{
                            color: '#58698d',
                            textDecoration: 'none',
                            backgroundColor: 'transparent',
                            padding: 0
                        }} onClick={handleCopy}>
                            <Box display='flex' width={'100px'}>
                                <FileCopy fontSize='small' />
                                <Typography style={{
                                    marginLeft: '2px',
                                    fontSize: '14px'
                                }}>   Copy
                                </Typography>
                            </Box>
                        </button>
                    </Grid>
                    <Grid item md={4}>
                        <Link to='/app/create/item/' style={{
                            color: '#58698d',
                            textDecoration: 'none'
                        }}>
                            <Box display='flex' width={'150px'}>
                                <Print fontSize='small' />
                                <Typography style={{
                                    marginLeft: '2px',
                                    fontSize: '14px'
                                }}>   Print barcode
                                </Typography>
                            </Box>
                        </Link>
                    </Grid>
                    <Grid item md={2}>
                        <Link to='/app/create/item/' style={{
                            color: '#58698d',
                            textDecoration: 'none'
                        }}>
                            <Box display='flex' width={'200px'}>
                                <Clear fontSize='small' />
                                <Typography style={{
                                    marginLeft: '2px',
                                    fontSize: '14px'
                                }}>   Deactivate
                                </Typography>
                            </Box>
                        </Link>
                    </Grid>
                </Grid>
                <Grid container justify="flex-end">
                    {update ? <><button onClick={handleUpdateCancel}>
                        Cancel
                    </button> <button style={{ 'background': 'linear-gradient(rgb(237, 166, 61) 0%, rgb(247, 200, 85) 100%)' }} onClick={handleUpdate}>
                            Save
                        </button> </> : <></>}
                </Grid>
            </Toolbar>
            <Box
                component="div"
                bgcolor={"rgb(203, 220, 235)"}
                sx={{
                    position: 'relative',
                    padding: '2px 0px 2px 50px',
                    paddingLeft: '50px'
                }}>
                <Typography className={customClasses.handleDrawer}>
                    <IconButton onClick={closeRightDrawer}>
                        <ChevronRightIcon fontSize='small' />
                    </IconButton>
                </Typography>
                <Divider />
                <TextField
                    className={customClasses.textFieldName}
                    value={data.name}
                    fullWidth
                    inputProps={{ style: { fontSize: 20, color: 'rgb(74,74,74)', padding: '5px' } }}
                    variant="outlined"
                    style={{ margin: '5px 0' }}
                    onChange={(e) => {
                        setData({
                            "name": e.target.value,
                            "category_id": data.category_id,
                            "type": data.type,
                            "sku": data.sku,
                            "description": data.description,
                            "purchase_price": data.purchase_price,
                            "sale_price": data.sale_price,
                            "items": data.items
                        })
                        setUpdate(true)
                    }}
                />
            </Box>
            <div style={{
                height: '60vh',
                width: '100%',
                overflowX: 'visible',
                overflowY: 'scroll'
            }}>
                <Box style={{
                    padding: '10px 30px'
                }}>
                    <Grid container spacing={2}>
                        <Grid item md={6}>
                            <Box sx={boxSX} display="flex" p={1} bgcolor="background.paper">
                                <Box sx={{
                                    fontWeight: 700
                                }} p={1} flexGrow={1} bgcolor="#F3F3F3">
                                    <Typography variant='customFont'>
                                        Product Type
                                    </Typography>
                                </Box>
                                <Box p={1} bgcolor="#F3F3F3">
                                    <Typography variant='customFont'>
                                        {data.type}
                                    </Typography>
                                </Box>
                            </Box>
                            <Divider></Divider>
                            <Box sx={boxSX} display="flex" p={1} bgcolor="background.paper">
                                <Box sx={{
                                    fontWeight: 700
                                }} p={1} flexGrow={1}>
                                    <Typography variant='customFont'>
                                        SKU
                                    </Typography>
                                </Box>
                                <Box p={1} bgcolor="#FFFFFF">
                                    <TextField
                                        value={data.sku}
                                        style={{ 'backgroundColor': 'white' }}
                                        inputProps={{
                                            style: { fontSize: textfieldfontSize, padding: '5px 10px' }
                                        }}
                                        onChange={(e) => {
                                            setData({
                                                "sku": e.target.value,
                                                "category_id": data.category_id,
                                                "type": data.type,
                                                "name": data.name,
                                                "description": data.description,
                                                "purchase_price": data.purchase_price,
                                                "sale_price": data.sale_price,
                                                "items": data.items
                                            })
                                            setUpdate(true)
                                        }}
                                    />
                                </Box>
                            </Box>
                            <Divider></Divider>
                            <Box sx={boxSX} display="flex" p={1} bgcolor="background.paper">
                                <Box sx={{
                                    fontWeight: 700
                                }} p={1} flexGrow={1}>
                                    <Typography variant='customFont'>
                                        Category
                                    </Typography>
                                </Box>
                                <Box p={1} bgcolor="#FFFFFF">
                                    <FormControl variant="outlined" className={customClasses.formControl}>
                                        <Select
                                            native
                                            value={data.category}
                                            onChange={(e) => {
                                                setData({
                                                    "category_id": e.target.value,
                                                    "name": data.name,
                                                    "type": data.type,
                                                    "sku": data.sku,
                                                    "description": data.description,
                                                    "purchase_price": data.purchase_price,
                                                    "sale_price": data.sale_price,
                                                    "items": data.items
                                                })
                                            }}
                                            inputProps={{
                                                name: 'category',
                                                style: {
                                                    'padding': '5px 20px'
                                                }
                                            }}
                                        >
                                            <option value={category.id} selected>{category.name}</option>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>
                            <Divider></Divider>
                            <Box sx={boxSX} display="flex" p={1} bgcolor="background.paper">
                                <Box sx={{
                                    fontWeight: 700
                                }} p={1} flexGrow={1}>
                                    <Typography variant='customFont'>
                                        Description
                                    </Typography>
                                </Box>
                                <Box p={1} bgcolor="#FFFFFF">
                                    <TextField
                                        value={data.description}
                                        style={{ 'backgroundColor': 'white' }}
                                        inputProps={{
                                            style: { fontSize: textfieldfontSize, padding: '5px 10px' }
                                        }}
                                        onChange={(e) => {
                                            setData({
                                                "description": e.target.value,
                                                "name": data.name,
                                                "type": data.type,
                                                "sku": data.sku,
                                                "category_id": data.category_id,
                                                "purchase_price": data.purchase_price,
                                                "sale_price": data.sale_price,
                                                "items": data.items
                                            })
                                            setUpdate(true)
                                        }}
                                    />
                                </Box>
                            </Box>
                            <Divider />
                            <Box bgcolor={"#F3F3F3"} boxShadow={3} p={1} marginTop={3}>
                                <Box sx={boxSX} display="flex" p={1}>
                                    <Box p={1} flexGrow={1}>
                                        <Typography variant='h6'>
                                            Pricing & Cost
                                        </Typography>
                                    </Box>
                                    <Box p={1}>
                                        <Typography>

                                        </Typography>
                                    </Box>
                                </Box>
                                <Divider />
                                <Box sx={boxHoverPrice} display="flex" p={1}>
                                    <Box sx={{
                                        fontWeight: 700
                                    }} p={1} flexGrow={1}>
                                        <Typography variant='customFont'>
                                            Purchase Price
                                        </Typography>
                                    </Box>
                                    <Box p={1}>
                                        <TextField
                                            value={data.purchase_price}
                                            style={{ 'backgroundColor': 'white' }}
                                            inputProps={{
                                                style: { fontSize: textfieldfontSize, padding: '5px 10px' }
                                            }}
                                            onChange={(e) => {
                                                setData({
                                                    "purchase_price": e.target.value,
                                                    "name": data.name,
                                                    "type": data.type,
                                                    "sku": data.sku,
                                                    "category_id": data.category_id,
                                                    "description": data.description,
                                                    "sale_price": data.sale_price,
                                                    "items": data.items
                                                })
                                                setUpdate(true)
                                            }}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={boxHoverPrice} display="flex" p={1}>
                                    <Box sx={{
                                        fontWeight: 700
                                    }} p={1} flexGrow={1}>
                                        <Typography variant='customFont'>
                                            Sale price
                                        </Typography>
                                    </Box>
                                    <Box p={1}>
                                        <TextField
                                            value={data.sale_price}
                                            style={{ 'backgroundColor': 'white' }}
                                            inputProps={{
                                                style: { fontSize: textfieldfontSize, padding: '5px 10px' }
                                            }}
                                            onChange={(e) => {
                                                setData({
                                                    "sale_price": e.target.value,
                                                    "name": data.name,
                                                    "type": data.type,
                                                    "sku": data.sku,
                                                    "category_id": data.category_id,
                                                    "description": data.description,
                                                    "purchase_price": data.purchase_price,
                                                    "items": data.items
                                                })
                                                setUpdate(true)
                                            }}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item md={6}>
                            <Box bgcolor={"#F3F3F3"} boxShadow={3} p={1}>
                                <ItemCarousel />
                            </Box>
                            <Box bgcolor={"#3172B0"} color='white' boxShadow={1} p={1}>
                                <Box p={1}>
                                    <Typography variant='h6'>
                                        Quantity in Hand
                                    </Typography>
                                </Box>
                                <Box p={1}>
                                    <Typography variant='h4'>
                                        {data.total_stock}
                                    </Typography>
                                </Box>
                                <Divider />
                                {items.length > 0 ?
                                    items?.map((item) => (
                                        <Box display="flex" p={1}>
                                            <Box sx={{
                                                fontWeight: 700
                                            }} p={1} flexGrow={1}>
                                                <Typography variant='customFont'>
                                                    Warehouse {item.warehouse_id}
                                                </Typography>
                                            </Box>
                                            <Box p={1}>
                                                <Typography variant='customFont'>
                                                    {item.opening_stock}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ))
                                    :
                                    <></>}
                                {inputFields.map((input, index) => (
                                    <div key={index} style={{ display: 'flex', gap: '10px' }}>
                                        <TextField
                                            select
                                            label="warehouse"
                                            value={input.warehouse_id}
                                            onChange={(e) => handleWarehouseChange(e, index, 2)}
                                            SelectProps={{
                                                MenuProps: {
                                                    className: classes.menu,
                                                },
                                                style: {
                                                    border: '1px solid #fff',
                                                    padding: '0 5px'
                                                },
                                            }}
                                            InputLabelProps={{
                                                style: {
                                                    color: '#fff',
                                                    fontSize: '10px'
                                                },
                                            }}
                                            variant="standard"
                                            style={{
                                                width: '30%',
                                            }}
                                        >
                                            {warehouses && warehouses.length > 0 && warehouses.map(option => (
                                                <MenuItem key={option.id} value={option.id}>
                                                    {option.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <div
                                            style={{
                                                width: '30%'
                                            }}>
                                            <TextField
                                                label="Opening Stock"
                                                onChange={(e) => handleWarehouseChange(e, index, 1)}
                                                value={input.opening_stock}
                                                variant="standard"
                                                InputProps={{
                                                    style: {
                                                        border: '1px solid #fff',
                                                        padding: '0',
                                                    },
                                                }}
                                                InputLabelProps={{
                                                    style: {
                                                        color: '#fff',
                                                        fontSize: '10px'
                                                    },
                                                }}
                                            /></div>
                                        <div
                                            style={{
                                                width: '30%'
                                            }}>
                                            <TextField
                                                label="Reorder Level"
                                                onChange={(e) => handleWarehouseChange(e, index, 2)}
                                                value={input.reorder_level}
                                                variant="standard"
                                                InputProps={{
                                                    style: {
                                                        border: '1px solid #fff',
                                                        padding: '0'
                                                    },
                                                }}
                                                InputLabelProps={{
                                                    style: {
                                                        color: '#fff',
                                                        fontSize: '10px'
                                                    },
                                                }}
                                            /></div>
                                        <button style={{
                                            marginTop: '30px',
                                            width: '10%',
                                            height: '25px',
                                            color: "white",
                                            padding: '0',
                                            background: 'transparent',

                                        }} onClick={() => removeFields(index)}>
                                            <Icon>delete</Icon>
                                        </button>
                                    </div>
                                ))}
                                <button style={{
                                    color: "white",
                                    width: '100%',
                                    padding: '5px 0',
                                    background: 'transparent',
                                    borderTop: '1px solid gray',
                                    borderBottom: '1px solid gray'
                                }} onClick={addFields}>
                                    Add a Warehouse
                                </button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </Paper>
    )
}

CreateItemDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    sidebarRight: PropTypes.bool.isRequired,
    companyID: PropTypes.string.isRequired,
    closeRightDrawer: PropTypes.func.isRequired,
    openRightDrawer: PropTypes.func.isRequired,
};

const openAction = key => ({ type: 'OPEN_SUBMENU', key });

const mapStateToProps = state => (console.log(state),{
    sidebarRight: state.ui.rightSidebar,
});

const mapDispatchToProps = dispatch => ({
    openRightDrawer: () => dispatch(openRightSidebar),
    closeRightDrawer: () => dispatch(closeRightSidebar),
    openSubMenu: bindActionCreators(openAction, dispatch)
});


const CreateItemDrawerMaped = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateItemDrawer);

export default (withStyles(styles)(CreateItemDrawerMaped));
