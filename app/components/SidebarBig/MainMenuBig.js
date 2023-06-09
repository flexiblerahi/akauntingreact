import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ButtonBase from '@material-ui/core/ButtonBase';
import Icon from '@material-ui/core/Icon';
import { openMenuAction, closeMenuAction, closeRightSidebar } from 'enl-redux/actions/uiActions';
import { injectIntl, FormattedMessage } from 'react-intl';
import messages from 'enl-api/ui/menuMessages';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styles from './sidebarBig-jss';
import MenuProfile from './MenuProfile';

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

function MainMenuBig(props) { // eslint-disable-line
  const {
    classes,
    open,
    dataMenu,
    drawerPaper,
    userAttr,
    intl,
    closeDrawer,
    openDrawer,
    openSubMenu,
    mobile,
    loadTransition,
    toggleDrawerOpen,
    closeRightDrawer,
    userData,
    companyID,
    setCompanyID
  } = props;
  const [selectedMenu, setSelectedMenu] = useState([]);
  const [menuLoaded, setMenuLoaded] = useState(true);
  const [pathname, setPathname] = useState(window.location.pathname)


  const handleLoadMenu = (menu, key) => {
    setSelectedMenu(menu);
    setMenuLoaded(true);
    openSubMenu(key);
    // setTimeout(() => {
    //   setMenuLoaded(true); // load transtion menu
    // }, 100);

    if (drawerPaper && window.localStorage.getItem("key") == key) {
      closeDrawer()
    }
    else if (!drawerPaper) {
      openDrawer()
    }
    else {
      if (!mobile) {
        openDrawer();
      }
    }
    window.localStorage.setItem("key", key)
    // Unecessary in mobile, because toggle menu already handled

  };

  const handleLoadPage = () => {
    // toggleDrawerOpen();
    closeRightDrawer()
    closeDrawer()
  };

  const currentMenu = dataMenu.filter(item => item.key === open[0]);
  const activeMenu = (key, child) => {
    if (selectedMenu.length < 1) {
      if (open.indexOf(key) > -1) {
        return true;
      }
      return false;
    }
    if (child === selectedMenu) {
      return true;
    }
    return false;
  };

  const getMenus = menuArray => menuArray.map((item, index) => {
    if (item.key === 'menu_levels') {
      return false;
    }
    if (item.child) {
      return (
        <ButtonBase
          key={index.toString()}
          focusRipple
          onClick={() => handleLoadMenu(item.child, item.key)}
          className={
            classNames(
              classes.menuHead,
              activeMenu(item.key, item.child) ? classes.active : ''
            )
          }
        >
          <Icon className={classes.icon}>{item.icon}</Icon>
          <span className={classes.text}>
            {
              messages[item.key] !== undefined
                ? <FormattedMessage {...messages[item.key]} />
                : item.name
            }
          </span>
        </ButtonBase>
      );
    }
    return (
      <ButtonBase
        key={index.toString()}
        focusRipple
        className={classNames(classes.menuHead, open.indexOf(item.key) > -1 ? classes.active : '')}
        component={LinkBtn}
        to={item.linkParent}
        onClick={closeDrawer}
      >
        <Icon className={classes.icon}>{item.icon}</Icon>
        <span className={classes.text}>
          {
            messages[item.key] !== undefined
              ? <FormattedMessage {...messages[item.key]} />
              : item.name
          }
        </span>
      </ButtonBase>
    );
  });

  const getChildMenu = menuArray => menuArray.map((item, index) => {
    if (item.title) {
      return (
        <ListSubheader
          key={index.toString()}
          disableSticky
          className={classes.title}
        >
          {
            messages[item.key] !== undefined
              ? <FormattedMessage {...messages[item.key]} />
              : item.name
          }
        </ListSubheader>
      );
    }
    return (
      <>
        {
          item.multilevel ? <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                <Icon className={classes.icon}>{item.icon}</Icon>
                <span className='muiicon-text'>{item.submenu.label}</span>   </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <ul>
                  {item.submenu.submenuItems.map(submenuItem => (
                    <li><Link to={submenuItem.link} className="text-purple">{submenuItem.submenutitle}</Link></li>
                  ))}
                </ul>
              </Typography>
            </AccordionDetails>
          </Accordion> : <ListItem
            key={index.toString()}
            button
            exact
            className={classes.item}
            activeClassName={classes.active}
            component={LinkBtn}
            to={item.link}
            onClick={() => handleLoadPage()}
          >
            <ListItemIcon>
              <Icon className={classes.icon}>{item.icon}</Icon>
            </ListItemIcon> <ListItemText
              className={classes.text}
              primary={
                messages[item.key] !== undefined
                  ? intl.formatMessage(messages[item.key])
                  : item.name
              }
            />
          </ListItem>
        }
      </>
    );
  });

  const renderChildMenu = () => {
    if (selectedMenu.length < 1) {
      return (
        <List dense className={classes.fixedWrap}>
          {currentMenu.length > 0 ? getChildMenu(currentMenu[0].child) : ''}
        </List>
      );
    }
    return (
      <List
        dense
        className={
          classNames(
            classes.fixedWrap,
            classes.childMenuWrap,
            menuLoaded && classes.menuLoaded
          )
        }
      >
        {getChildMenu(selectedMenu)}
      </List>
    );
  };

  return (
    <aside className={classes.bigSidebar}>
      <nav className={classes.category}>
        <div className={classes.fixedWrap}>
          <MenuProfile userAttr={userAttr} userData={userData} companyID={companyID} setCompanyID={setCompanyID} />
          {getMenus(dataMenu)}
        </div>
      </nav>
      <nav className={classNames(classes.listMenu, !drawerPaper && classes.drawerPaperClose)}>
        {renderChildMenu()}
      </nav>
    </aside>
  );
}

MainMenuBig.propTypes = {
  classes: PropTypes.object.isRequired,
  userAttr: PropTypes.object.isRequired,
  open: PropTypes.array.isRequired,
  dataMenu: PropTypes.array.isRequired,
  openDrawer: PropTypes.func.isRequired,
  openSubMenu: PropTypes.func.isRequired,
  closeDrawer: PropTypes.func.isRequired,
  closeRightDrawer: PropTypes.func.isRequired,
  loadTransition: PropTypes.func.isRequired,
  drawerPaper: PropTypes.bool.isRequired,
  mobile: PropTypes.bool,
  toggleDrawerOpen: PropTypes.func,
  intl: PropTypes.object.isRequired
};

MainMenuBig.defaultProps = {
  toggleDrawerOpen: () => { },
  mobile: false
};

const openAction = key => ({ type: 'OPEN_SUBMENU', key });

const mapStateToProps = state => ({
  open: state.ui.subMenuOpen
});

const mapDispatchToProps = dispatch => ({
  openDrawer: () => dispatch(openMenuAction),
  closeDrawer: () => dispatch(closeMenuAction),
  closeRightDrawer: () => dispatch(closeRightSidebar),
  openSubMenu: bindActionCreators(openAction, dispatch)
});

const MainMenuBigMapped = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainMenuBig);

export default withStyles(styles)(injectIntl(MainMenuBigMapped));
