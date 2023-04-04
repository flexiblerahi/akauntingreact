import React, { useEffect, useState } from 'react';
import {
  createTheme,
  MuiThemeProvider,
  withStyles, makeStyles, ThemeProvider, createMuiTheme
} from '@material-ui/core/styles';
import PropTypes, { array } from 'prop-types';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Box, Grid, Input, ListItemIcon, ListItemText, MenuItem, Paper, Portal, Select, TextareaAutosize, TextField, Toolbar, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Add, Clear, FileCopy, FilterList, Print, Search } from '@material-ui/icons';
import { connect } from 'react-redux';
import { closeRightSidebar, openRightSidebar, toggleCreateRightSidebar } from 'enl-redux/actions/uiActions';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { green } from '@material-ui/core/colors';
import MUIDataTable from 'mui-datatables';
import { DropzoneArea } from 'material-ui-dropzone';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import moment from "moment";

const theme = createTheme();

const styles = theme => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '5px'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)'
    }
  },
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return <div {...other}>{value === index && <Box p={3}>{children}</Box>}</div>;
}

const customizedTheme = createMuiTheme({
  overrides: {
    MuiToolbar: {
      root: {
        display: 'none'
      }
    },
    MuiTabs: {
      root: {
        width: '35rem'
      }
    },
    MuiTab: {
      root: {
        fontSize: '12px',
        padding: '6px 12px',
        '@media (min-width: 600px)': {
          minWidth: '100px'
        }
      },
      wrapper: {
        alignItems: 'baseline'
      }
    },
    MuiInput: {
      root: {
        border: 0
      }
    },
    MuiTypography: {
      h6: {
        lineHeight: 1
      }
    },
    MuiBox: {
      root: {
        padding: '5px 8px'
      }
    },
  }
});

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    display: 'flex',
    flexDirection: 'row',
    '& .MuiFilledInput-input': {
      padding: '5px 0'
    },
    '& .MuiTextField-root': {
      width: '300px',
      padding: '7px 12px 0px'
    },
    '& .MuiTabs-root': {
      width: '1500px'
    },
    '& .MuiInput-root': {
      border: 0
    },
    '@media (min-width: 960px)': {
      '& .MuiGrid-grid-md-6': {
        minHeight: '280px'
      }
    },
  },
  filterDropdown: {
    position: 'relative',
    zIndex: '1111111111'
  },
  dropdownBtn: {
    backgroundColor: 'transparent',
    border: '1px solid gray',
    color: 'rgb(49, 114, 176)',
    marginLeft: '20px',
    padding: '5px 10px'
  },
  dropdown: {
    width: '150px',
    textAlign: 'start',
    position: 'absolute',
    top: '20px',
    right: 0,
    left: 0,
    zIndex: 1,
    padding: theme.spacing(0),
    backgroundColor: theme.palette.background.paper,
  },
  tableOpen: {
    border: '1px solid rgb(0,0,0,0.2)',
    height: '80vh',
    transition: 'all 0.2s ease 0s, margin-top 0s ease 0s, padding-left 0s ease 0s',
    "@media (min-width: 1400px)": {
      width: '2100px',
    },
    "@media (max-width: 1400px)": {
      width: '1600px',
    },
    "@media (max-width: 900px)": {
      width: '600px',
    },
    "@media (max-width: 500px)": {
      width: '250px',
    },
    position: 'relative',
  },
  tableClose: {
    border: '1px solid rgb(0,0,0,0.2)',
    height: '80vh',
    width: '250px',
    position: 'relative',
    transition: 'all 0.2s ease 0s, margin-top 0s ease 0s, padding-left 0s ease 0s'
  },
  drawerOpen: {
    marginRight: '0',
    height: '80vh',
    boxShadow: '0 0 10px rgb(0,0,0, 0.2)',
    "@media (min-width: 1400px)": {
      width: '1350px',
    },
    "@media (max-width: 1400px)": {
      width: '970px',
    },
    "@media (max-width: 900px)": {
      width: '650px',
    },
    "@media (max-width: 500px)": {
      width: '350px',
    },
  },
  filterColumn: {
    width: '100px',
    border: 'none',
    borderBottom: '1px solid rgb(0, 0, 0, 0.3)',
    margin: '10px 10px 0 10px',
  },
  drawerClose: {
    marginRight: '-20px',
    height: '80vh',
    boxShadow: '0 0 10px rgb(0,0,0, 0.2)'
  },
  toolbarBtn: {
    color: '#58698d',
    fontWeight: 700,
    textDecoration: 'none',
    backgroundColor: 'transparent',
    padding: '0 20px',
    "@media (max-width: 500px)": {
      padding: '0 8px',
    }
  },
  handleDrawer: {
    position: 'absolute',
    boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 50%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
    left: '-10px',
    background: 'white',
    overflow: "visible",
    borderRadius: '50%',
    zIndex: '11111'
  },
  nameInputClose: {
    position: 'relative',
    padding: '10px 0px 10px 50px',
    paddingLeft: '35px'
  },
  nameInputOpen: {
    position: 'relative',
    padding: '2px 0px 2px 50px',
    paddingLeft: '35px'
  },
  contentHeight: {
    height: 'calc(80vh - 145px)',
    overflow: 'auto',
    width: '100%',
    padding: '0 50px 0 20px'
  },
  boxDetails: {
    height: '35px'
  },
  selectField: {
    width: '150px',
    padding: '5px 10px'
  },
  wrapper: {
    orientation: 'horizontal'
  },
  itemName: {
    fontFamily: 'Lato',
    fontSize: '14px',
    fontWeight: 900,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: 'rgb(44, 44, 44)',
    margin: '0px',
    textShadow: 'rgb(0 0 0 / 0%) 1px 1px 1px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '100%'
  },
  columnText: {
    fontFamily: 'Lato',
    fontSize: '12px',
    fontWeight: 900,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: 'rgb(96, 96, 96)',
    margin: '5px 0 0 0',
    textShadow: 'rgb(0 0 0 / 0%) 1px 1px 1px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '100%',
  },
  selectBox: {
    border: 0,
    width: '300px',
    fontSize: '14px'
  },
  labelText: {
    fontSize: '14px',
    fontWeight: 700,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: '45px',
    letterSpacing: 'normal',
    color: 'rgb(96, 96, 96)',
    margin: '0px',
    textShadow: 'rgb(0 0 0 / 0%) 1px 1px 1px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    border: 0,
    justifyItems: 'flex-end'
  },
  textField: {
    padding: '0 12px',
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 500
  },
  input: {
    color: 'white'
  },
  addWarehouseBtn: {
    width: '100%',
    background: 'transparent',
    color: 'rgb(66 66 66)'
  },
  inputName: {
    padding: '10px 12px',
  }
}));

