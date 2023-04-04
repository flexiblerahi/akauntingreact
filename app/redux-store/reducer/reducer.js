import { combineReducers } from 'redux';
import categoriesReducer from '../slice/categoriesSlice';
import currenciesReducer from '../slice/currenciesSlice';
import taxesReducer from '../slice/taxesSlice';
import warehousesReducer from '../slice/warehouseSlice';
import accountsReducer from '../slice/accountsSlice';
import itemsReducer from '../slice/itemsSlice';
import groupsReducer from '../slice/groupsSlice';
import uiReducer from '../../redux/modules/uiReducer';


export default combineReducers({
  categories: categoriesReducer,
  currencies: currenciesReducer,
  taxes: taxesReducer,
  warehouses: warehousesReducer,
  accounts: accountsReducer,
  items: itemsReducer,
  groups: groupsReducer,
  ui: uiReducer
});
