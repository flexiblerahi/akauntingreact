import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import styles from './sidebarBig-jss';
import MainMenuBig from './MainMenuBig';

function SidebarBig(props) {
  const {
    classes,
    dataMenu,
    loadTransition,
    open,
    userAttr,
    toggleDrawerOpen,
    userData,
    companyID,
    setCompanyID
  } = props;

  return (
    <Fragment>
      <Hidden lgUp>
        <SwipeableDrawer
          onClose={toggleDrawerOpen}
          onOpen={toggleDrawerOpen}
          open={!open}
          anchor="left"
        >
          <div className={classes.swipeDrawerPaper}>
            <MainMenuBig
              dataMenu={dataMenu}
              loadTransition={loadTransition}
              drawerPaper
              userAttr={userAttr}
              toggleDrawerOpen={toggleDrawerOpen}
              mobile
            />
          </div>
        </SwipeableDrawer>
      </Hidden>
      <Hidden mdDown>
        <div>
          <MainMenuBig
            dataMenu={dataMenu}
            loadTransition={loadTransition}
            drawerPaper={open}
            userAttr={userAttr}
            userData={userData}
            companyID={companyID}
            setCompanyID={setCompanyID}
          />
        </div>
      </Hidden>
    </Fragment>
  );
}

SidebarBig.propTypes = {
  classes: PropTypes.object.isRequired,
  dataMenu: PropTypes.array.isRequired,
  loadTransition: PropTypes.func.isRequired,
  toggleDrawerOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  userAttr: PropTypes.object.isRequired,
};

export default withStyles(styles)(SidebarBig);