function RightSidebar(props) {
  const {
    classes,
    sidebarRight,
    closeRightDrawer,
    openRightDrawer,
    data,
    tabs
  } = props;

  const customClasses = useStyles();
  console.log(data)
  return (
    <ThemeProvider theme={customizedTheme}>
      <Box className={sidebarRight ? customClasses.drawerOpen : customClasses.drawerClose}>
        <Box style={{
          padding: '0 30px',
          height: '48px'
        }}>
          <Box display='flex'>
            <button className={customClasses.toolbarBtn} onClick={handleCreateForm} style={{ padding: '0' }}>
              <Box display='flex'>
                <Typography variant='toolbarBtn' style={{
                  fontSize: '14px'
                }}>
                  <AddIcon fontSize='small' /> New
                </Typography>
              </Box>
            </button>
            <button className={customClasses.toolbarBtn} onClick={handleCreate}>
              <Box display='flex'>
                <Typography variant='toolbarBtn' style={{
                  fontSize: '14px'
                }}>
                  <FileCopy fontSize='small' />Copy
                </Typography>
              </Box>
            </button>
            <button className={customClasses.toolbarBtn}>
              <Box display='flex'>
                <Typography variant='toolbarBtn' style={{
                  fontSize: '14px'
                }}>
                  <Print fontSize='small' /> Print barcode
                </Typography>
              </Box>
            </button>
            <button className={customClasses.toolbarBtn}>
              <Box display='flex'>
                <Typography variant='toolbarBtn' style={{
                  fontSize: '14px'
                }}>
                  <Clear fontSize='small' />Deactivate
                </Typography>
              </Box>
            </button>
            <Tabs
              value={value}
              onChange={handleChangeTab}
              variant="scrollable"
              scrollButtons="off"
            >
              {tabs
                .map((tabName, i) => (
                  <Tab label={tabName} />
                ))}
            </Tabs>
            <Grid container justify="flex-end">
              <Box display={'flex'}>
                {update == true && create == false ? <><button onClick={handleUpdateCancel}>
                  Cancel
                </button> <button style={{ 'background': 'linear-gradient(rgb(237, 166, 61) 0%, rgb(247, 200, 85) 100%)' }} onClick={handleUpdate}>
                    Update
                  </button> </> : <></>}
                {update == true && create == true ? <><button onClick={handleUpdateCancel}>
                  Cancel
                </button> <button style={{ 'background': 'linear-gradient(rgb(237, 166, 61) 0%, rgb(247, 200, 85) 100%)' }} onClick={handleCreate}>
                    Create
                  </button> </> : <></>}
              </Box>
            </Grid>
          </Box>
        </Box>
        <Box
          className={sidebarRight ? customClasses.nameInputOpen : customClasses.nameInputClose}
          component="div"
          bgcolor={"rgb(203, 220, 235)"}>
          {sidebarRight ? <Typography className={customClasses.handleDrawer}>
            <IconButton onClick={closeRightDrawer}>
              <ChevronRightIcon fontSize='small' />
            </IconButton>
          </Typography> :
            <Typography className={customClasses.handleDrawer}>
              <IconButton onClick={openRightDrawer}>
                <ChevronLeftIcon fontSize='small' />
              </IconButton>
            </Typography>}
          <Divider />
          <TextField
            value={data.name}
            name="name"
            fullWidth
            className={classes.inputName}
            id="name"
            onChange={handleChange}
            style={{
              width: '100%',
              padding: 0
            }}
            InputProps={{
              style: {
                padding: '0px 12px',
                background: 'none rgba(255, 255, 255, 0.75)',
                border: '1px solid rgba(0, 0, 0, 0)',
                width: '100%',
                float: 'none',
                display: 'flex',
                boxSizing: 'border-box',
                borderRadius: '4px',
                fontFamily: 'ZonaPro',
                fontSize: '26px',
                fontWeight: 'normal',
                fontStyle: 'normal',
                fontStretch: 'normal',
                letterSpacing: 'normal',
                margin: '0px',
                textShadow: 'rgb(0 0 0 / 0%) 1px 1px 1px',
                color: 'rgb(74, 74, 74)',
                lineHeight: '48px',
                textRendering: 'optimizelegibility !important',
              }
            }}
          />
        </Box>
        <Box className={customClasses.contentHeight}>
          <TabPanel value={value} index={0}>

          </TabPanel>
          <TabPanel value={value} index={1}>

          </TabPanel>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

RightSidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  sidebarRight: PropTypes.bool.isRequired,
  optionButton: PropTypes.bool.isRequired,
  columnVisibility: PropTypes.bool.isRequired,
  companyID: PropTypes.string.isRequired,
  closeRightDrawer: PropTypes.func.isRequired,
  openRightDrawer: PropTypes.func.isRequired,
  createItemDrawer: PropTypes.bool.isRequired
};

const openAction = key => ({ type: 'OPEN_SUBMENU', key });

const mapStateToProps = state => ({
  sidebarOpen: state.ui.sidebarOpen,
  sidebarRight: state.ui.rightSidebar,
  optionButton: state.ui.optionButton,
  columnVisibility: state.ui.columnVisibility,
  createItemDrawer: state.ui.createItemDrawer,
});

const mapDispatchToProps = dispatch => ({
  openRightDrawer: () => dispatch(openRightSidebar),
  closeRightDrawer: () => dispatch(closeRightSidebar),
  toggleCreateRightDrawer: () => dispatch(toggleCreateRightSidebar),
  openSubMenu: bindActionCreators(openAction, dispatch)
});


const RightSidebarMaped = connect(
  mapStateToProps,
  mapDispatchToProps
)(RightSidebar);

export default (withStyles(styles)(RightSidebarMaped));