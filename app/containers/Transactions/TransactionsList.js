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
  getCategories,
} from '../../redux-store/slice/categoriesSlice';
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

function TransactionList(props) {
  const { companyID } = props;
  const [incomeTransactions, setIncomeTransactions] = useState([]);
  const [expenseTransactions, setExpenseTransactions] = useState([]);
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const [totalItems, setTotalItems] = useState();
  const [rowsPerPages, setRowsPerPages] = useState(15);

  const categories = useSelector((state) => state.categories.categories);
  const currencies = useSelector((state) => state.currencies.currencies);
  const accounts = useSelector((state) => state.accounts.accounts);
  const dispatch = useDispatch();

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

  useEffect(() => {
    const abortController = new AbortController();

    if (companyID !== '') {
      axiosInstance
        .get(`/transactions?company_id=${companyID}&page=${currentPageNo}&limit=${rowsPerPages}&search=type:income`, {
          headers: {
            Authorization: localStorage.getItem('authorizationValue')
          }
        })
        .then((res) => {
          setIncomeTransactions(res?.data?.data?.map((data) => [[new Date(data.paid_at).toLocaleDateString('en-US'), data.number], [data.type, data.category.name], data.account.name, [data.contact.name, data.contact.tax_number], data.amount_formatted, data.id]));
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

  useEffect(() => {
    const abortController = new AbortController();

    if (companyID !== '') {
      axiosInstance
        .get(`/transactions?company_id=${companyID}&page=${currentPageNo}&limit=${rowsPerPages}&search=type:expense`, {
          headers: {
            Authorization: localStorage.getItem('authorizationValue')
          }
        })
        .then((res) => {
          setExpenseTransactions(res?.data?.data?.map((data) => [[new Date(data.paid_at).toLocaleDateString('en-US'), data.number], [data.type, data.category.name], data.account.name, [data.contact.name, data.contact.tax_number], data.amount_formatted, data.id]));
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
      .delete(`/transactions/${id}`, {
        headers: {
          Authorization: localStorage.getItem('authorizationValue')
        }
      })
      .then((resData) => {
        axiosInstance
          .get(`/transactions?company_id=${companyID}&page=${currentPageNo}&limit=${rowsPerPages}&search=type:income`, {
            headers: {
              Authorization: localStorage.getItem('authorizationValue')
            }
          })
          .then((res) => {
            console.log(res)
            setIncomeTransactions(res?.data?.data?.map((data) => [[new Date(data.paid_at).toLocaleDateString('en-US'), data.number], [data.type, data.category.name], data.account.name, [data.contact.name, data.contact.tax_number], data.amount_formatted, data.id]));
            setTotalItems(res?.data?.meta?.total);
            setRowsPerPages(res?.data?.meta?.per_page);
          })
          .catch((err) => {
            console.log(err);
          });

        axiosInstance
          .get(`/transactions?company_id=${companyID}&page=${currentPageNo}&limit=${rowsPerPages}&search=type:expense`, {
            headers: {
              Authorization: localStorage.getItem('authorizationValue')
            }
          })
          .then((res) => {
            setExpenseTransactions(res?.data?.data?.map((data) => [[new Date(data.paid_at).toLocaleDateString('en-US'), data.number], [data.type, data.category.name], data.account.name, [data.contact.name, data.contact.tax_number], data.amount_formatted, data.id]));
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
        <div>Date</div>
        <div>Number</div>
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
        <div>Type</div>
        <div>Category</div>
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
        Account
      </div>,
      options: {
        filter: true,
      },
    },
    {
      name: <div>
        <div>Contact</div>
        <div>Document</div>
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
        Amount
      </div>,
      options: {
        filter: true,
      },
    },
    {
      name: 'Action',
      options: {
        filter: false,
        customBodyRender: (value) => (
          <><Link to={`/app/update/${value}/transaction`} className=""><Icon>edit</Icon></Link>
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
      <Link className='MuiButtonBase-root MuiButton-root MuiButton-contained StandardButtons-button-321 MuiButton-containedPrimary' to='/app/create/transaction/'>Create Transaction</Link>
      <div className={classes.table}>
        <MUIDataTable
          title="Income Transactions"
          data={incomeTransactions}
          columns={columns}
          options={options}
        />
      </div>
      <br></br>
      <div className={classes.table}>
        <MUIDataTable
          title="Expense Transactions"
          data={expenseTransactions}
          columns={columns}
          options={options}
        />
      </div>
    </>
  );
}

TransactionList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TransactionList);
