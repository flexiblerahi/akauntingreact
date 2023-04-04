/* eslint-disable quotes */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Type from "enl-styles/Typography.scss";
import classNames from "classnames";
import Divider from "@material-ui/core/Divider";
import axiosInstance from "../../services/axiosInstance";

const styles = {
  row: {
    display: "flex",
    justifyContent: "flex-start",
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 100,
    height: 60,
  },
};

function CompanyDetails(props) {
  const { classes } = props;
  const { id } = useParams();
  const [company, setCompany] = useState();
  useEffect(() => {
    axiosInstance
      .get(`/companies/${id}`, {
        headers: {
          Authorization: localStorage.getItem("authorizationValue"),
        },
      })
      .then((res) => {
        setCompany(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Grid container alignItems="flex-start" justifyContent="flex-start" direction="row" spacing={2}>
        <Grid item md={1}>
          <Avatar className={classes.purpleAvatar}>OP</Avatar>
        </Grid>
        <Grid item md={2}>
          <p>{company?.email}</p>
          <p>01200000000</p>
        </Grid>
      </Grid>
      <Grid container alignItems="flex-start" justifyContent="flex-start" direction="row" spacing={2}>
        <Grid item md={1}></Grid>
        <Grid item md={5}>
          <div>
            <p className={Type.bold}>Phone</p>
            <p className={Type.regular}>01200000000</p>
          </div>
          <div>
            <p className={Type.bold}>Stage</p>
            <p className={Type.regular}>Customer</p>
          </div>
          <div>
            <p className={Type.bold}>Mobile</p>
            <p className={Type.regular}>01200000000</p>
          </div>
          <div>
            <p className={Type.bold}>Website</p>
            <p className={Type.regular}>{company?.domain === undefined ? "No Website" : company?.domain}</p>
          </div>
          <div>
            <p className={Type.bold}>Fax Number</p>
            <p className={Type.regular}>2141</p>
          </div>
          <div>
            <p className={Type.bold}>Address</p>
            <p className={Type.regular}>{company?.address === undefined ? "No Address" : company?.address}</p>
          </div>
          <Divider className={classes.divider} />
          <Grid container alignItems="flex-start" justifyContent="space-between" direction="row" spacing={2}>
            <Grid item md={3}>
              <p className={Type.regular}>Contacts</p>
            </Grid>
            <Grid item md={2}>
              <button>Add Contacts</button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

CompanyDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CompanyDetails);
