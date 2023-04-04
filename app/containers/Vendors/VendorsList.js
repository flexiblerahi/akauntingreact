/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '@material-ui/core/Chip';
import MUIDataTable from 'mui-datatables';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance';
import {
  getCurrencies
} from '../../redux-store/slice/currenciesSlice';

const styles = theme => ({
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

function VendorsList(props) {
  const { companyID } = props;
  const [vendors, setVendors] = useState([]);
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const [totalItems, setTotalItems] = useState();
  const [rowsPerPages, setRowsPerPages] = useState(15);

  const currencies = useSelector((state) => state.currencies.currencies);
  const dispatch = useDispatch();

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

    if (companyID !== '') {
      axiosInstance
        .get(`/contacts?company_id=${companyID}&page=${currentPageNo}&limit=${rowsPerPages}&search=type:vendor`, {
          headers: {
            Authorization: localStorage.getItem('authorizationValue')
          }
        })
        .then((res) => {
          setVendors(res?.data?.data?.map((data) => [[data.name, data.tax_number], [data.email, data.phone], [data.address, data.currency_code], data.id]));
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
      .delete(`/contacts/${id}`, {
        headers: {
          Authorization: localStorage.getItem('authorizationValue')
        }
      })
      .then((resData) => {
        axiosInstance
          .get(`/contacts?company_id=${companyID}&page=${currentPageNo}&limit=${rowsPerPages}`, {
            headers: {
              Authorization: localStorage.getItem('authorizationValue')
            }
          })
          .then((res) => {
            setVendors(res?.data?.data?.map((data) => [[data.name, data.tax_number], [data.email, data.phone], [data.address, data.currency_code], data.id]));
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
      name: <div>
        <div>Name</div>
        <div>Tax Number</div>
      </div>,
      options: {
        filter: true,
        customBodyRender: (value) => <>
          <div>{value[0]}</div>
          <div>{value[1]}</div>
        </>
      },
    },
    {
      name: <div>
        <div>Email</div>
        <div>Phone</div>
      </div>,
      options: {
        filter: true,
        customBodyRender: (value) => <>
          <div>{value[0]}</div>
          <div>{value[1]}</div>
        </>
      },
    },
    {
      name: <div>
        <div>Address</div>
        <div>Currency</div>
      </div>,
      options: {
        filter: true,
        customBodyRender: (value) => <>
          <div>{value[0]}</div>
          <div>{value[1]}</div>
        </>
      },
    },
    {
      name: 'Action',
      options: {
        filter: false,
        customBodyRender: (value) => (
          <><Link to={`/app/update/${value}/vendor`} className=""><Icon>edit</Icon></Link>
            <span className='' onClick={() => handleDelete(value)}><Icon>delete</Icon></span></>
        )
      }
    }
  ];

  const options = {
    filter: true,
    filterType: 'dropdown',
    responsive: 'vertical',
    print: true,
    serverSide: true,
    rowsPerPage: [rowsPerPages],
    rowsPerPageOptions: [rowsPerPages],
    count: totalItems,
    onChangePage(currentPage) {
      setCurrentPageNo(currentPage + 1);
    },
  };

  const { classes } = props;

  return (
    <>
      <Link className='MuiButtonBase-root MuiButton-root MuiButton-contained StandardButtons-button-321 MuiButton-containedPrimary' to='/app/create/vendor'>Create Vendor</Link>
      <div className={classes.table}>
        <MUIDataTable
          title="Vendors list"
          data={vendors}
          columns={columns}
          options={options}
        />
      </div>
    </>
  );
}

VendorsList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(VendorsList);
