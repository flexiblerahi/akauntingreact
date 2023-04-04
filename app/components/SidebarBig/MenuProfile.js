import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ButtonBase from '@material-ui/core/ButtonBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import dummy from 'enl-api/dummy/dummyContents';
import { injectIntl, FormattedMessage } from 'react-intl';
import messages from 'enl-api/ui/menuMessages';
import styles from './sidebarBig-jss';

function MenuProfile(props) {
  const {
    classes, userAttr, userData, companyID, setCompanyID
  } = props;
  const [status, setStatus] = useState(dummy.user.status);
  const [anchorEl, setAnchorEl] = useState(null);

  const setStatusIntoClass = st => {
    switch (st) {
      case 'online':
        return classes.online;
      case 'idle':
        return classes.idle;
      case 'bussy':
        return classes.bussy;
      default:
        return classes.offline;
    }
  };

  const handleOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeStatus = newStatus => {
    setStatus(newStatus);
    handleClose();
  };

  const handleCompanyID = (id) => {
    setCompanyID(id);
    // localStorage.setItem('companyID', id);
    // setCompanyIdState(localStorage.setItem('companyID', id));
  };

  return (
    <div>
      <ButtonBase className={classes.avatarHead} onClick={handleOpen}>
        <Avatar
          alt={userAttr.name}
          src={userAttr.avatar}
          className={classNames(classes.avatar, classes.bigAvatar)}
        />
        <i className={classNames(classes.dotStatus, classes.pinned, setStatusIntoClass(status))} />
      </ButtonBase>
      <Menu
        id="status-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.statusMenu}
      >
        <MenuItem className={classes.profile}>
          <Avatar
            alt={userAttr.name}
            src={userAttr.avatar}
            className={classNames(classes.avatar, classes.bigAvatar)}
          />
          <div className={classes.name}>
            <h5>{userAttr.name}</h5>
            <i className={classNames(classes.dotStatus, setStatusIntoClass(status))} />
            <FormattedMessage {...messages[status]} />
          </div>
        </MenuItem>
        {
          userData && userData[0]?.companies?.data?.map((company) => <MenuItem onClick={() => handleCompanyID(company.id)}>{company.name}</MenuItem>)
        }
      </Menu>
    </div>
  );
}

MenuProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  userAttr: PropTypes.object.isRequired,
};

MenuProfile.defaultProps = {
  anchorEl: null,
  isLogin: false,
};

export default withStyles(styles)(injectIntl(MenuProfile));
