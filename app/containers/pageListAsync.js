import React from 'react';
import Loading from 'enl-components/Loading';
import loadable from '../utils/loadable';

// Dashboard
export const AnalyticDashboard = loadable(() => import('./Dashboard/AnalyticDashboard'), {
  fallback: <Loading />,
});

export const Item = loadable(() => import('./item/Item'), {
  fallback: <Loading />,
});
export const CreateItem = loadable(() => import('./item/CreateItem'), {
  fallback: <Loading />,
});
export const UpdateItem = loadable(() => import('./item/UpdateItem'), {
  fallback: <Loading />,
});
export const Group = loadable(() => import('./group/Group'), {
  fallback: <Loading />,
});
export const CreateGroup = loadable(() => import('./group/CreateGroup'), {
  fallback: <Loading />,
});
export const UpdateGroup = loadable(() => import('./group/UpdateGroup'), {
  fallback: <Loading />,
});
export const VariantList = loadable(() => import('./Variants/variantList'), {
  fallback: <Loading />,
});
export const CreateVariant = loadable(() => import('./Variants/CreateVariant'), {
  fallback: <Loading />,
});
export const UpdateVariant = loadable(() => import('./Variants/UpdateVariant'), {
  fallback: <Loading />,
});
export const TransferOrdersList = loadable(() => import('./TransferOrders/TransferOrdersList'), {
  fallback: <Loading />,
});
export const CreateTransferOrder = loadable(() => import('./TransferOrders/CreateTransferOrder'), {
  fallback: <Loading />,
});
export const UpdateTransferOrder = loadable(() => import('./TransferOrders/UpdateTransferOrder'), {
  fallback: <Loading />,
});
export const AdjustmentList = loadable(() => import('./Adjustment/AdjustmentList'), {
  fallback: <Loading />,
});
export const CreateAdjustment = loadable(() => import('./Adjustment/CreateAdjustment'), {
  fallback: <Loading />,
});
export const UpdateAdjustment = loadable(() => import('./Adjustment/UpdateAdjustment'), {
  fallback: <Loading />,
});
export const WarehouseList = loadable(() => import('./Warehouse/WarehouseList'), {
  fallback: <Loading />,
});
export const CreateWarehouse = loadable(() => import('./Warehouse/CreateWarehouse'), {
  fallback: <Loading />,
});
export const UpdateWarehouse = loadable(() => import('./Warehouse/UpdateWarehouse'), {
  fallback: <Loading />,
});
export const HistoryList = loadable(() => import('./History/HistoryList'), {
  fallback: <Loading />,
});
export const Accounts = loadable(() => import('./accounts/Accounts'), {
  fallback: <Loading />,
});
export const CreateAccount = loadable(() => import('./accounts/CreateAccount'), {
  fallback: <Loading />,
});
export const UpdateAccount = loadable(() => import('./accounts/UpdateAccount'), {
  fallback: <Loading />,
});
export const Companies = loadable(() => import('./companies/Companies'), {
  fallback: <Loading />,
});
export const CompanyDetails = loadable(() => import('./companies/CompanyDetails'), {
  fallback: <Loading />,
});
export const Categories = loadable(() => import('./categories/Categories'), {
  fallback: <Loading />,
});
export const CreateCategories = loadable(() => import('./categories/CreateCategories'), {
  fallback: <Loading />,
});
export const UpdateCategories = loadable(() => import('./categories/UpdateCategories'), {
  fallback: <Loading />,
});
export const Currencies = loadable(() => import('./currencies/Currencies'), {
  fallback: <Loading />,
});
export const CreateCurrencies = loadable(() => import('./currencies/CreateCurrencies'), {
  fallback: <Loading />,
});
export const UpdateCurrencies = loadable(() => import('./currencies/UpdateCurrencies'), {
  fallback: <Loading />,
});
export const Taxes = loadable(() => import('./taxes/Taxes'), {
  fallback: <Loading />,
});
export const CreateTax = loadable(() => import('./taxes/CreateTax'), {
  fallback: <Loading />,
});
export const UpdateTax = loadable(() => import('./taxes/UpdateTax'), {
  fallback: <Loading />,
});
export const UsersList = loadable(() => import('./Users/UsersList'), {
  fallback: <Loading />,
});
export const CreateUser = loadable(() => import('./Users/CreateUser'), {
  fallback: <Loading />,
});
export const UpdateUser = loadable(() => import('./Users/UpdateUser'), {
  fallback: <Loading />,
});
export const CustomerList = loadable(() => import('./Customer/CustomerList'), {
  fallback: <Loading />,
});
export const CreateCustomer = loadable(() => import('./Customer/CreateCustomer'), {
  fallback: <Loading />,
});
export const UpdateCustomer = loadable(() => import('./Customer/UpdateCustomer'), {
  fallback: <Loading />,
});
// export const VendorList = loadable(() => import('./Vendors/VendorList'), {
//   fallback: <Loading />,
// });
export const InvoicesList = loadable(() => import('./Invoices/InvoicesList'), {
  fallback: <Loading />,
});
export const Invoice = loadable(() => import('./Invoices/Invoice'), {
  fallback: <Loading />,
});
export const CreateInvoice = loadable(() => import('./Invoices/CreateInvoice'), {
  fallback: <Loading />,
});
export const UpdateInvoice = loadable(() => import('./Invoices/UpdateInvoice'), {
  fallback: <Loading />,
});
export const TransactionList = loadable(() => import('./Transactions/TransactionsList'), {
  fallback: <Loading />,
});
export const CreateTransaction = loadable(() => import('./Transactions/CreateTransaction'), {
  fallback: <Loading />,
});
export const UpdateTransaction = loadable(() => import('./Transactions/UpdateTransaction'), {
  fallback: <Loading />,
});
export const TransfersList = loadable(() => import('./Transfers/TransfersList'), {
  fallback: <Loading />,
});
export const CreateTransfer = loadable(() => import('./Transfers/CreateTransfer'), {
  fallback: <Loading />,
});
export const UpdateTransfer = loadable(() => import('./Transfers/UpdateTransfer'), {
  fallback: <Loading />,
});
export const VendorsList = loadable(() => import('./Vendors/VendorsList'), {
  fallback: <Loading />,
});
export const CreateVendor = loadable(() => import('./Vendors/CreateVendor'), {
  fallback: <Loading />,
});
export const UpdateVendor = loadable(() => import('./Vendors/UpdateVendor'), {
  fallback: <Loading />,
});
export const ReconciliationsList = loadable(() => import('./Reconciliations/ReconciliationsList'), {
  fallback: <Loading />,
});
export const BillList = loadable(() => import('./Bill/BillList'), {
  fallback: <Loading />,
});
export const CreateBill = loadable(() => import('./Bill/CreateBill'), {
  fallback: <Loading />,
});
export const UpdateBill = loadable(() => import('./Bill/UpdateBill'), {
  fallback: <Loading />,
});
export const ReportList = loadable(() => import('./Reports/ReportList'), {
  fallback: <Loading />,
});
// Layouts
export const Infographics = loadable(() => import('./Widgets/Infographics'), {
  fallback: <Loading />,
});
export const MiniApps = loadable(() => import('./Widgets/MiniApps'), {
  fallback: <Loading />,
});
export const Analytics = loadable(() => import('./Widgets/Analytics'), {
  fallback: <Loading />,
});
export const Gallery = loadable(() => import('./Widgets/Gallery'), {
  fallback: <Loading />,
});
export const Status = loadable(() => import('./Widgets/Status'), {
  fallback: <Loading />,
});

