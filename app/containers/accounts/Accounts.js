/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '@material-ui/core/Chip';
import MUIDataTable from 'mui-datatables';
import { Link } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
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

function Accounts(props) {
  const { companyID } = props;
  const [allAccountsData, setAllAccountsData] = useState([]);
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const [totalItems, setTotalItems] = useState();
  const [rowsPerPages, setRowsPerPages] = useState(15);
  const currencies = useSelector((state) => state.currencies.currencies);
  const dispatch = useDispatch();

  useEffect(() => {
    const abortController = new AbortController();

    if (companyID !== '') {
      axiosInstance
        .get(`/accounts?company_id=${companyID}&page=${currentPageNo}&limit=${rowsPerPages}`, {
          headers: {
            Authorization: localStorage.getItem('authorizationValue')
          }
        })
        .then((res) => {
          setAllAccountsData(res?.data?.data?.map((data) => [[data.name, data.number], [data.bank_name, data.bank_phone], data.current_balance_formatted, data.id]));
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
  }, [currentPageNo]);

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

  const handleDelete = (id) => {
    axiosInstance
      .delete(`/accounts/${id}?company_id=${companyID}`, {
        headers: {
          Authorization: localStorage.getItem('authorizationValue')
        }
      })
      .then((resData) => {
        axiosInstance
          .get(`/accounts?company_id=${companyID}&page=${currentPageNo}&limit=${rowsPerPages}`, {
            headers: {
              Authorization: localStorage.getItem('authorizationValue')
            }
          })
          .then((res) => {
            setAllAccountsData(res?.data?.data?.map((data) => [[data.name, data.number], [data.bank_name, data.bank_phone], data.current_balance_formatted, data.id]));
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
        <div>Number</div>
      </div>,
      options: {
        filter: true,
        customBodyRender: (value) => <>
          <div>{value[0]}</div>
          <div>{value[1]}</div>
        </>
      }
    },
    {
      name: <div>
        <div>Bank Name</div>
        <div>Phone</div>
      </div>,
      options: {
        filter: true,
        customBodyRender: (value) => <>
          <div>{value[0]}</div>
          <div>{value[1] === null ? 'N/A' : value[1]}</div>
        </>
      }
    },
    {
      name: 'Current Balance',
      options: {
        filter: true,
      }
    }, {
      name: <div>
        <div>Action</div>
      </div>,
      options: {
        filter: false,
        customBodyRender: (value) => <>
          <><Link to={`/app/update/${value}/accounts/`} className="MuiButtonBase-root MuiButton-root MuiButton-contained StandardButtons-button-321 MuiButton-containedPrimary"><Icon>edit</Icon></Link>
            <button className='MuiButtonBase-root MuiButton-root MuiButton-contained StandardButtons-button-321' onClick={() => handleDelete(value)}><Icon>delete</Icon></button></>
        </>
      }
    },
    // {
    //   name: 'Status',
    //   options: {
    //     filter: true,
    //     customBodyRender: (value) => {
    //       if (value === 'active') {
    //         return (<Chip label="Active" color="secondary" />);
    //       }
    //       if (value === 'non-active') {
    //         return (<Chip label="Non Active" color="primary" />);
    //       }
    //       return (<Chip label="Unknown" />);
    //     }
    //   }
    // },
    // {
    //   name: 'Salary',
    //   options: {
    //     filter: true,
    //     customBodyRender: (value) => {
    //       const nf = new Intl.NumberFormat('en-US', {
    //         style: 'currency',
    //         currency: 'USD',
    //         minimumFractionDigits: 2,
    //         maximumFractionDigits: 2
    //       });

    //       return nf.format(value);
    //     }
    //   }
    // },
  ];

  // const data = [
  //   ['Gabby George', 'Business Analyst', 30, 'active', 100000],
  //   ['Aiden Lloyd', 'Business Consultant', 55, 'active', 200000],
  //   ['Jaden Collins', 'Attorney', 27, 'non-active', 500000],
  //   ['Franky Rees', 'Business Analyst', 90, 'active', 50000],
  //   ['Aaren Rose', 'Business Consultant', 28, 'unknown', 75000],
  //   ['Blake Duncan', 'Business Management Analyst', 65, 'active', 94000],
  //   ['Frankie Parry', 'Agency Legal Counsel', 71, 'non-active', 210000],
  //   ['Lane Wilson', 'Commercial Specialist', 19, 'active', 65000],
  //   ['Robin Duncan', 'Business Analyst', 20, 'unknown', 77000],
  //   ['Mel Brooks', 'Business Consultant', 89, 'active', 135000],
  //   ['Harper White', 'Attorney', 52, 'non-active', 420000],
  //   ['Kris Humphrey', 'Agency Legal Counsel', 80, 'active', 150000],
  //   ['Frankie Long', 'Industrial Analyst', 31, 'active', 170000],
  //   ['Brynn Robbins', 'Business Analyst', 22, 'active', 90000],
  //   ['Justice Mann', 'Business Consultant', 76, 'non-active', 33000],
  //   ['Addison Navarro', 'Business Management Analyst', 50, 'non-active', 295000],
  //   ['Jesse Welch', 'Agency Legal Counsel', 28, 'active', 100000],
  //   ['Eli Mejia', 'Commercial Specialist', 65, 'active', 400000],
  //   ['Gene Leblanc', 'Industrial Analyst', 100, 'active', 110000],
  //   ['Danny Leon', 'Computer Scientist', 60, 'non-active', 220000],
  //   ['Lane Lee', 'Corporate Counselor', 52, 'unknown', 180000],
  //   ['Jesse Hall', 'Business Analyst', 44, 'active', 99000],
  //   ['Danni Hudson', 'Agency Legal Counsel', 37, 'active', 90000],
  //   ['Terry Macdonald', 'Commercial Specialist', 39, 'active', 140000],
  //   ['Justice Mccarthy', 'Attorney', 26, 'active', 330000],
  //   ['Silver Carey', 'Computer Scientist', 10, 'active', 250000],
  //   ['Franky Miles', 'Industrial Analyst', 49, 'active', 190000],
  //   ['Glen Nixon', 'Corporate Counselor', 15, 'non-active', 80000],
  //   ['Gabby Strickland', 'Business Process Consultant', 26, 'unknown', 45000],
  //   ['Mason Ray', 'Computer Scientist', 39, 'active', 142000]
  // ];

  const options = {
    filterType: 'dropdown',
    responsive: 'vertical',
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
      <Link className='MuiButtonBase-root MuiButton-root MuiButton-contained StandardButtons-button-321 MuiButton-containedPrimary' to='/app/create/account'>Create Account</Link>
      <div className={classes.table}>
        <MUIDataTable
          title="Accounts list"
          data={allAccountsData}
          columns={columns}
          options={options}
        />
      </div>
    </>
  );
}

Accounts.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Accounts);
