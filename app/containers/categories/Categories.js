import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance';

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

function Categories(props) {
  const { companyID } = props;
  const [allCategoriesData, setAllCategoriesData] = useState([]);
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const [totalItems, setTotalItems] = useState();
  const [rowsPerPages, setRowsPerPages] = useState(15);

  useEffect(() => {
    const abortController = new AbortController();

    if (companyID !== '') {
      axiosInstance
        .get(`/categories?company_id=${companyID}&page=${currentPageNo}&limit=${rowsPerPages}`, {
          headers: {
            Authorization: localStorage.getItem('authorizationValue')
          }
        })
        .then((res) => {
          setAllCategoriesData(res?.data?.data?.map((data) => [data.name, data.type, data.color, data.id]));
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
  }, [companyID]);

  const handleDelete = (id) => {
    axiosInstance
      .delete(`/categories/${id}?company_id=${companyID}`, {
        headers: {
          Authorization: localStorage.getItem('authorizationValue')
        }
      })
      .then((resData) => {
        axiosInstance
          .get(`/categories?company_id=${companyID}&page=${currentPageNo}&limit=${rowsPerPages}`, {
            headers: {
              Authorization: localStorage.getItem('authorizationValue')
            }
          })
          .then((res) => {
            setAllCategoriesData(res?.data?.data?.map((data) => [data.name, data.type, data.color, data.id]));
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
      name: 'Name',
      options: {
        filter: true
      }
    },
    {
      name: 'Type',
      options: {
        filter: true,
      }
    },
    {
      name: 'Colour',
      options: {
        filter: true,
        customBodyRender: (value) => <>
          <div style={{
            background: value, width: '25px', height: '25px', borderRadius: '50%'
          }} > </div>
        </>
      }
    },
    {
      name: 'Action',
      options: {
        filter: true,
        customBodyRender: (value) => <>
          <>
            <Link to={`/app/update/${value}/categories/`}><Icon>edit</Icon></Link>
            <button className='' onClick={() => handleDelete(value)}><Icon>delete</Icon></button>
          </>
        </>
      }
    },
    // {
    //   name: 'KPI',
    //   options: {
    //     filter: false,
    //     customBodyRender: (value) => (
    //       <LinearProgress variant="determinate" color="secondary" value={value} />
    //     )
    //   }
    // },
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
      <Link to='/app/create/categories/'>New Category</Link>
      <div className={classes.table}>
        <MUIDataTable
          title="Categories list"
          data={allCategoriesData}
          columns={columns}
          options={options}
        />
      </div>
    </>
  );
}

Categories.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Categories);