// Layouts
export const AppLayout = loadable(() => import('./Layouts/AppLayout'), {
  fallback: <Loading />,
});
export const Responsive = loadable(() => import('./Layouts/Responsive'), {
  fallback: <Loading />,
});
export const Grid = loadable(() => import('./Layouts/Grid'), {
  fallback: <Loading />,
});

// Tables
export const SimpleTable = loadable(() => import('./Tables/BasicTable'), {
  fallback: <Loading />,
});
export const AdvancedTable = loadable(() => import('./Tables/AdvancedTable'), {
  fallback: <Loading />,
});
export const EditableCell = loadable(() => import('./Tables/EditableCell'), {
  fallback: <Loading />,
});
export const TreeTable = loadable(() => import('./Tables/TreeTable'), {
  fallback: <Loading />,
});
export const TablePlayground = loadable(() => import('./Tables/TablePlayground'), {
  fallback: <Loading />,
});

// Forms
export const ReduxForm = loadable(() => import('./Forms/ReduxForm'), {
  fallback: <Loading />,
});
export const DateTimePicker = loadable(() => import('./Forms/DateTimePicker'), {
  fallback: <Loading />,
});
export const CheckboxRadio = loadable(() => import('./Forms/CheckboxRadio'), {
  fallback: <Loading />,
});
export const Switches = loadable(() => import('./Forms/Switches'), {
  fallback: <Loading />,
});
export const Selectbox = loadable(() => import('./Forms/Selectbox'), {
  fallback: <Loading />,
});
export const SliderRange = loadable(() => import('./Forms/SliderRange'), {
  fallback: <Loading />,
});
export const Buttons = loadable(() => import('./Forms/Buttons'), {
  fallback: <Loading />,
});
export const ToggleButton = loadable(() => import('./Forms/ToggleButton'), {
  fallback: <Loading />,
});
export const Textbox = loadable(() => import('./Forms/Textbox'), {
  fallback: <Loading />,
});
export const Autocomplete = loadable(() => import('./Forms/Autocomplete'), {
  fallback: <Loading />,
});
export const TextEditor = loadable(() => import('./Forms/TextEditor'), {
  fallback: <Loading />,
});
export const Upload = loadable(() => import('./Forms/Upload'), {
  fallback: <Loading />,
});
export const DialButton = loadable(() => import('./Forms/DialButton'), {
  fallback: <Loading />,
});

