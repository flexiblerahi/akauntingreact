/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { reducer as form } from 'redux-form';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import contact from 'enl-containers/SampleApps/Contact/reducers/contactReducer';
import contactFullstack from 'enl-containers/SampleFullstackApps/Contact/reducers/contactReducer';
import email from 'enl-containers/SampleApps/Email/reducers/emailReducer';
import emailFullstack from 'enl-containers/SampleFullstackApps/Email/reducers/emailReducer';
import todo from 'enl-containers/SampleApps/Todo/reducers/todoReducer';
import todoFullstack from 'enl-containers/SampleFullstackApps/Todo/reducers/todoReducer';
import crudTable from 'enl-containers/Tables/reducers/crudTbReducer';
import socmed from 'enl-containers/Pages/Timeline/reducers/timelineReducer';
import chat from 'enl-containers/Pages/Chat/reducers/chatReducers';
import ecommerce from 'enl-containers/Pages/Ecommerce/reducers/ecommerceReducers';
import treeTable from 'enl-containers/Tables/reducers/treeTbReducers';
import history from '../utils/history';
import categoriesReducer from './slice/categoriesSlice';
import currenciesReducer from './slice/currenciesSlice';
import taxesReducer from './slice/taxesSlice';
import warehousesReducer from './slice/warehouseSlice';
import accountsReducer from './slice/accountsSlice';
import itemsReducer from './slice/itemsSlice';
import groupsReducer from './slice/groupsSlice';
import historyReducer from './slice/historySlice';
import invoiceReducer from './slice/invoiceSlice';
import customerReducer from './slice/customersSlice';
import transferOrderReducer from './slice/transferOrdersSlice';
import variantsReducer from './slice/variantsSlice';
import adjustmentsReducer from './slice/adjustmentsSlice';
// Global Reducers
import authReducer from './modules/authReducer';
import uiReducer from './modules/uiReducer';
import initval from './modules/initFormReducer';

/**
 * Branching reducers to use one reducer for many components
 */

function branchReducer(reducerFunction, reducerName) {
  return (state, action) => {
    const { branch } = action;
    const isInitializationCall = state === undefined;
    if (branch !== reducerName && !isInitializationCall) {
      return state;
    }
    return reducerFunction(state, action);
  };
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    form,
    ui: uiReducer,
    categories: categoriesReducer,
    customers: customerReducer,
    currencies: currenciesReducer,
    taxes: taxesReducer,
    warehouses: warehousesReducer,
    accounts: accountsReducer,
    variants: variantsReducer,
    transferOrders: transferOrderReducer,
    adjustments: adjustmentsReducer,
    items: itemsReducer,
    groups: groupsReducer,
    histories: historyReducer,
    invoices: invoiceReducer,
    initval,
    authReducer,
    contact,
    contactFullstack,
    email,
    emailFullstack,
    todo,
    todoFullstack,
    socmed,
    ecommerce,
    chat,
    crudTableDemo: branchReducer(crudTable, 'crudTableDemo'),
    treeTableArrow: branchReducer(treeTable, 'treeTableArrow'),
    treeTablePM: branchReducer(treeTable, 'treeTablePM'),
    language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  // Wrap the root reducer and return a new root reducer with router state
  const mergeWithRouterState = connectRouter(history);
  return mergeWithRouterState(rootReducer);
}
