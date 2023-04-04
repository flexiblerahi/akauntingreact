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
import {
  getAccounts
} from '../../redux-store/slice/accountsSlice';

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

function TransfersList(props) {
  const { companyID } = props;
  const [transfers, setTransfers] = useState([]);
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const [totalItems, setTotalItems] = useState();
  const [rowsPerPages, setRowsPerPages] = useState(15);

  const currencies = useSelector((state) => state.currencies.currencies);
  const accounts = useSelector((state) => state.accounts.accounts);
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

  useEffect(() => {
    const abortController = new AbortController();

    if (companyID !== '') {
      axiosInstance
        .get(`/transfers?company_id=${companyID}&page=${currentPageNo}&limit=${rowsPerPages}`, {
          headers: {
            Authorization: localStorage.getItem('authorizationValue')
          }
        })
        .then((res) => {
          setTransfers(res?.data?.data?.map((data) => [[new Date(data.created_at).toLocaleDateString('en-US'), data.reference], [data.from_account, data.to_account], [data.from_account_id, data.to_account_id], [data.amount_formatted, data.amount_formatted], data.id]));
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
      .delete(`/transfers/${id}`, {
        headers: {
          Authorization: localStorage.getItem('authorizationValue')
        }
      })
      .then((resData) => {
        axiosInstance
          .get(`/transfers?company_id=${companyID}&page=${currentPageNo}&limit=${rowsPerPages}`, {
            headers: {
              Authorization: localStorage.getItem('authorizationValue')
            }
          })
          .then((res) => {
            setTransfers(res?.data?.data?.map((data) => [[new Date(data.created_at).toLocaleDateString('en-US'), data.reference], [data.from_account, data.to_account], [data.from_account_id, data.to_account_id], [data.amount_formatted, data.amount_formatted], data.id]));
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
        <div>Created at</div>
        <div>Reference</div>
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
        <div>From Account</div>
        <div>To Account</div>
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
        <div>From Rate</div>
        <div>To Rate</div>
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
        <div>From Amount</div>
        <div>To Amount</div>
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
          <><Link to={`/app/update/${value}/transfer/order`} className=""><Icon>edit</Icon></Link>
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
      <Link className='MuiButtonBase-root MuiButton-root MuiButton-contained StandardButtons-button-321 MuiButton-containedPrimary' to='/app/create/transfer'>Create Transfer</Link>
      <div className={classes.table}>
        <MUIDataTable
          title="Transfer list"
          data={transfers}
          columns={columns}
          options={options}
        />
      </div>
    </>
  );
}

TransfersList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TransfersList);