// UI Components
export const Badges = loadable(() => import('./UiElements/Badges'), {
  fallback: <Loading />,
});
export const Avatars = loadable(() => import('./UiElements/Avatars'), {
  fallback: <Loading />,
});
export const Accordion = loadable(() => import('./UiElements/Accordion'), {
  fallback: <Loading />,
});
export const List = loadable(() => import('./UiElements/List'), {
  fallback: <Loading />,
});
export const PopoverTooltip = loadable(() => import('./UiElements/PopoverTooltip'), {
  fallback: <Loading />,
});
export const Snackbar = loadable(() => import('./UiElements/Snackbar'), {
  fallback: <Loading />,
});
export const Typography = loadable(() => import('./UiElements/Typography'), {
  fallback: <Loading />,
});
export const Tabs = loadable(() => import('./UiElements/Tabs'), {
  fallback: <Loading />,
});
export const Cards = loadable(() => import('./UiElements/Cards'), {
  fallback: <Loading />,
});
export const ImageGrid = loadable(() => import('./UiElements/ImageGrid'), {
  fallback: <Loading />,
});
export const Progress = loadable(() => import('./UiElements/Progress'), {
  fallback: <Loading />,
});
export const DialogModal = loadable(() => import('./UiElements/DialogModal'), {
  fallback: <Loading />,
});
export const Steppers = loadable(() => import('./UiElements/Steppers'), {
  fallback: <Loading />,
});
export const DrawerMenu = loadable(() => import('./UiElements/DrawerMenu'), {
  fallback: <Loading />,
});
export const Breadcrumbs = loadable(() => import('./UiElements/Breadcrumbs'), {
  fallback: <Loading />,
});
export const Icons = loadable(() => import('./UiElements/Icons'), {
  fallback: <Loading />,
});
export const SliderCarousel = loadable(() => import('./UiElements/SliderCarousel'), {
  fallback: <Loading />,
});
export const Tags = loadable(() => import('./UiElements/Tags'), {
  fallback: <Loading />,
});
export const TreeView = loadable(() => import('./UiElements/TreeView'), {
  fallback: <Loading />,
});
// Chart
export const LineCharts = loadable(() => import('./Charts/LineCharts'), {
  fallback: <Loading />,
});
export const BarCharts = loadable(() => import('./Charts/BarCharts'), {
  fallback: <Loading />,
});
export const AreaCharts = loadable(() => import('./Charts/AreaCharts'), {
  fallback: <Loading />,
});
export const PieCharts = loadable(() => import('./Charts/PieCharts'), {
  fallback: <Loading />,
});
export const RadarCharts = loadable(() => import('./Charts/RadarCharts'), {
  fallback: <Loading />,
});
export const ScatterCharts = loadable(() => import('./Charts/ScatterCharts'), {
  fallback: <Loading />,
});
export const CompossedCharts = loadable(() => import('./Charts/CompossedCharts'), {
  fallback: <Loading />,
});

