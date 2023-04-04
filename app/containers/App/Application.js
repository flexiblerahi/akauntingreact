import React, { useContext, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../Templates/Dashboard';
import { AppContext } from './ThemeWrapper';
import withAuthorizationRouter from '../Session/withAuthorizationRouter';
import {
  AnalyticDashboard, Infographics, MiniApps, Analytics,
  Gallery, Status,
  Parent, AppLayout, Responsive, Grid,
  SimpleTable, AdvancedTable, TablePlayground,
  TreeTable, EditableCell,
  ReduxForm,
  DialButton, DateTimePicker, CheckboxRadio,
  Switches, Selectbox,
  SliderRange, Buttons,
  ToggleButton, Textbox,
  Autocomplete, Upload, TextEditor,
  Avatars, Accordion, Badges,
  List, PopoverTooltip, Snackbar,
  Typography, Tabs, Cards,
  ImageGrid, Progress, DialogModal,
  Steppers, DrawerMenu,
  Breadcrumbs, Icons,
  SliderCarousel, Tags, TreeView,
  LineCharts, BarCharts, AreaCharts,
  PieCharts, RadarCharts, ScatterCharts, CompossedCharts,
  Contact, Email, Todo,
  TodoFirebase, ContactFirebase, EmailFirebase,
  Timeline, Profile, Chat, Ecommerce,
  ProductPage, CheckoutPage, InvoicePage,
  BlankPage, AuthenticatedPage,
  Photos, Error,
  MapMarker, MapDirection, SearchMap,
  TrafficIndicator, StreetViewMap,
  NotFound, Item, Accounts, Companies, Categories, Currencies,
  Taxes, CreateItem, UpdateItem, CompanyDetails, UpdateAccount, CreateAccount, CreateCategories, UpdateCategories, CreateTax, UpdateTax, CreateCurrencies, UpdateCurrencies,
  Group, CreateGroup, VariantList, TransferOrdersList, CreateTransferOrder, UpdateTransferOrder, AdjustmentList, WarehouseList, CreateWarehouse, UpdateWarehouse, HistoryList, CreateVariant, UpdateVariant, UpdateGroup,
  CreateAdjustment, UpdateAdjustment, UsersList, CreateUser, UpdateUser, CustomerList, CreateCustomer, UpdateCustomer,Invoice, InvoicesList, CreateInvoice, UpdateInvoice, TransactionList, CreateTransaction, UpdateTransaction,
  ReconciliationsList,
  TransfersList, CreateTransfer, UpdateTransfer, VendorsList, CreateVendor, UpdateVendor, BillList, ReportList, CreateBill, UpdateBill
} from '../pageListAsync';
import axiosInstance from '../../services/axiosInstance';

function Application(props) {
  const { history } = props;
  const changeMode = useContext(AppContext);
  const [userData, setUserData] = useState('');
  const [companyID, setCompanyID] = useState('');

  useEffect(() => {
    axiosInstance
      .get('/users', {
        headers: {
          Authorization: localStorage.getItem('authorizationValue')
        }
      })
      .then((res) => {
        setUserData(res?.data?.data.filter((user) => user.email === localStorage.getItem('email')));
        // localStorage.setItem('companyID', res?.data?.data.filter((user) => user.email === localStorage.getItem('email'))[0].companies.data[0].id);
        setCompanyID(res?.data?.data.filter((user) => user.email === localStorage.getItem('email'))[0].companies.data[0].id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Dashboard history={history} changeMode={changeMode} userData={userData} companyID={companyID} setCompanyID={setCompanyID}>
      <Switch>
        { /* Home */}
        <Route exact path="/app" component={AnalyticDashboard} />

          <Route path="/app/item">
            <Item companyID={companyID} />
          </Route>
          <Route path="/app/create/item/">
            <CreateItem companyID={companyID} />
          </Route>
          <Route path="/app/update/:id/item" >
            <UpdateItem companyID={companyID} />
          </Route>

          <Route path="/app/groups/" >
            <Group companyID={companyID} />
          </Route>
          <Route path="/app/create/group/" >
            <CreateGroup companyID={companyID} />
          </Route>
          <Route path="/app/update/:id/group/" >
            <UpdateGroup companyID={companyID} />
          </Route>

          <Route path="/app/create/variant" >
            <CreateVariant companyID={companyID} />
          </Route>
          <Route path="/app/variants/" >
            <VariantList companyID={companyID} />
          </Route>
          <Route path="/app/update/:id/variant" >
            <UpdateVariant companyID={companyID} />
          </Route>

          <Route path="/app/transfer/orders/" >
            <TransferOrdersList companyID={companyID} />
          </Route>
          <Route path="/app/create/transfer/orders/" >
            <CreateTransferOrder companyID={companyID} />
          </Route>
          <Route path="/app/update/:id/transfer/order" >
            <UpdateTransferOrder companyID={companyID} />
          </Route>

          <Route path="/app/adjustments/" >
            <AdjustmentList companyID={companyID} />
          </Route>
          <Route path="/app/create/adjustments/" >
            <CreateAdjustment companyID={companyID} />
          </Route>
          <Route path="/app/update/:id/adjustments/" >
            <UpdateAdjustment companyID={companyID} />
          </Route>

          <Route path="/app/warehouses/" >
            <WarehouseList companyID={companyID} />
          </Route>
          <Route path="/app/create/warehouse/" >
            <CreateWarehouse companyID={companyID} />
          </Route>
          <Route path="/app/update/:id/warehouse/" >
            <UpdateWarehouse companyID={companyID} />
          </Route>

          <Route path="/app/histories/" >
            <HistoryList companyID={companyID} />
          </Route>

          <Route path="/app/accounts">
            <Accounts companyID={companyID} />
          </Route>
          <Route path="/app/update/:id/accounts" >
            <UpdateAccount companyID={companyID} />
          </Route>
          <Route path="/app/create/account/" >
            <CreateAccount companyID={companyID} />
          </Route>

          <Route path="/app/companies" component={Companies} />
          <Route path="/app/details/:id/company/" component={CompanyDetails}></Route>

          <Route path="/app/categories" >
            <Categories companyID={companyID} />
          </Route>
          <Route path="/app/create/categories" >
            <CreateCategories companyID={companyID} />
          </Route>
          <Route path="/app/update/:id/categories" >
            <UpdateCategories companyID={companyID} />
          </Route>

          <Route path="/app/currencies" >
            <Currencies companyID={companyID} />
          </Route>
          <Route path="/app/create/currencies" >
            <CreateCurrencies companyID={companyID} />
          </Route>
          <Route path="/app/update/:id/currencies" >
            <UpdateCurrencies companyID={companyID} />
          </Route>

          <Route path="/app/taxes" >
            <Taxes companyID={companyID} />
          </Route>
          <Route path="/app/create/tax" >
            <CreateTax companyID={companyID} />
          </Route>
          <Route path="/app/update/:id/tax" >
            <UpdateTax companyID={companyID} />
          </Route>

          <Route path="/app/users">
            <UsersList companyID={companyID} />
          </Route>
          <Route path="/app/create/user">
            <CreateUser companyID={companyID} />
          </Route>
          <Route path="/app/update/:id/user">
            <UpdateUser companyID={companyID} />
          </Route>

          <Route path="/app/customers">
            <CustomerList companyID={companyID} />
          </Route>
          <Route path="/app/create/customer">
            <CreateCustomer companyID={companyID} />
          </Route>
          <Route path="/app/update/:id/customer">
            <UpdateCustomer companyID={companyID} />
          </Route>

          {/* <Route path="/app/vendors">
            <VendorList companyID={companyID} />
          </Route> */}

          <Route path="/app/invoices">
            <InvoicesList companyID={companyID} />
          </Route>
          <Route path="/app/invoice/:id/">
            <Invoice companyID={companyID} />
          </Route>
          <Route path="/app/create/invoice">
            <CreateInvoice companyID={companyID} />
          </Route>
          <Route path="/app/update/:id/invoice">
            <UpdateInvoice companyID={companyID} />
          </Route>

          <Route path="/app/transactions">
            <TransactionList companyID={companyID} />
          </Route>
          <Route path="/app/create/transaction">
            <CreateTransaction companyID={companyID} />
          </Route>
          <Route path="/app/update/:id/transaction">
            <UpdateTransaction companyID={companyID} />
          </Route>

          <Route path="/app/vendors">
            <VendorsList companyID={companyID} />
          </Route>
          <Route path="/app/create/vendor">
            <CreateVendor companyID={companyID} />
          </Route>
          <Route path="/app/update/:id/vendor">
            <UpdateVendor companyID={companyID} />
          </Route>

          <Route path="/app/reconcialitions">
            <ReconciliationsList companyID={companyID} />
          </Route>

          <Route path="/app/reports">
            <ReportList companyID={companyID} />
          </Route>

          <Route path="/app/transfers">
            <TransfersList companyID={companyID} />
          </Route>
          <Route path="/app/create/transfer">
            <CreateTransfer companyID={companyID} />
          </Route>
          <Route path="/app/update/:id/transfer">
            <UpdateTransfer companyID={companyID} />
          </Route>

          <Route path="/app/bills">
            <BillList companyID={companyID} />
          </Route>
          <Route path="/app/create/bill">
            <CreateBill companyID={companyID} />
          </Route>
          <Route path="/app/update/:id/bill">
            <UpdateBill companyID={companyID} />
          </Route>
          { /* Widgets */}
          <Route exact path="/app/widgets" component={Parent} />
          <Route path="/app/widgets/infographics" component={Infographics} />
          <Route path="/app/widgets/mini-apps" component={MiniApps} />
          <Route path="/app/widgets/analytics" component={Analytics} />
          <Route path="/app/widgets/gallery-carousel" component={Gallery} />
          <Route path="/app/widgets/status" component={Status} />
          { /* Layout */}
          <Route exact path="/app/layouts" component={Parent} />
          <Route path="/app/layouts/grid" component={Grid} />
          <Route path="/app/layouts/app-layout" component={AppLayout} />
          <Route path="/app/layouts/responsive" component={Responsive} />
          { /* Table */}
          <Route exact path="/app/tables" component={Parent} />
          <Route path="/app/tables/basic-table" component={SimpleTable} />
          <Route path="/app/tables/data-table" component={AdvancedTable} />
          <Route path="/app/tables/table-playground" component={TablePlayground} />
          <Route path="/app/tables/editable-cell" component={EditableCell} />
          <Route path="/app/tables/tree-table" component={TreeTable} />
          { /* Form & Button */}
          <Route exact path="/app/forms" component={Parent} />
          <Route path="/app/forms/reduxform" component={ReduxForm} />
          <Route path="/app/forms/date-time-picker" component={DateTimePicker} />
          <Route path="/app/forms/dial-button" component={DialButton} />
          <Route path="/app/forms/checkbox-radio" component={CheckboxRadio} />
          <Route path="/app/forms/switches" component={Switches} />
          <Route path="/app/forms/selectbox" component={Selectbox} />
          <Route path="/app/forms/slider-range" component={SliderRange} />
          <Route path="/app/forms/buttons" component={Buttons} />
          <Route path="/app/forms/toggle-button" component={ToggleButton} />
          <Route path="/app/forms/textfields" component={Textbox} />
          <Route path="/app/forms/autocomplete" component={Autocomplete} />
          <Route path="/app/forms/upload" component={Upload} />
          <Route path="/app/forms/wysiwyg-editor" component={TextEditor} />
          { /* Ui Components */}
          <Route exact path="/app/ui" component={Parent} />
          <Route path="/app/ui/avatars" component={Avatars} />
          <Route path="/app/ui/accordion" component={Accordion} />
          <Route path="/app/ui/badges" component={Badges} />
          <Route path="/app/ui/list" component={List} />
          <Route path="/app/ui/popover-tooltip" component={PopoverTooltip} />
          <Route path="/app/ui/snackbar" component={Snackbar} />
          <Route path="/app/ui/typography" component={Typography} />
          <Route path="/app/ui/tabs" component={Tabs} />
          <Route path="/app/ui/card-papper" component={Cards} />
          <Route path="/app/ui/image-grid" component={ImageGrid} />
          <Route path="/app/ui/progress" component={Progress} />
          <Route path="/app/ui/dialog-modal" component={DialogModal} />
          <Route path="/app/ui/steppers" component={Steppers} />
          <Route path="/app/ui/drawer-menu" component={DrawerMenu} />
          <Route path="/app/ui/breadcrumbs" component={Breadcrumbs} />
          <Route path="/app/ui/icons" component={Icons} />
          <Route path="/app/ui/slider-carousel" component={SliderCarousel} />
          <Route path="/app/ui/tags" component={Tags} />
          <Route path="/app/ui/tree-view" component={TreeView} />
          { /* Chart */}
          <Route exact path="/app/charts" component={Parent} />
          <Route path="/app/charts/line-charts" component={LineCharts} />
          <Route path="/app/charts/bar-charts" component={BarCharts} />
          <Route path="/app/charts/area-charts" component={AreaCharts} />
          <Route path="/app/charts/pie-charts" component={PieCharts} />
          <Route path="/app/charts/radar-charts" component={RadarCharts} />
          <Route path="/app/charts/scatter-charts" component={ScatterCharts} />
          <Route path="/app/charts/compossed-chart" component={CompossedCharts} />
          { /* Sample Apps */}
          <Route path="/app/pages/contact" component={Contact} />
          <Route path="/app/pages/email" component={Email} />
          <Route path="/app/pages/todo" component={Todo} />
          <Route path="/app/pages/todo-firebase" component={TodoFirebase} />
          <Route path="/app/pages/contact-firebase" component={ContactFirebase} />
          <Route path="/app/pages/email-firebase" component={EmailFirebase} />
          { /* Pages */}
          <Route exact path="/app/pages" component={Parent} />
          <Route path="/app/pages/ecommerce" component={Ecommerce} />
          <Route path="/app/pages/product-detail" component={ProductPage} />
          <Route path="/app/pages/checkout" component={CheckoutPage} />
          <Route path="/app/pages/invoice" component={InvoicePage} />
          <Route path="/app/pages/user-profile" component={Profile} />
          <Route path="/app/pages/timeline" component={Timeline} />
          <Route path="/app/pages/chat" component={Chat} />
          <Route path="/app/pages/authenticated-page" component={withAuthorizationRouter(AuthenticatedPage)} />
          <Route path="/app/pages/blank-page" component={BlankPage} />
          <Route path="/app/pages/photo-gallery" component={Photos} />
          <Route path="/app/pages/not-found" component={NotFound} />
          <Route path="/app/pages/error" component={Error} />
          { /* Map */}
          <Route exact path="/app/maps" component={Parent} />
          <Route path="/app/maps/map-marker" component={MapMarker} />
          <Route path="/app/maps/map-direction" component={MapDirection} />
          <Route path="/app/maps/map-searchbox" component={SearchMap} />
          <Route path="/app/maps/map-traffic" component={TrafficIndicator} />
          <Route path="/app/maps/street-view" component={StreetViewMap} />
        { /* Default */}
        <Route component={NotFound} />
      </Switch>
    </Dashboard>
  );
}

Application.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Application;