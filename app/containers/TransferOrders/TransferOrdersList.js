/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withStyles, createMuiTheme, makeStyles, createTheme, ThemeProvider, MuiThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance';
import {
    getWarehouses
} from '../../redux-store/slice/warehouseSlice';
import { gettransferOrders } from '../../redux/slice/transferOrdersSlice';
import { connect } from 'react-redux';
import { closeRightSidebar, openRightSidebar, toggleCreateRightSidebar } from 'enl-redux/actions/uiActions';
import { bindActionCreators } from 'redux';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Add, CheckBox, Clear, FileCopy, FilterList, Print, Search } from '@material-ui/icons';
import { Avatar, Box, Divider, Grid, ListItemText, MenuItem, Paper, TextField, Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox'; import AddIcon from '@material-ui/icons/Add';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import moment from "moment";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Helmet } from 'react-helmet';
import { getItems } from '../../redux/slice/itemsSlice';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#55588B",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


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

const customizedTheme = createMuiTheme({
    overrides: {
        MuiToolbar: {
            root: {
                display: 'none'
            }
        },
        MuiPaper: {
            root: {
                padding: '20px'
            }
        },
        MuiTabs: {
            root: {
                width: '35rem'
            }
        },
        MuiTab: {
            root: {
                fontSize: '12px',
                padding: '6px 12px',
                '@media (min-width: 600px)': {
                    minWidth: '100px'
                }
            },
            wrapper: {
                alignItems: 'baseline'
            }
        },
        MuiInput: {
            root: {
                border: 0
            }
        },
        MuiTypography: {
            h6: {
                lineHeight: 1
            }
        },
        MuiBox: {
            root: {
                padding: '5px 8px'
            }
        },
    }
});

const useStyles = makeStyles((theme) => ({
    root: {
        position: "fixed",
        display: 'flex',
        flexDirection: 'row',
        '& .MuiFilledInput-input': {
            padding: '5px 0'
        },
        '& .MuiTextField-root': {
            width: '70%',
            padding: '7px 0px'
        },
        '& .MuiTabs-root': {
            width: '1500px'
        },
        '& .MuiInput-root': {
            border: 0
        }
    },
    paperData: {
        fontSize: '12px !important',
        lineHeight: '30px !important'
    },
    paperLabel: {
        fontSize: '14px !important',
        fontWeight: 'bold !important',
        lineHeight: '30px !important',
        marginRight: '20px !important'
    },
    filterDropdown: {
        position: 'relative',
        zIndex: '1111111111'
    },
    dropdownBtn: {
        backgroundColor: 'transparent',
        border: '1px solid gray',
        color: 'rgb(49, 114, 176)',
        marginLeft: '20px',
        padding: '5px 10px'
    },
    dropdown: {
        width: '150px',
        textAlign: 'start',
        position: 'absolute',
        top: '20px',
        right: 0,
        left: 0,
        zIndex: 1,
        padding: theme.spacing(0),
        backgroundColor: theme.palette.background.paper,
    },
    tableOpen: {
        "@media (min-width: 2000px)": {
            height: '95vh',
        },
        height: '90vh',
        transition: 'all 0.2s ease 0s, margin-top 0s ease 0s, padding-left 0s ease 0s',
        "@media (min-width: 1400px)": {
            width: '1500px',
        },
        "@media (max-width: 1400px)": {
            width: '1100px',
        },
        "@media (max-width: 900px)": {
            width: '400px',
        },
        "@media (max-width: 500px)": {
            width: '250px',
        },
        position: 'relative',
    },
    tableClose: {
        "@media (min-width: 2000px)": {
            height: '95vh',
        },
        height: '90vh',
        width: '250px',
        position: 'relative',
        transition: 'all 0.2s ease 0s, margin-top 0s ease 0s, padding-left 0s ease 0s'
    },
    drawerOpen: {
        marginRight: '0',
        "@media (min-width: 2000px)": {
            height: '95vh',
        },
        height: '80vh',
        "@media (min-width: 1400px)": {
            width: '1350px',
        },
        "@media (max-width: 1400px)": {
            width: '970px',
        },
        "@media (max-width: 900px)": {
            width: '650px',
        },
        "@media (max-width: 500px)": {
            width: '350px',
        }
    },
    drawerClose: {
        marginRight: '-20px',
        "@media (min-width: 2000px)": {
            height: '95vh',
        },
        height: '80vh'
    },
    filterColumn: {
        width: '100px',
        border: 'none',
        borderBottom: '1px solid rgb(0, 0, 0, 0.3)',
        margin: '10px 10px 0 10px',
    },
    toolbarBtn: {
        color: '#58698d',
        fontWeight: 700,
        textDecoration: 'none',
        backgroundColor: 'transparent',
        padding: '0 20px',
        lineHeight: '45px',
        "@media (max-width: 500px)": {
            padding: '0 8px',
        }
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
    drawerBtn: {
        cursor: 'pointer',
        flex: '0 0 auto',
        color: 'rgba(0, 0, 0, 0.54)',
        padding: '3px 10px',
        overflow: 'visible',
        fontSize: '1.5rem',
        textAlign: 'center',
        transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        borderRadius: '50%'
    },
    nameInputClose: {
        position: 'relative',
        padding: '10px 0px 10px 50px',
        paddingLeft: '35px'
    },
    nameInputOpen: {
        position: 'relative',
        padding: '2px 0px 2px 50px',
        paddingLeft: '35px'
    },
    contentHeight: {
        height: '80vh',
        overflow: 'auto',
        width: '100%',
        padding: '20px 50px 0 50px'
    },
    boxDetails: {
        height: '35px'
    },
    selectField: {
        width: '150px',
        padding: '5px 10px'
    },
    wrapper: {
        orientation: 'horizontal'
    },
    invoiceNumber: {
        fontFamily: 'Lato',
        fontSize: '14px',
        fontWeight: 900,
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        color: 'rgb(44, 44, 44)',
        margin: '0px',
        textShadow: 'rgb(0 0 0 / 0%) 1px 1px 1px',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        width: '100%'
    },
    columnText: {
        fontFamily: 'Lato',
        fontSize: '12px',
        fontWeight: 900,
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        color: 'rgb(96, 96, 96)',
        margin: '5px 0 0 0',
        textShadow: 'rgb(0 0 0 / 0%) 1px 1px 1px',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        width: '100%',
    },
    selectBox: {
        border: 0,
        width: '300px',
        fontSize: '14px'
    },
    labelText: {
        fontSize: '14px',
        fontWeight: 700,
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: '45px',
        letterSpacing: 'normal',
        color: 'rgb(96, 96, 96)',
        margin: '0px',
        textShadow: 'rgb(0 0 0 / 0%) 1px 1px 1px',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: 0,
        justifyItems: 'flex-end'
    },
    textField: {
        padding: '0 12px',
        paddingBottom: 0,
        marginTop: 0,
        fontWeight: 500
    },
    input: {
        color: 'white'
    },
    addWarehouseBtn: {
        width: '100%',
        background: 'transparent',
        color: 'rgb(66 66 66)'
    },
    inputName: {
        padding: '10px 12px',
    },
    linkNew: {
        background: '#53793E',
        borderRadius: '10px',
        color: 'white',
        lineHeight: '1.5rem',
        fontWeight: 500,
        fontSize: '.875rem',
        padding: '0.375rem 0.75rem',
        textDecoration: 'none',
        marginRight: '10px'
    },
    linkEdit: {
        background: '#E5E7EB',
        borderRadius: '10px',
        color: 'black',
        lineHeight: '1.5rem',
        fontWeight: 500,
        fontSize: '.875rem',
        padding: '0.375rem 0.75rem',
        textDecoration: 'none'
    },
    badge: {
        padding: '5px',
        background: '#E5E7EB',
        borderRadius: '10px',
        color: 'black',
    }
}));

const pageTheme = () =>
    createTheme({
        overrides: {
            MuiInput: {
                root: {
                    border: 0,
                    borderBottom: '1px solid rgba(0,0,0,0.32)'
                }
            },
            MuiPaper: {
                root: {
                    height: '100px'
                }
            },
            MUIDataTableFooter: {
                root: {
                    position: 'absolute',
                    bottom: 0,
                }
            },
            MUIDataTableToolbar: {
                filterPaper: {
                    width: '500px',
                    left: '650px !important',
                    minHeight: '200px'
                },
                actions: {
                    display: 'flex',
                    justifyContent: 'end'
                }
            },
            MUIDataTable: {
                paper: {
                    height: 'inherit',
                    backgroundColor: '#F3F3F3',
                    position: 'relative'
                },
                responsiveScroll: {
                    maxHeight: 'calc(80vh - 145px) !important',
                },
                responsiveBase: {
                    height: 'calc(100% - 91px) !important'
                }
            },
            MuiTypography: {
                body1: {
                    fontSize: "15px",
                    fontWeight: 700
                },
                body2: {
                    fontSize: '0.7rem',
                    fontWeight: 500
                }
            },
            MuiTable: {
                root: {
                    margin: 0
                }
            },
            MUIDataTableHeadCell: {
                fixedHeader: {
                    backgroundColor: "rgb(49, 114, 176) !important",
                    color: 'white'
                }
            },
            MuiToolbar: {
                root: {
                    display: "flex"
                },
                regular: {
                    '@media (min-width: 600px)': {
                        minHeight: '40px',
                        paddingLeft: 0,
                        paddingRight: 0
                    },
                    minHeight: '48px',
                    height: '48px',
                    paddingLeft: 0,
                    paddingRight: 0,
                    left: {
                        display: "none"
                    },
                    action: {
                        textAlign: "left"
                    }
                },
            },
            MuiTableCell: {
                root: {
                    padding: '10px'
                },
                head: {
                    backgroundColor: "rgb(49, 114, 176)",
                    height: '50px',
                    fontSize: '14px',
                    fontWeight: 900
                }
            },
            MUIDataTableFilterList: {
                root: {
                    display: 'none'
                }
            },
            MuiTablePagination: {
                root: {
                    height: '40px',
                    overflowY: "hidden"
                }
            },
            MuiOutlinedInput: {
                input: {
                    padding: 0
                }
            },
            MUIDataTablePagination: {
                navContainer: {
                    justifyContent: 'flex-start'
                },
                tableCellContainer: {
                    padding: '0 20px'
                }
            },
            MuiTablePagination: {
                root: {
                    height: '50px',
                    overflowY: 'hidden'
                },
                caption: {
                    display: 'none'
                },
                toolbar: {
                    display: 'inline-flex',
                    height: '50px',
                },
                actions: {
                    marginLeft: '5px'
                },
                input: {
                    marginRight: '5px'
                }
            }
        },
        MuiIconButton: {
            root: {
                padding: '10px 0'
            }
        },
        ItemCarousel: {
            img: {
                height: '200px'
            }
        }
    });

function TransferOrdersList(props) {
    const {
        companyID,
        sidebarOpen,
        sidebarRight,
        closeRightDrawer,
        openRightDrawer,
        optionButton,
        columnVisibility
    } = props;
    const [transferOrders, setTransferOrders] = useState([]);
    const [currentPageNo, setCurrentPageNo] = useState(1);
    const [totalItems, setTotalItems] = useState();
    const [openFilter, setopenFilter] = useState(false);
    const [rowIndex, setRowIndex] = useState(0)
    const [update, setUpdate] = useState(false)
    const [create, setCreate] = useState(false)
    const [rowsPerPages, setRowsPerPages] = useState(15);
    const customClasses = useStyles();

    const initialState = {
        "id": '',
        "company_id": Number(companyID),
        "transfer_order": "",
        "transfer_order_number": "",
        "reason": "",
        "date": "",
        "source_warehouse_id": "",
        "source_warehouse_name": "",
        "destination_warehouse_id": "",
        "destination_warehouse_name": "",
        "status": "",
        "created_from": "",
        "created_by": "",
        "created_at": "",
        "updated_at": "",
        "items": []
    }
    const [data, setData] = useState(initialState)

    const InitialItemsState = { item_id: 0, item_quantity: 0, transfer_quantity: 0 }
    const [items, setItems] = useState([
        InitialItemsState
    ]);

    const addItem = () => {
        const newItem = { item_id: 0, item_quantity: 0, transfer_quantity: 0 };
        setItems([...items, newItem]);
    };

    const removeItem = (index) => {
        const data = [...items];
        data.splice(index, 1);
        setItems(data);
    };

    const handleItemChange = (event, index, objIdx) => {
        const itemsList = [...items];
        if (objIdx === 0) { itemsList[index].item_id = event.target.value; }
        else if (objIdx === 1) { itemsList[index].item_quantity = event.target.value; }
        else if (objIdx === 2) { itemsList[index].transfer_quantity = event.target.value; }
        setItems(itemsList);
        setUpdate(true)
    };
    const warehouses = useSelector((state) => state.warehouses.warehouses);
    const transferOrderList = useSelector((state) => state.transferOrders.transferOrders);
    const itemList = useSelector((state) => state.items.items);
    const dispatch = useDispatch();

    useEffect(() => {
        const abortController = new AbortController();

        if (warehouses?.length === 0 && companyID !== '') {
            axiosInstance
                .get(`/warehouses?company_id=${companyID}`, {
                    headers: {
                        Authorization: localStorage.getItem('authorizationValue')
                    }
                })
                .then((res) => {
                    dispatch(getWarehouses(res?.data?.data));
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        return () => {
            abortController.abort();
        };
    }, [companyID]);

    useEffect(() => {
        const abortController = new AbortController();

        if (itemList?.length === 0 && companyID !== '') {
            axiosInstance
                .get(`/items?company_id=${companyID}`, {
                    headers: {
                        Authorization: localStorage.getItem('authorizationValue')
                    }
                })
                .then((res) => {
                    dispatch(getItems(res?.data?.data));
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        return () => {
            abortController.abort();
        };
    }, [companyID]);

    useEffect(() => {
        const abortController = new AbortController();

        if (companyID !== '') {
            axiosInstance
                .get(`/transfer-orders?company_id=${companyID}&page=${currentPageNo}&limit=${rowsPerPages}`, {
                    headers: {
                        Authorization: localStorage.getItem('authorizationValue')
                    }
                })
                .then((res) => {
                    let receivedData;
                    dispatch(gettransferOrders(res?.data?.data))
                    if (transferOrderList.length === 0) {
                        setTransferOrders(res?.data?.data?.map((data) => [[data.date, data.transfer_order_number], data.status, [data.source_warehouse_name, data.destination_warehouse_name], data.transfer_order, data.id]));
                        receivedData = res?.data?.data[0]
                    }
                    else {
                        setTransferOrders(transferOrderList?.map((data) => [[data.date, data.transfer_order_number], data.status, [data.source_warehouse_name, data.destination_warehouse_name], data.transfer_order, data.id]));
                        receivedData = transferOrderList[0]
                    }
                    setData({
                        "id": receivedData.id,
                        "company_id": Number(companyID),
                        "transfer_order": receivedData.transfer_order,
                        "transfer_order_number": receivedData.transfer_order_number,
                        "reason": receivedData.reason,
                        "date": receivedData.date,
                        "source_warehouse_id": receivedData.source_warehouse_id,
                        "source_warehouse_name": receivedData.source_warehouse_name,
                        "destination_warehouse_id": receivedData.destination_warehouse_id,
                        "destination_warehouse_name": receivedData.destination_warehouse_name,
                        "status": receivedData.status,
                        "created_from": receivedData.created_from,
                        "created_by": receivedData.created_by,
                        "created_at": receivedData.created_at,
                        "updated_at": receivedData.updated_at,
                        "items": receivedData.items.data
                    })
                    setItems(receivedData.items.data)
                    setTotalItems(res?.data?.meta?.total);
                    setRowsPerPages(res?.data?.meta?.per_page);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        return () => {
            abortController.abort();
        };
    }, [companyID, currentPageNo]);

    const handleDelete = (id) => {
        axiosInstance
            .delete(`/transfer-orders/${id}`, {
                headers: {
                    Authorization: localStorage.getItem('authorizationValue')
                }
            })
            .then((resData) => {
                axiosInstance
                    .get(`/transfer-orders?company_id=${companyID}&page=${currentPageNo}&limit=${rowsPerPages}`, {
                        headers: {
                            Authorization: localStorage.getItem('authorizationValue')
                        }
                    })
                    .then((res) => {
                        setTransferOrders(res?.data?.data?.map((data) => [[data.date, data.transfer_order_number], data.status, [data.source_warehouse_id, data.destination_warehouse_id], data.transfer_order, data.id]));
                        setTotalItems(res?.data?.meta?.total);
                        setRowsPerPages(res?.data?.meta?.per_page);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const [filterStatus, setFilterStatus] = useState([{
        date: false,
        status: false,
        source: false,
        transfer_order: false,
    }])

    const names = [
        {
            id: 'date',
            name: 'Date',
            status: filterStatus.date
        },
        {
            id: 'status',
            name: 'Status',
            status: filterStatus.status
        },
        {
            id: 'source',
            name: 'Source',
            status: filterStatus.source
        },
        {
            id: 'transfer_order',
            name: 'Transfer Order',
            status: filterStatus.transfer_order
        }
    ];

    const handleChangeColumnFilter = (event) => {
        var value = event.target.value
        if (value === "date") {
            setFilterStatus({
                date: !filterStatus.date,
                status: filterStatus.status,
                source: filterStatus.source,
                transfer_order: filterStatus.transfer_order
            })
        }
        else if (value === "status") {
            setFilterStatus({
                date: filterStatus.date,
                status: !filterStatus.status,
                source: filterStatus.source,
                transfer_order: filterStatus.transfer_order
            })
        }
        else if (value === "source") {
            setFilterStatus({
                date: filterStatus.date,
                status: filterStatus.status,
                source: !filterStatus.source,
                transfer_order: filterStatus.transfer_order
            })
        }
        else if (value === "transfer_order") {
            setFilterStatus({
                date: filterStatus.date,
                status: filterStatus.status,
                source: filterStatus.source,
                transfer_order: !filterStatus.transfer_order
            })
        }
    };
    const columns = [
        {
            name: <>
                <>Date/</>
                <>Number</>
            </>,
            options: {
                filter: filterStatus.date,
                sort: false,
                display: true,
                customBodyRender: (value) => <>
                    {moment(value[0]).format("MMM Do YY")}
                    <div>{value[1]}</div>
                </>
            },
        },
        {
            name: <>Status</>,
            options: {
                filter: filterStatus.status,
                sort: false,
                display: columnVisibility,
            },
        },
        {
            name: <>
                <div>Source</div>
                <div>Destination</div>
            </>,
            options: {
                filter: filterStatus.source,
                sort: false,
                display: columnVisibility,
                customBodyRender: (value) => <>
                    <div>{value[0]}</div>
                    <div>{value[1]}</div>
                </>
            },
        },
        {
            name: <>Transfer Order</>,
            options: {
                filter: filterStatus.transfer_order,
                sort: false,
                display: columnVisibility,
            },
        },
        {
            name: 'Action',
            options: {
                filter: filterStatus.email,
                sort: false,
                display: columnVisibility,
                customBodyRender: (value) => (
                    <>
                        <Link to={`/app/update/${value}/transfer/order`} className=""><Icon>edit</Icon></Link>
                        <span className='' onClick={() => handleDelete(value)}><Icon>delete</Icon></span>
                        <Box component="div" sx={{ display: 'none' }}>{value}</Box>
                    </>
                )
            }
        }
    ];

    const options = {
        filterType: 'dropdown',
        elevation: 0,
        fixedHeader: true,
        responsive: 'standard',
        rowHover: true,
        filter: optionButton,
        search: true,
        viewColumns: false,
        download: optionButton,
        print: optionButton,
        resizableColumns: false,
        rowsPerPage: [25],
        rowsPerPageOptions: [10, 25, 50, 100],
        count: totalItems,
        selectableRows: false,
        title: false,
        onChangePage(currentPage) {
            setCurrentPageNo(currentPage + 1);
        },
        onRowClick: rowData => this.goToEditBriefForm(rowData),
        onRowClick: (rowData, rowMeta) => handleRowClick(rowData, rowMeta),
        setRowProps: (row, dataIndex) => {
            if (dataIndex === rowIndex) {
                return {
                    style: { background: "rgb(0,0,0,0.1)" }
                };
            }
        },
        jumpToPage: false,
        onChangePage(currentPage) {
            setCurrentPageNo(currentPage + 1);
        },
    };

    const handleRowClick = (rowData, rowMeta) => {
        setRowIndex(rowMeta.rowIndex)
        var id = rowData[4].props.children[2].props.children
        var transferOrders_data = transferOrderList.filter(transferOrder => {
            return transferOrder.id == id
        })
        var receivedData = transferOrders_data[0]
        setData({
            "id": receivedData.id,
            "company_id": Number(companyID),
            "transfer_order": receivedData.transfer_order,
            "transfer_order_number": receivedData.transfer_order_number,
            "reason": receivedData.reason,
            "date": receivedData.date,
            "source_warehouse_id": receivedData.source_warehouse_id,
            "source_warehouse_name": receivedData.source_warehouse_name,
            "destination_warehouse_id": receivedData.destination_warehouse_id,
            "destination_warehouse_name": receivedData.destination_warehouse_name,
            "status": receivedData.status,
            "created_from": receivedData.created_from,
            "created_by": receivedData.created_by,
            "created_at": receivedData.created_at,
            "updated_at": receivedData.updated_at,
            "items": receivedData.items.data
        })
        setItems(receivedData.items.data)
        openRightDrawer()
    }

    const handleClick = () => {
        closeRightDrawer()
        setopenFilter(!openFilter);
    };

    const handleChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        setUpdate(true)
        setData((prevalue) => {
            return {
                ...prevalue,
                [name]: value
            }
        })
    }

    const handleUpdateCancel = () => {
        setUpdate(false)
    }

    const handleCreateForm = () => {
        setData(initialState)
        openRightDrawer()
    }

    const handleCreate = () => {
        axiosInstance
            .post(`/transfer-orders`, data, {
                headers: {
                    Authorization: localStorage.getItem('authorizationValue')
                }
            })
            .then((res) => {
                alert("created")
                // console.log(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        axiosInstance
            .patch(`/transfer-orders/${data.id}`, data, {
                headers: {
                    Authorization: localStorage.getItem('authorizationValue')
                }
            })
            .then((res) => {
                alert("updated")
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    const title = 'Transfer Orders';
    const description = 'This is transfer orders page';
    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="twitter:title" content={title} />
                <meta property="twitter:description" content={description} />
            </Helmet>
            <div className={customClasses.root}>
                <MuiThemeProvider theme={pageTheme()}>
                    {sidebarOpen === true && sidebarRight === true ? <></> : <div className={sidebarRight ? customClasses.tableClose : customClasses.tableOpen}>
                        <MUIDataTable
                            title={
                                <ClickAwayListener
                                    mouseEvent="onMouseDown"
                                    touchEvent="onTouchStart"
                                >
                                    <div className={customClasses.filterDropdown}>
                                        <button className={customClasses.dropdownBtn} type="button" onClick={handleClick}>
                                            <FilterList /> filter
                                        </button>
                                        {openFilter ? (
                                            <div className={customClasses.dropdown}>
                                                {openFilter ? (
                                                    <div className={customClasses.dropdown}>
                                                        {names.map((name) => (<Box display={'flex'} key={name.id}><Checkbox checked={name.status} value={name.id} onChange={handleChangeColumnFilter} /> <ListItemText primary={name.name} /></Box>))}
                                                    </div>
                                                ) : null}
                                            </div>
                                        ) : null}
                                    </div>
                                </ClickAwayListener>}
                            data={transferOrders}
                            columns={columns}
                            options={options}
                        />
                    </div>
                    }
                </MuiThemeProvider >

                <ThemeProvider theme={customizedTheme}>
                    <Box className={sidebarRight ? customClasses.drawerOpen : customClasses.drawerClose}>
                        <Box style={{
                            padding: '0 30px',
                            height: '48px'
                        }}>
                            <Box display='flex'>
                                <button className={customClasses.toolbarBtn} onClick={handleCreateForm} style={{ padding: '0' }}>
                                    <Box display='flex'>
                                        <Typography variant='toolbarBtn' style={{
                                            fontSize: '14px'
                                        }}>
                                            <AddIcon fontSize='small' /> New
                                        </Typography>
                                    </Box>
                                </button>
                                <button className={customClasses.toolbarBtn} onClick={handleCreate}>
                                    <Box display='flex'>
                                        <Typography variant='toolbarBtn' style={{
                                            fontSize: '14px'
                                        }}>
                                            <FileCopy fontSize='small' />Copy
                                        </Typography>
                                    </Box>
                                </button>
                                <button className={customClasses.toolbarBtn}>
                                    <Box display='flex'>
                                        <Typography variant='toolbarBtn' style={{
                                            fontSize: '14px'
                                        }}>
                                            <Print fontSize='small' /> Print barcode
                                        </Typography>
                                    </Box>
                                </button>
                                <button className={customClasses.toolbarBtn}>
                                    <Box display='flex'>
                                        <Typography variant='toolbarBtn' style={{
                                            fontSize: '14px'
                                        }}>
                                            <Clear fontSize='small' />Deactivate
                                        </Typography>
                                    </Box>
                                </button>
                                <Grid container justify="flex-end">
                                    <Box display={'flex'}>
                                        {update == true && create == false ? <><button onClick={handleUpdateCancel}>
                                            Cancel
                                        </button> <button style={{ 'background': 'linear-gradient(rgb(237, 166, 61) 0%, rgb(247, 200, 85) 100%)' }} onClick={handleUpdate}>
                                                Update
                                            </button> </> : <></>}
                                        {update == true && create == true ? <><button onClick={handleUpdateCancel}>
                                            Cancel
                                        </button> <button style={{ 'background': 'linear-gradient(rgb(237, 166, 61) 0%, rgb(247, 200, 85) 100%)' }} onClick={handleCreate}>
                                                Create
                                            </button> </> : <></>}
                                    </Box>
                                </Grid>
                            </Box>
                        </Box>
                        <Box
                            className={sidebarRight ? customClasses.nameInputOpen : customClasses.nameInputClose}
                            component="div"
                            bgcolor={"rgb(203, 220, 235)"}>
                            {sidebarRight ?
                                <Box className={customClasses.handleDrawer}>
                                    <Box className={customClasses.drawerBtn}>
                                        <ChevronRightIcon onClick={closeRightDrawer} />
                                    </Box>
                                </Box> :
                                <Box className={customClasses.handleDrawer}>
                                    <Box className={customClasses.drawerBtn}>
                                        <ChevronLeftIcon fontSize='small' onClick={openRightDrawer} />
                                    </Box>
                                </Box>}
                            <Divider />
                            <TextField
                                value={data.transfer_order}
                                name="transfer_order"
                                fullWidth
                                className={customClasses.inputName}
                                id="transfer_order"
                                placeholder={data.transfer_order === "" ? 'transfer_order' : ''}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: 0
                                }}
                                InputProps={{
                                    style: {
                                        padding: '0px 12px',
                                        background: 'none rgba(255, 255, 255, 0.75)',
                                        border: '1px solid rgba(0, 0, 0, 0)',
                                        width: '100%',
                                        float: 'none',
                                        display: 'flex',
                                        boxSizing: 'border-box',
                                        borderRadius: '4px',
                                        fontFamily: 'ZonaPro',
                                        fontSize: '26px',
                                        fontWeight: 'normal',
                                        fontStyle: 'normal',
                                        fontStretch: 'normal',
                                        letterSpacing: 'normal',
                                        margin: '0px',
                                        textShadow: 'rgb(0 0 0 / 0%) 1px 1px 1px',
                                        color: 'rgb(74, 74, 74)',
                                        lineHeight: '48px',
                                        textRendering: 'optimizelegibility !important',
                                    }
                                }}
                            />
                        </Box>
                        <Box className={customClasses.contentHeight}>
                            <Box paddingY={3}>
                                <Grid container spacing={2}>
                                    <Grid item md={6}>
                                        <Box className={customClasses.boxDetails} display={'flex'} flexDirection={'row'} marginY={1}>
                                            <span className={customClasses.labelText}>Transfer Order</span>
                                            <TextField
                                                value={data.transfer_order}
                                                className={customClasses.labelText}
                                                name='transfer_order'
                                                onChange={handleChange}
                                                variant='standard'
                                                InputProps={{
                                                    style: {
                                                        background: 'transparent',
                                                        fontSize: '14px'
                                                    }
                                                }}
                                            >
                                            </TextField>
                                        </Box>
                                    </Grid>
                                    <Grid item md={6}>
                                        <Box className={customClasses.boxDetails} display={'flex'} flexDirection={'row'} marginY={1}>
                                            <span className={customClasses.labelText}>Transfer Order Number</span>
                                            <TextField
                                                value={data.transfer_order_number}
                                                className={customClasses.labelText}
                                                name='transfer_order_number'
                                                onChange={handleChange}
                                                variant='standard'
                                                InputProps={{
                                                    style: {
                                                        background: 'transparent',
                                                        fontSize: '14px'
                                                    }
                                                }}
                                            >
                                            </TextField>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Divider></Divider>
                                <Grid container spacing={2}>
                                    <Grid item md={6}>
                                        <Box className={customClasses.boxDetails} display={'flex'} flexDirection={'row'} marginY={1}>
                                            <span className={customClasses.labelText}>Date</span>
                                            <TextField
                                                value={data.date}
                                                className={customClasses.labelText}
                                                name='date'
                                                onChange={handleChange}
                                                variant='standard'
                                                InputProps={{
                                                    style: {
                                                        background: 'transparent',
                                                        fontSize: '14px'
                                                    }
                                                }}
                                            >
                                            </TextField>
                                        </Box>
                                    </Grid>
                                    <Grid item md={6}>
                                        <Box className={customClasses.boxDetails} display={'flex'} flexDirection={'row'} marginY={1}>
                                            <span className={customClasses.labelText}>Reason</span>
                                            <TextField
                                                value={data.reason}
                                                className={customClasses.labelText}
                                                name='reason'
                                                onChange={handleChange}
                                                variant='standard'
                                                InputProps={{
                                                    style: {
                                                        background: 'transparent',
                                                        fontSize: '14px'
                                                    }
                                                }}
                                            >
                                            </TextField>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Divider></Divider>
                                <Grid container spacing={2}>
                                    <Grid item md={6}>
                                        <Box className={customClasses.boxDetails} display={'flex'} flexDirection={'row'} marginY={1}>
                                            <span className={customClasses.labelText}>Source Warehouse</span>
                                            <TextField
                                                select
                                                value={data.source_warehouse_id}
                                                name='source_warehouse_id'
                                                onChange={handleChange}
                                                variant='standard'
                                                InputProps={{
                                                    style: {
                                                        background: 'transparent',
                                                        fontSize: '14px'
                                                    }
                                                }}
                                            >
                                                {warehouses && warehouses.length > 0 && warehouses.map(warehouse => (
                                                    <option key={warehouse.id} value={warehouse.id}>
                                                        {warehouse.name}
                                                    </option>
                                                ))}
                                            </TextField>
                                        </Box>
                                    </Grid>
                                    <Grid item md={6}>
                                        <Box className={customClasses.boxDetails} display={'flex'} flexDirection={'row'} marginY={1}>
                                            <span className={customClasses.labelText}>Destination Warehouse</span>
                                            <TextField
                                                select
                                                value={data.destination_warehouse_id}
                                                name='destination_warehouse_id'
                                                onChange={handleChange}
                                                variant='standard'
                                                InputProps={{
                                                    style: {
                                                        background: 'transparent',
                                                        fontSize: '14px'
                                                    }
                                                }}
                                            >
                                                {warehouses && warehouses.length > 0 && warehouses.map(warehouse => (
                                                    <option key={warehouse.id} value={warehouse.id}>
                                                        {warehouse.name}
                                                    </option>
                                                ))}
                                            </TextField>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Divider></Divider>
                            </Box>
                            <Divider></Divider>
                            <Box margin={2}>
                                <Grid container spacing={2}>
                                    <Grid md={3}><Typography className={customClasses.labelText}>Item</Typography></Grid>
                                    <Grid md={3}><Typography className={customClasses.labelText}>Item Quantity</Typography></Grid>
                                    <Grid md={3}><Typography className={customClasses.labelText}>Transfer Quantity</Typography></Grid>
                                    <Grid md={3}></Grid>
                                </Grid>
                            </Box>

                            <Divider></Divider>
                            {items.map((input, index) => (
                                <Box paddingY={1}>
                                    <Grid key={index} container item spacing={1}>
                                        <Grid sm={3}>
                                            <Box bgcolor="background.paper" margin={1}>
                                                <select
                                                    className={customClasses.selectBox}
                                                    name={`items[${index}][item_id]`}
                                                    value={input.item_id}
                                                    onChange={(e) => handleItemChange(e, index, 0)} style={{ marginTop: '15px', width: '100px' }}>
                                                    {itemList && itemList.length > 0 && itemList.map(item => (
                                                        <option key={item.id} value={item.id}>
                                                            {item.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </Box>
                                        </Grid>
                                        <Grid sm={3}>
                                            <Box marginTop={1}>
                                                <TextField
                                                    name={`items[${index}][item_quantity]`}
                                                    value={input.item_quantity}
                                                    onChange={(e) => handleItemChange(e, index, 1)}
                                                    variant='standard'
                                                    InputProps={{
                                                        style: {
                                                            background: 'transparent',
                                                            fontSize: '14px',
                                                            width: '100px'
                                                        }
                                                    }}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid sm={3}>
                                            <Box bgcolor="background.paper" margin={1}>
                                                <TextField
                                                    name={`items[${index}][transfer_quantity]`}
                                                    value={input.transfer_quantity}
                                                    onChange={(e) => handleItemChange(e, index, 2)}
                                                    variant='standard'
                                                    InputProps={{
                                                        style: {
                                                            background: 'transparent',
                                                            fontSize: '14px',
                                                            width: '100px'
                                                        }
                                                    }}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid sm={3}>
                                            <Box marginTop={1}>
                                                <button style={{
                                                    backgroundColor: 'transparent'
                                                }} onClick={() => removeItem(index)}>
                                                    <Icon>delete</Icon>
                                                </button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Divider></Divider>
                                </Box>
                            ))}
                            <Box padding={'0 0 5px 0'}>
                                <button color="primary" className={customClasses.addWarehouseBtn} onClick={addItem}>
                                    <Add></Add> Add a Item
                                </button>
                                <Divider className={customClasses.divider}></Divider>
                            </Box>
                        </Box>
                    </Box>
                </ThemeProvider>
            </div>
        </>
    );
}

TransferOrdersList.propTypes = {
    classes: PropTypes.object.isRequired,
    sidebarOpen: PropTypes.bool.isRequired,
    sidebarRight: PropTypes.bool.isRequired,
    optionButton: PropTypes.bool.isRequired,
    columnVisibility: PropTypes.bool.isRequired,
    companyID: PropTypes.string.isRequired,
    closeRightDrawer: PropTypes.func.isRequired,
    openRightDrawer: PropTypes.func.isRequired,
    createItemDrawer: PropTypes.bool.isRequired
};

const openAction = key => ({ type: 'OPEN_SUBMENU', key });

const mapStateToProps = state => ({
    sidebarOpen: state.ui.sidebarOpen,
    sidebarRight: state.ui.rightSidebar,
    optionButton: state.ui.optionButton,
    columnVisibility: state.ui.columnVisibility,
    createItemDrawer: state.ui.createItemDrawer,
});

const mapDispatchToProps = dispatch => ({
    openRightDrawer: () => dispatch(openRightSidebar),
    closeRightDrawer: () => dispatch(closeRightSidebar),
    toggleCreateRightDrawer: () => dispatch(toggleCreateRightSidebar),
    openSubMenu: bindActionCreators(openAction, dispatch)
});


const TransferOrdersListMaped = connect(
    mapStateToProps,
    mapDispatchToProps
)(TransferOrdersList);

export default (withStyles(styles)(TransferOrdersListMaped));