// Pages
export const LoginFullstack = loadable(() => import('./Pages/UsersFullstack/Login'), {
  fallback: <Loading />,
});
export const RegisterFullstack = loadable(() => import('./Pages/UsersFullstack/Register'), {
  fallback: <Loading />,
});
export const ResetPasswordFullstack = loadable(() => import('./Pages/UsersFullstack/ResetPassword'), {
  fallback: <Loading />,
});
export const Login = loadable(() => import('./Pages/Users/Login'), {
  fallback: <Loading />,
});
export const Register = loadable(() => import('./Pages/Users/Register'), {
  fallback: <Loading />,
});
export const ResetPassword = loadable(() => import('./Pages/Users/ResetPassword'), {
  fallback: <Loading />,
});

export const LockScreen = loadable(() => import('./Pages/Users/LockScreen'), {
  fallback: <Loading />,
});
export const ComingSoon = loadable(() => import('./Pages/ComingSoon'), {
  fallback: <Loading />,
});
export const Ecommerce = loadable(() => import('./Pages/Ecommerce'), {
  fallback: <Loading />,
});
export const ProductPage = loadable(() => import('./Pages/Ecommerce/ProductPage'), {
  fallback: <Loading />,
});
export const CheckoutPage = loadable(() => import('./Pages/Ecommerce/CheckoutPage'), {
  fallback: <Loading />,
});
export const InvoicePage = loadable(() => import('./Pages/Ecommerce/InvoicePage'), {
  fallback: <Loading />,
});
export const Profile = loadable(() => import('./Pages/UserProfile'), {
  fallback: <Loading />,
});
export const Timeline = loadable(() => import('./Pages/Timeline'), {
  fallback: <Loading />,
});
export const Chat = loadable(() => import('./Pages/Chat'), {
  fallback: <Loading />,
});
export const BlankPage = loadable(() => import('./Pages/BlankPage'), {
  fallback: <Loading />,
});
export const AuthenticatedPage = loadable(() => import('./Pages/AuthenticatedPage'), {
  fallback: <Loading />,
});

// Sample Pre Build Apps
export const Todo = loadable(() => import('./SampleApps/Todo'), {
  fallback: <Loading />,
});
export const TodoFirebase = loadable(() => import('./SampleFullstackApps/Todo'), {
  fallback: <Loading />,
});
export const Contact = loadable(() => import('./SampleApps/Contact'), {
  fallback: <Loading />,
});
export const ContactFirebase = loadable(() => import('./SampleFullstackApps/Contact'), {
  fallback: <Loading />,
});
export const Email = loadable(() => import('./SampleApps/Email'), {
  fallback: <Loading />,
});
export const EmailFirebase = loadable(() => import('./SampleFullstackApps/Email'), {
  fallback: <Loading />,
});

export const Photos = loadable(() => import('./Pages/Photos'), {
  fallback: <Loading />,
});

// Maps
export const MapMarker = loadable(() => import('./Maps/MapMarker'), {
  fallback: <Loading />,
});
export const MapDirection = loadable(() => import('./Maps/MapDirection'), {
  fallback: <Loading />,
});
export const SearchMap = loadable(() => import('./Maps/SearchMap'), {
  fallback: <Loading />,
});
export const TrafficIndicator = loadable(() => import('./Maps/TrafficIndicator'), {
  fallback: <Loading />,
});
export const StreetViewMap = loadable(() => import('./Maps/StreetViewMap'), {
  fallback: <Loading />,
});

// Other
export const NotFound = loadable(() => import('./NotFound/NotFound'), {
  fallback: <Loading />,
});
export const Error = loadable(() => import('./Pages/Error'), {
  fallback: <Loading />,
});
export const Maintenance = loadable(() => import('./Pages/Maintenance'), {
  fallback: <Loading />,
});
export const Parent = loadable(() => import('./Parent'), {
  fallback: <Loading />,
});
export const TermsConditions = loadable(() => import('./Pages/TermsConditions'), {
  fallback: <Loading />,
});