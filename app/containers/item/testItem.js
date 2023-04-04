import React, { useEffect, useState } from 'react';
import {
  createTheme,
  MuiThemeProvider,
  withStyles, makeStyles, ThemeProvider, createMuiTheme
} from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes, { array } from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import axiosInstance from '../../services/axiosInstance';
import { getCategories, } from '../../redux/slice/categoriesSlice';
import { getWarehouses } from '../../redux/slice/warehouseSlice';
import { getItems } from '../../redux/slice/itemsSlice';
import { getTaxes } from '../../redux/slice/taxesSlice';
import { gethistories } from '../../redux/slice/historySlice';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Box, Grid, Input, ListItemIcon, ListItemText, MenuItem, Paper, Portal, Select, TextareaAutosize, TextField, Toolbar, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Add, Clear, FileCopy, FilterList, Print, Search } from '@material-ui/icons';
import { connect } from 'react-redux';
import { closeRightSidebar, openRightSidebar, toggleCreateRightSidebar } from 'enl-redux/actions/uiActions';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { green } from '@material-ui/core/colors';
import MUIDataTable from 'mui-datatables';
import { DropzoneArea } from 'material-ui-dropzone';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import moment from "moment";
import RightSidebar from '../../components/rightsidebar/RightSidebar';


const theme = createTheme();


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
const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    display: 'flex',
    flexDirection: 'row',
    '& .MuiFilledInput-input': {
      padding: '5px 0'
    },
    '& .MuiTextField-root': {
      width: '300px',
      padding: '7px 12px 0px'
    },
    '& .MuiTabs-root': {
      width: '1500px'
    },
    '& .MuiInput-root': {
      border: 0
    },
    '@media (min-width: 960px)': {
      '& .MuiGrid-grid-md-6': {
        minHeight: '280px'
      }
    },
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
    border: '1px solid rgb(0,0,0,0.2)',
    height: '80vh',
    transition: 'all 0.2s ease 0s, margin-top 0s ease 0s, padding-left 0s ease 0s',
    "@media (min-width: 1400px)": {
      width: '2100px',
    },
    "@media (max-width: 1400px)": {
      width: '1600px',
    },
    "@media (max-width: 900px)": {
      width: '600px',
    },
    "@media (max-width: 500px)": {
      width: '250px',
    },
    position: 'relative',
  },
  tableClose: {
    border: '1px solid rgb(0,0,0,0.2)',
    height: '80vh',
    width: '250px',
    position: 'relative',
    transition: 'all 0.2s ease 0s, margin-top 0s ease 0s, padding-left 0s ease 0s'
  },
  drawerOpen: {
    marginRight: '0',
    height: '80vh',
    boxShadow: '0 0 10px rgb(0,0,0, 0.2)',
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
    },
  },
  filterColumn: {
    width: '100px',
    border: 'none',
    borderBottom: '1px solid rgb(0, 0, 0, 0.3)',
    margin: '10px 10px 0 10px',
  },
  drawerClose: {
    marginRight: '-20px',
    height: '80vh',
    boxShadow: '0 0 10px rgb(0,0,0, 0.2)'
  },
  toolbarBtn: {
    color: '#58698d',
    fontWeight: 700,
    textDecoration: 'none',
    backgroundColor: 'transparent',
    padding: '0 20px',
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
    height: 'calc(80vh - 145px)',
    overflow: 'auto',
    width: '100%',
    padding: '0 50px 0 20px'
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
  itemName: {
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
          backgroundColor: '#F3F3F3'
        },
        responsiveScroll: {
          maxHeight: 'calc(80vh - 130px) !important',
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
      MuiTableRow: {
        root: {
          position: 'relative',
        }
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
        },
        footer: {
          boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)'
        },
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

function Item(props) {
  const customClasses = useStyles();
  const dispatch = useDispatch();

  const {
    classes,
    sidebarOpen,
    sidebarRight,
    companyID,
    closeRightDrawer,
    openRightDrawer,
    optionButton,
    columnVisibility,
    createItemDrawer,
    toggleCreateRightDrawer,
  } = props;

  const categories = useSelector((state) => state.categories.categories);
  const taxes = useSelector((state) => state.taxes.taxes);
  const warehouses = useSelector((state) => state.warehouses.warehouses);
  const itemList = useSelector((state) => state.items.items);
  const histories = useSelector((state) => state.histories.histories);

  const [allItemsData, setAllItemsData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [totalItems, setTotalItems] = useState();
  const [items, setItems] = useState([])
  const [category, setCategory] = useState([])
  const [item_id, setItemId] = useState('')
  const [categoryList, setCategoryList] = useState([])
  const [warehouseId, setWarehouseId] = useState();
  const [rowIndex, setRowIndex] = useState(0)
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const [taxeList, setTaxeList] = useState([])
  const [create, setCreate] = useState(false)
  const [image] = useState([]);
  const [value, setValue] = useState(0);
  const [update, setUpdate] = useState(false)

  const handleChangeTab = (event, val) => {
    setValue(val);
  };
  const [tabs, setTabs] = useState(['Overview', 'History'])

  const unitList = [
    {
      'unit': 'Box'
    },
    {
      'unit': 'Dozen'
    },
    {
      'unit': 'Grams'
    },
    {
      'unit': 'Kilograms'
    },
    {
      'unit': 'Liters'
    },
    {
      'unit': 'Meters'
    },
    {
      'unit': 'Pairs'
    },
    {
      'unit': 'Pieces'
    },
    {
      'unit': 'Tablets'
    },
    {
      'unit': 'Units'
    },
  ]

  const [inputFields, setInputFields] = useState([
    { warehouse_id: 0, opening_stock: 0, reorder_level: 0, default: false, }
  ]);

  const addFields = () => {
    const newfield = { warehouse_id: 0, opening_stock: 0, reorder_level: 0, default: false };
    setInputFields([...inputFields, newfield]);
  };

  const removeFields = (index) => {
    const data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };

  const handleWarehouseChange = (event, index, objIdx) => {
    setUpdate(true)
    const itemsList = [...inputFields];
    if (objIdx === 0) { itemsList[index].warehouse_id = event.target.value; } else if (objIdx === 1) { itemsList[index].opening_stock = event.target.value; } else if (objIdx === 2) { itemsList[index].reorder_level = event.target.value; } else { itemsList[index].reorder_level = event.target.value; }
    setInputFields(itemsList);
  };

  const [data, setData] = useState({
    'name': '',
    'type': 'Product',
    'sku': '',
    'category': '',
    'description': '',
    'purchase_price': '',
    'sale_price': '',
    "total_stock": '',
    "items": {},
    "category_id": '',
    "barcode": "",
    "picture": '',
    "tax_id": '',
    "unit": ''
  })
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

    if (taxes?.length === 0 && companyID !== '') {
      axiosInstance
        .get(`/taxes?company_id=${companyID}`, {
          headers: {
            Authorization: localStorage.getItem('authorizationValue')
          }
        })
        .then((res) => {
          dispatch(getTaxes(res?.data?.data));
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

    if (companyID !== '') {
      axiosInstance
        .get(`/inventory-items?company_id=${companyID}&page=${currentPageNo}`, {
          headers: {
            Authorization: localStorage.getItem('authorizationValue')
          }
        })
        .then((res) => {
          var data;
          dispatch(getItems(res?.data?.data))
          if (itemList.length == 0) {
            setAllItemsData(res?.data?.data?.map((data) => [data.items.data.map((item) => item.warehouse_id), [data.name, data.sku], data.category.name, [data.sale_price_formatted, data.purchase_price_formatted], data.total_stock, data.id]));
            data = res?.data?.data[0]
          }
          else {
            setAllItemsData(itemList?.map((data) => [data.items.data.map((item) => item.warehouse_id), [data.name, data.sku], data.category.name, [data.sale_price_formatted, data.purchase_price_formatted], data.total_stock, data.id]));
            data = allItemsData[0]
          }
          var barcodeNumber = data.barcode.number
          if (barcodeNumber === null) {
            barcodeNumber = "null"
          }
          setData({
            'company_id': Number(companyID),
            'name': data.name,
            'description': data.description,
            'sale_price': data.sale_price,
            'purchase_price': data.purchase_price,
            'type': data.type,
            'category_id': data.category_id,
            'sku': data.sku,
            'total_stock': data.total_stock,
            'barcode': barcodeNumber,
            'picture': data.picture,
            'tax_ids[0]': data.tax_id,
            'unit': data.unit
          })
          setInputFields(data.items.data)
          setItems([data.items.data])
          setCategory(data.category)
          setCategoryList([data.category])
          setTaxeList(data.taxes.data)
          setTotalItems(res?.data?.meta?.total);
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
      .delete(`/items/${id}?company_id=${companyID}`, {
        headers: {
          Authorization: localStorage.getItem('authorizationValue')
        }
      })
      .then((resData) => {
        axiosInstance
          .get(`/items?company_id=${companyID}&page=${currentPageNo}&limit=${10}`, {
            headers: {
              Authorization: localStorage.getItem('authorizationValue')
            }
          })
          .then((res) => {
            setAllItemsData(res?.data?.data?.map((data) => [data.name, data.category.name, [data.sale_price_formatted, data.purchase_price_formatted], data.total_stock, data.id, data.id]));
            setTotalItems(res?.data?.meta?.total);
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
    name: false,
    total_stock: false,
    prices: false
  }])

  const names = [
    {
      id: 'name',
      name: 'Name',
      status: filterStatus.name
    },
    {
      id: 'prices',
      name: 'Prices',
      status: filterStatus.prices
    },
    {
      id: 'total_stock',
      name: 'Total Stock',
      status: filterStatus.total_stock
    }
  ];


  const [openFilter, setopenFilter] = useState(false);

  const handleClick = () => {
    closeRightDrawer()
    setopenFilter(!openFilter);
  };

  const handleChangeColumnFilter = (event) => {
    var value = event.target.value
    if (value === "name") {
      setFilterStatus({
        name: !filterStatus.name,
        total_stock: filterStatus.total_stock,
        prices: filterStatus.prices
      })
    }
    else if (value === "total_stock") {
      setFilterStatus({
        name: filterStatus.name,
        total_stock: !filterStatus.total_stock,
        prices: filterStatus.prices
      })
    }
    else if (value === "prices") {
      setFilterStatus({
        name: filterStatus.name,
        total_stock: filterStatus.total_stock,
        prices: !filterStatus.prices
      })
    }
  };

  const columns = [
    {
      name: <div>Warehouse</div>,
      options: {
        filter: true,
        sort: false,
        display: false,
        customBodyRender: (value) => (
          <>
            {value.length != 0 ?
              <>
                <div>{value.join(",")}</div>
              </> : <>No Warehouse</>}
          </>
        )
      },
    },
    {
      name: <div>Name</div>,
      options: {
        filter: filterStatus.name,
        sort: false,
        customBodyRender: (value) => (
          <><div className={customClasses.itemName}>{value[0]}</div>
            <div className={customClasses.columnText}>{value[1]}</div></>
        )
      },
    },
    {
      name: 'Category',
      options: {
        filter: true,
        sort: false,
        display: columnVisibility,
        customBodyRender: (value) => (
          <div className={customClasses.columnText}>{value}</div>
        )
      }
    },
    {
      name: <div>
        <div>Sale Price</div>
        <div>Purchase Price</div>
      </div>,
      options: {
        filter: filterStatus.prices,
        sort: false,
        display: columnVisibility,
        customBodyRender: (value) => <div className={customClasses.columnText}>
          <div>{value[0]}</div>
          <div>{value[1]}</div>
        </div>
      },
    },
    {
      name: 'Total Stock',
      options: {
        filter: filterStatus.total_stock,
        sort: false,
        display: columnVisibility,
        customBodyRender: (value) => (
          <div className={customClasses.columnText}>{value}</div>
        )
      }
    },
    {
      name: 'Action',
      options: {
        filter: false,
        sort: false,
        display: columnVisibility,
        customBodyRender: (value) => (
          <><Link to={`/app/update/${value}/item/`} className=""><Icon>edit</Icon></Link>
            <span className='' onClick={() => handleDelete(value)}><Icon>delete</Icon></span>
            <Box component="div" sx={{ display: 'none' }}>{value}</Box>
          </>
        )
      }
    },
  ];

  const options = {
    filterType: 'dropdown',
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
    searchPlaceholder: "search by category & warehouse ID",
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
    customSearch: (searchQuery, currentRow, columns) => {
      var category = currentRow[2].toLowerCase().startsWith(searchQuery)
      var warehouse = currentRow[0].indexOf(parseInt(searchQuery))
      if (category == true || warehouse != -1) {
        return true;
      }
      else {
        return false;
      }
    },
    customToolbar: () => {
      return (
        <></>
      );
    }
  }

  const handleRowClick = (rowData, rowMeta) => {
    setRowIndex(rowMeta.rowIndex)
    var item_id = rowData[5].props.children[2].props.children
    setItemId(item_id)
    var filtered_data = itemList.filter(item => {
      return item.id == item_id
    })
    var history_data = histories.filter(item => {
      return item.item_id == item_id
    })
    setHistoryData(history_data?.map((data) => [data.created_at, data.warehouse_id, data.quantity]));
    var item_data = filtered_data[0]
    var barcodeNumber = item_data.barcode.number
    if (barcodeNumber === null) {
      barcodeNumber = "null"
    }
    setData({
      'company_id': Number(companyID),
      'name': item_data.name,
      'description': item_data.description,
      'sale_price': item_data.sale_price,
      'purchase_price': item_data.purchase_price,
      'type': item_data.type,
      'category_id': item_data.category_id,
      'sku': item_data.sku,
      'total_stock': item_data.total_stock,
      'barcode': barcodeNumber,
      'picture': item_data.picture,
      'tax_ids[0]': item_data.tax_id,
      'unit': item_data.unit
    })
    setItems(item_data.items.data)
    setCategory([item_data.category])
    setCategoryList([item_data.category])
    setTaxeList(item_data.taxes.data)
    if (item_data.items.data.length > 0) {
      setInputFields(item_data.items.data)
      setIsChecked(true)
    }
    else {
      setIsChecked(false)
    }
    setValue(0);
    setUpdate(false)
    setCreate(false)
    openRightDrawer()
  };

  useEffect(() => {
    const abortController = new AbortController();

    if (histories?.length === 0 && companyID !== '') {
      axiosInstance
        .get(`/histories?company_id=${companyID}`, {
          headers: {
            Authorization: localStorage.getItem('authorizationValue')
          }
        })
        .then((res) => {
          dispatch(gethistories(res?.data?.data));
          if (histories.length == 0) {
            setHistoryData(res?.data?.data?.map((data) => [data.created_at, data.warehouse_id, data.quantity]));
          }
          else {
            setHistoryData(historyData?.map((data) => [data.created_at, data.warehouse_id, data.quantity]));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return () => {
      abortController.abort();
    };
  }, [companyID]);


  const historyColumns = [
    {
      name: 'Date',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => (
          <div>{moment(data.created_at).format('llll')}</div>
        )
      },
    },
    {
      name: 'Warehouse',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => (
          <div>{value}</div>
        )
      },
    },
    {
      name: 'Quantity',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => (
          <div>{value}</div>
        )
      },
    }
  ];


  const historyOptions = {
    responsive: 'vertical',
    rowHover: true,
    filter: false,
    search: false,
    viewColumns: false,
    download: false,
    print: false,
    resizableColumns: false,
    rowsPerPage: [25],
    rowsPerPageOptions: [10, 25, 50, 100],
    selectableRows: false
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
  const uploadImage = () => { }



  const handleUpdateCancel = () => {
    setUpdate(false)
  }


  const handleCreateForm = () => {
    setData({
      "name": "",
      "category": "",
      "description": "",
      "purchase_price": "",
      "sale_price": "",
      "type": "",
      "sku": "",
      "total_stock": "",
      "category_id": "",
      "barcode": "",
      "picture": "",
      "tax_id": "",
      "unit": ''
    })
    setItems([])
    setCategoryList(categories)
    setInputFields([])
    setTaxeList(taxes)
    openRightDrawer()
    setCreate(true)
  }


  const handleCreate = () => {
    axiosInstance
      .post(`/items`, data, {
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


  const handleUpdate = () => {
    axiosInstance
      .patch(`/items/${item_id}?company_id=${companyID}`, data, {
        headers: {
          Authorization: localStorage.getItem('authorizationValue')
        }
      })
      .then((res) => {
        alert("Updated")
        // console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const [isChecked, setIsChecked] = useState(false);
  const handleInventory = () => {
    setIsChecked(!isChecked);
  };


  const title = 'Item';
  const description = 'This is item page';
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
      <Paper className={customClasses.root}>
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
            data={allItemsData}
            columns={columns}
            options={options}
          />
          </div>
          }
        </MuiThemeProvider >
        <RightSidebar
          data={data}
          items={items}
          historyData={historyData}
          historyColumns={historyColumns}
          historyOptions={historyOptions}
          isChecked={isChecked}
          unitList={unitList}
          inputFields={inputFields}
          value={value}
          setValue={setValue}
          tabs={tabs}
          handleChangeTab={handleChangeTab}
          setInputFields={setInputFields}
          handleInventory={handleInventory}
          handleCreateForm={handleCreateForm}
          handleCreate={handleCreate}
          handleChange={handleChange}
          handleUpdate={handleUpdate}
          categoryList={categoryList}
          uploadImage={uploadImage}
          warehouses={warehouses}
          addFields={addFields}
          setUpdate={setUpdate}
          handleUpdateCancel={handleUpdateCancel}
          update={update}
          create={create}
          handleWarehouseChange={handleWarehouseChange}
          setCreate={setCreate} />
      </Paper >
    </>
  );
}

Item.propTypes = {
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


const ItemMaped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Item);

export default (withStyles(styles)(ItemMaped));