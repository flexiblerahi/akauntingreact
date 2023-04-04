/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withStyles, makeStyles, createMuiTheme, MuiThemeProvider, ThemeProvider, createTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance';
import {
  getCategories,
} from '../../redux-store/slice/categoriesSlice';
import {
  getCurrencies
} from '../../redux-store/slice/currenciesSlice';
import {
  getAccounts
} from '../../redux-store/slice/accountsSlice';
import { getbills } from '../../redux/slice/billSlice';
import Bill from './Bill';
import { Box, Grid, ListItemText, Typography, Divider, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { closeRightSidebar, openRightSidebar, toggleCreateRightSidebar } from 'enl-redux/actions/uiActions';
import { bindActionCreators } from 'redux';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import moment from "moment";
import { Add, CheckBox, Clear, FileCopy, FilterList, Print, Search } from '@material-ui/icons';
import Checkbox from '@material-ui/core/Checkbox'; import AddIcon from '@material-ui/icons/Add';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

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
      width: '100px',
      padding: '7px 0px'
    },
    '& .MuiTabs-root': {
      width: '1500px'
    },
    '& .MuiInput-root': {
      border: 0
    }
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

function BillList(props) {
  const {
    companyID,
    sidebarOpen,
    sidebarRight,
    closeRightDrawer,
    openRightDrawer,
    optionButton,
    columnVisibility
  } = props;
  const [billList, setBillList] = useState([]);
  const [bill, setBill] = useState([]);
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const [totalItems, setTotalItems] = useState();
  const [rowsPerPages, setRowsPerPages] = useState(15);
  const [update, setUpdate] = useState(false)
  const [create, setCreate] = useState(false)
  const [rowIndex, setRowIndex] = useState(0)
  const customClasses = useStyles();

  const categories = useSelector((state) => state.categories.categories);
  const currencies = useSelector((state) => state.currencies.currencies);
  const accounts = useSelector((state) => state.accounts.accounts);
  const bills = useSelector((state) => state.bills.bills);
  const dispatch = useDispatch();

  const initialState = {
    company_id: Number(companyID),
    type: "",
    document_number: "",
    order_number: "",
    status: "",
    issued_at: "",
    due_at: "",
    currency_code: "",
    amount: "",
    amount_formatted: "",
    currency_code: "",
    currency_rate: "",
    contact_id: "",
    contact_name: "",
    contact_email: "",
    contact_tax_number: "",
    contact_phone: '',
    contact_address: "",
    contact_city: "",
    contact_state: "",
    contact_zip_code: "",
    contact_country: "",
    notes: "",
    items: [],
  }
  const [data, setData] = useState(initialState)

  useEffect(() => {
    const abortController = new AbortController();

    if (categories?.length === 0 && companyID !== '') {
      axiosInstance
        .get(`/categories?company_id=${companyID}`, {
          headers: {
            Authorization: localStorage.getItem('authorizationValue')
          }
        })
        .then((res) => {
          dispatch(getCategories(res?.data?.data));
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

    if (currencies?.length === 0 && companyID !== '') {
      axiosInstance
        .get(`/currencies?company_id=${companyID}`, {
          headers: {
            Authorization: localStorage.getItem('authorizationValue')
          }
        })
        .then((res) => {
          dispatch(getCurrencies(res?.data?.data));
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

    if (accounts?.length === 0 && companyID !== '') {
      axiosInstance
        .get(`/accounts?company_id=${companyID}`, {
          headers: {
            Authorization: localStorage.getItem('authorizationValue')
          }
        })
        .then((res) => {
          dispatch(getAccounts(res?.data?.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return () => {
      abortController.abort();
    };
  }, [companyID]);


  const [filterStatus, setFilterStatus] = useState([{
    date: false,
    status: false,
    vendor: false,
    amount: false,
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
      id: 'vendor',
      name: 'vendor',
      status: filterStatus.vendor
    },
    {
      id: 'amount',
      name: 'Amount',
      status: filterStatus.amount
    }
  ];

  const [openFilter, setopenFilter] = useState(false);

  const handleClick = () => {
    closeRightDrawer()
    setopenFilter(!openFilter);
  };

  const handleChangeColumnFilter = (event) => {
    var value = event.target.value
    if (value === "date") {
      setFilterStatus({
        date: !filterStatus.date,
        status: filterStatus.status,
        vendor: filterStatus.vendor,
        amount: filterStatus.amount
      })
    }
    else if (value === "status") {
      setFilterStatus({
        date: filterStatus.date,
        status: !filterStatus.status,
        vendor: filterStatus.vendor,
        amount: filterStatus.amount
      })
    }
    else if (value === "vendor") {
      setFilterStatus({
        date: filterStatus.date,
        status: filterStatus.status,
        vendor: !filterStatus.vendor,
        amount: filterStatus.amount
      })
    }
    else if (value === "amount") {
      setFilterStatus({
        date: filterStatus.date,
        status: filterStatus.status,
        vendor: filterStatus.vendor,
        amount: !filterStatus.amount
      })
    }
  };
  useEffect(() => {
    const abortController = new AbortController();

    if (companyID !== '') {
      axiosInstance
        .get(`/documents?company_id=${companyID}&page=${currentPageNo}&limit=${rowsPerPages}&search=type:bill`, {
          headers: {
            Authorization: localStorage.getItem('authorizationValue')
          }
        })
        .then((res) => {
          dispatch(getbills(res?.data?.data));
          if (bills.length === 0) {
            setBillList(res?.data?.data?.map((data) => [[new Date(data.due_at).toLocaleDateString('en-US'), new Date(data.issued_at).toLocaleDateString('en-US')], data.status, [data.contact_name, data.document_number], data.amount, data.id]));
            data = res?.data?.data[0]
          }
          else {
            setBillList(bills?.map((data) => [[new Date(data.due_at).toLocaleDateString('en-US'), new Date(data.issued_at).toLocaleDateString('en-US')], data.status, [data.contact_name, data.document_number], data.amount, data.id]));
            data = bills[0]
          }
          setBillList(res?.data?.data?.map((data) => [[new Date(data.due_at).toLocaleDateString('en-US'), new Date(data.issued_at).toLocaleDateString('en-US')], data.status, [data.contact_name, data.document_number], data.amount_formatted, data.id]));
          setTotalItems(res?.data?.meta?.total);
          setRowsPerPages(res?.data?.meta?.per_page);
          setBill(data)
          setData({
            company_id: Number(companyID),
            type: data.type,
            document_number: data.document_number,
            order_number: data.order_number,
            tax_amount_formatted: data.items.data[0].taxes.data[0].amount_formatted,
            tax_name: data.items.data[0].taxes.data[0].tax.name,
            tax_rate: data.items.data[0].taxes.data[0].tax.rate,
            status: data.status,
            issued_at: data.issued_at,
            due_at: data.due_at,
            currency_code: data.currency_code,
            amount: data.amount,
            amount_formatted: data.amount_formatted,
            currency_code: data.currency_code,
            currency_rate: data.currency_rate,
            contact_id: data.contact_id,
            contact_name: data.contact_name,
            contact_email: data.contact_email,
            contact_tax_number: data.contact_tax_number,
            contact_phone: data.contact_phone,
            contact_address: data.contact_address,
            contact_city: data.contact_city,
            contact_state: data.contact_state,
            contact_zip_code: data.contact_zip_code,
            contact_country: data.contact_country,
            notes: data.notes,
            items: data.items.data,
          })
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
      .delete(`/documents/${id}`, {
        headers: {
          Authorization: localStorage.getItem('authorizationValue')
        }
      })
      .then((resData) => {
        axiosInstance
          .get(`/documents?company_id=${companyID}&page=${currentPageNo}&limit=${rowsPerPages}`, {
            headers: {
              Authorization: localStorage.getItem('authorizationValue')
            }
          })
          .then((res) => {
            setBillList(res?.data?.data?.map((data) => [[new Date(data.due_at).toLocaleDateString('en-US'), new Date(data.issued_at).toLocaleDateString('en-US')], data.status, [data.contact_name, data.document_number], data.amount_formatted, data.id]));
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

  const columns = [
    {
      name: <><div>Due Date</div><div>Invoice Date</div></>,
      options: {
        filter: filterStatus.date,
        sort: false,
        display: columnVisibility,
        customBodyRender: (value) => <>
          <div style={{ fontWeight: 'bolder' }}>{moment(value[0], "MMDDYYYY").fromNow()}</div>
          <div className={customClasses.columnText}>{value[1]}</div>
        </>
      },
    },
    {
      name: <div>
        <div>Status</div>
      </div>,
      options: {
        filter: filterStatus.status,
        sort: false,
        display: columnVisibility,
      },
    },
    {
      name: 'Vendor/Number',
      options: {
        filter: filterStatus.customer,
        sort: false,
        customBodyRender: (value) => <>
          <div className={customClasses.invoiceNumber}>{value[1]}</div>
          <div className={customClasses.columnText}>{value[0]}</div>
        </>
      },
    },
    {
      name: <div>
        <div>Amount</div>
      </div>,
      options: {
        filter: filterStatus.amount,
        sort: false,
        display: columnVisibility,
      },
    },
    {
      name: 'Action',
      options: {
        filter: false,
        sort: false,
        display: columnVisibility,
        customBodyRender: (value) => (
          <><Link to={`/app/update/${value}/invoice`} className=""><Icon>edit</Icon></Link>
            <button style={{ background: 'transparent' }} onClick={() => handleDelete(value)}><Icon>delete</Icon></button>
            <Box component="div" sx={{ display: 'none' }}>{value}</Box></>
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
    var bill_data = bills.filter(invoice => {
      return invoice.id == id
    })
    var data = bill_data[0]
    setBill(data)
    setData({
      company_id: Number(companyID),
      type: data.type,
      document_number: data.document_number,
      order_number: data.order_number,
      tax_amount_formatted: data.items.data[0].taxes.data[0].amount_formatted,
      tax_name: data.items.data[0].taxes.data[0].tax.name,
      tax_rate: data.items.data[0].taxes.data[0].tax.rate,
      status: data.status,
      issued_at: data.issued_at,
      due_at: data.due_at,
      currency_code: data.currency_code,
      amount: data.amount,
      amount_formatted: data.amount_formatted,
      currency_code: data.currency_code,
      currency_rate: data.currency_rate,
      contact_id: data.contact_id,
      contact_name: data.contact_name,
      contact_email: data.contact_email,
      contact_tax_number: data.contact_tax_number,
      contact_phone: data.contact_phone,
      contact_address: data.contact_address,
      contact_city: data.contact_city,
      contact_state: data.contact_state,
      contact_zip_code: data.contact_zip_code,
      contact_country: data.contact_country,
      notes: data.notes,
      items: data.items.data,
    })
    openRightDrawer()
  }

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
      .post(`/documents`, data, {
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
      .patch(`/documents/${invoice.id}`, data, {
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
  return (
    <>
<div className={customClasses.root}>
        <MuiThemeProvider theme={pageTheme()}>
          {sidebarOpen === true && sidebarRight === true ? <></> : <div className={sidebarRight ? customClasses.tableClose : customClasses.tableOpen}><MUIDataTable
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
            data={billList}
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
                  <Box className={customClasses.drawerBtn} onClick={closeRightDrawer}>
                    <ChevronRightIcon />
                  </Box>
                </Box> :
                <Box className={customClasses.handleDrawer}>
                  <Box className={customClasses.drawerBtn} onClick={openRightDrawer} >
                    <ChevronLeftIcon fontSize='small' />
                  </Box>
                </Box>}
              <Divider />
              <TextField
                value={data.document_number}
                name="document_number"
                fullWidth
                className={customClasses.inputName}
                id="document_number"
                placeholder={data.document_number === "" ? 'document_number' : ''}
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
              <Grid item container spacing={2}>
                <Grid md={6}>
                  <TextField
                    className={customClasses.labelText}
                    value={data.status}
                    name='status'
                    placeholder={data.status === "" ? 'status' : ''}
                    onChange={handleChange}
                    variant='standard'
                    InputProps={{
                      style: {
                        background: 'transparent',
                        fontSize: '12px'
                      }
                    }}
                  >
                  </TextField>
                </Grid>
                <Grid md={6}>
                  <Box></Box>
                  <Box display={'flex'} justifyContent={'end'} marginY={2}>
                    <Link className={customClasses.linkNew} to='/app/create/bill'>Create Bill</Link>
                    <Link className={customClasses.linkEdit} to={`/app/update/${bill === null ? '' : bill.id}/bill`}>Edit</Link>
                  </Box>
                </Grid>
              </Grid>
              {bill === null ? <></> : <Bill data={data} handleChange={handleChange} />}
            </Box>
          </Box>
        </ThemeProvider>
      </div>
    </>
  );
}

BillList.propTypes = {
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


const BillListMaped = connect(
  mapStateToProps,
  mapDispatchToProps
)(BillList);

export default withStyles(styles)(BillListMaped);
