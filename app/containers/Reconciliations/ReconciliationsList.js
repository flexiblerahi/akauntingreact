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
  getWarehouses
} from '../../redux-store/slice/warehouseSlice';

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

function ReconciliationsList(props) {
  const { companyID } = props;
  const [reconciliations, setReconciliations] = useState([]);
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const [totalItems, setTotalItems] = useState();
  const [rowsPerPages, setRowsPerPages] = useState(15);

  useEffect(() => {
    const abortController = new AbortController();

    if (companyID !== '') {
      axiosInstance
        .get(`/reconciliations?company_id=${companyID}&page=${currentPageNo}&limit=${rowsPerPages}`, {
          headers: {
            Authorization: localStorage.getItem('authorizationValue')
          }
        })
        .then((res) => {
          setReconciliations(res?.data?.data?.map((data) => [new Date(data.created_at).toLocaleDateString('en-US'), data.account.name, [new Date(data.started_at).toLocaleDateString('en-US'), new Date(data.ended_at).toLocaleDateString('en-US')], [data.account.opening_balance_formatted, data.closing_balance_formatted], data.id]));
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
      .delete(`/reconciliations/${id}`, {
        headers: {
          Authorization: localStorage.getItem('authorizationValue')
        }
      })
      .then((resData) => {
        axiosInstance
          .get(`/reconciliations?company_id=${companyID}&page=${currentPageNo}&limit=${rowsPerPages}`, {
            headers: {
              Authorization: localStorage.getItem('authorizationValue')
            }
          })
          .then((res) => {
            setReconciliations(res?.data?.data?.map((data) => [new Date(data.created_at).toLocaleDateString('en-US'), data.account.name, [new Date(data.started_at).toLocaleDateString('en-US'), new Date(data.ended_at).toLocaleDateString('en-US')], [data.account.opening_balance_formatted, data.closing_balance_formatted], data.id]));
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
        <div>Created Date</div>
      </div>,
      options: {
        filter: true,
      },
    },
    {
      name: <div>
        <div>Account</div>
      </div>,
      options: {
        filter: true,
      },
    },
    {
      name: <div>
        <div>Period</div>
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
        <div>Opening Balance</div>
        <div>Closing Balance</div>
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
          <><span className='' onClick={() => handleDelete(value)}><Icon>delete</Icon></span></>
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
      <div className={classes.table}>
        <MUIDataTable
          title="Reconciliations list"
          data={reconciliations}
          columns={columns}
          options={options}
        />
      </div>
    </>
  );
}

ReconciliationsList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ReconciliationsList);
