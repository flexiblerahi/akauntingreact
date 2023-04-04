module.exports = [
  {
    key: 'home',
    name: 'Home',
    icon: 'settings',
    child: [
      {
        key: 'Dashboard',
        name: 'Dashboard',
        link: '/app',
        icon: 'business',
        multilevel: false,
        badge: 'Hot',
      },
      {
        key: 'Users',
        name: 'Users',
        link: '/app/users',
        icon: 'business',
        multilevel: false,
        badge: 'Hot',
      }

    ]
  },
  {
    key: 'Inventory',
    name: 'Inventory',
    icon: 'inventory_2',
    child: [
      {
        key: 'Items',
        name: 'Items',
        icon: 'business',
        multilevel: false,
        link: '/app/item/',
      },
      {
        key: 'Groups',
        name: 'Groups',
        icon: 'business',
        multilevel: false,
        link: '/app/groups/'
      },
      {
        key: 'Variants',
        name: 'Variants',
        icon: 'business',
        multilevel: false,
        link: '/app/variants/'
      },
      {
        key: 'Transfer Orders',
        name: 'Transfer Orders',
        icon: 'business',
        multilevel: false,
        link: '/app/transfer/orders/'
      },
      {
        key: 'Adjustments',
        name: 'Adjustments',
        icon: 'business',
        multilevel: false,
        link: '/app/adjustments/'
      },
      {
        key: 'Warehouses',
        name: 'Warehouses',
        icon: 'business',
        multilevel: false,
        link: '/app/warehouses/'
      },
      {
        key: 'Histories',
        name: 'Histories',
        icon: 'business',
        multilevel: false,
        link: '/app/histories/'
      },
    ]
  },
  {
    key: 'CRM',
    name: 'CRM',
    icon: 'account_balance_wallet',
    child: [
      {
        key: 'Contacts',
        name: 'Contacts',
        link: '/app',
        icon: 'business',
        multilevel: false,
      },
      {
        key: 'Companies',
        name: 'Companies',
        multilevel: false,
        icon: 'business',
        link: '/app/companies'
      },
      {
        key: 'Deals',
        name: 'Deals',
        multilevel: false,
        icon: 'business',
        link: '/deals'
      },
      {
        key: 'Activities',
        name: 'Activities',
        multilevel: false,
        icon: 'business',
        link: '/activities'
      },
      {
        key: 'Schedule',
        name: 'Schedule',
        multilevel: false,
        icon: 'business',
        link: '/schedule'
      }
    ]
  },
  {
    key: 'Sales',
    name: 'Sales',
    icon: 'payments',
    child: [
      {
        key: 'Estimates',
        name: 'Estimates',
        icon: 'business',
        link: '/estimates',
        multilevel: false,
      },
      {
        key: 'Sales Orders',
        name: 'Sales Orders',
        icon: 'business',
        link: '/sales/orders',
        multilevel: false,
      },
      {
        key: 'Invoices',
        name: 'Invoices',
        icon: 'business',
        link: '/app/invoices',
        multilevel: false,
      },
      {
        key: 'Customers',
        name: 'Customers',
        icon: 'business',
        link: '/app/customers',
        multilevel: false,
      },
      {
        submenutitle: 'Credit Notes',
        name: 'Credit Notes',
        icon: 'business',
        link: '/credit/notes',
        multilevel: false,
      }
    ]
  },
  {
    key: 'Purchase',
    name: 'Purchase',
    icon: 'shopping_cart',
    child: [
      {
        key: 'Purchase Orders',
        name: 'Purchase Orders',
        link: '/purchase/orders',
        icon: 'business',
        multilevel: false,
      },
      {
        key: 'Bills',
        name: 'Bills',
        link: '/app/bills',
        icon: 'business',
        multilevel: false,
      },
      {
        key: 'Vendors',
        name: 'Vendors',
        link: '/app/vendors',
        icon: 'business',
        multilevel: false,
      },
      {
        key: 'Debit Notes',
        name: 'Debit Notes',
        link: '/debit/notes',
        icon: 'business',
        multilevel: false,
      }
    ]
  },
  {
    key: 'Banking',
    name: 'Banking',
    icon: 'account_balance',
    child: [
      {
        key: 'Accounts',
        name: 'Accounts',
        link: '/app/accounts',
        icon: 'business',
        multilevel: false,
      },
      {
        key: 'Transactions',
        name: 'Transactions',
        link: '/app/transactions',
        icon: 'business',
        multilevel: false,
      },
      {
        key: 'Transfers',
        name: 'Transfers',
        link: '/app/transfers',
        icon: 'business',
        multilevel: false,
      },
      {
        key: 'Reconciliations',
        name: 'Reconciliations',
        link: '/app/reconcialitions',
        icon: 'business',
        multilevel: false,
      }
    ]
  },
  {
    key: 'Notifications',
    name: 'Notifications',
    icon: 'notifications',
    child: []
  },
  {
    key: 'Search',
    name: 'Search',
    icon: 'search',
    child: []
  },
  {
    key: 'New',
    name: 'New',
    icon: 'add_circle_outline',
    child: [
      {
        key: 'Estimate',
        name: 'Estimate',
        icon: 'tick',
        link: '/estimate'
      },
      {
        key: 'Sales Order',
        name: 'Sales Order',
        icon: 'note_add',
        link: '/sales/order'
      },
      {
        key: 'Invoice',
        name: 'Invoice',
        icon: 'description',
        link: '/invoice'
      },
      {
        key: 'Income',
        name: 'Income',
        icon: 'request_quote',
        link: '/income'
      },
      {
        key: 'Customer',
        name: 'Customer',
        icon: 'person',
        link: '/customer'
      },
      {
        key: 'Purchase Order',
        name: 'Purchase Order',
        icon: 'request_quote',
        link: '/purchase/order'
      },
      {
        key: 'Bill',
        name: 'Bill',
        icon: 'file_open',
        link: '/bill'
      },
      {
        key: 'Expense',
        name: 'Expense',
        icon: 'paid',
        link: '/expense'
      },
      {
        key: 'Vendor',
        name: 'Vendor',
        icon: 'engineering',
        link: '/vendor'
      }
    ]
  },
  {
    key: 'Settings',
    name: 'Settings',
    icon: 'border_color',
    child: [
      {
        key: 'Company',
        name: 'Company',
        icon: 'add_circle',
        link: '/companies'
      },
      {
        key: 'Localisation',
        name: 'Localisation',
        icon: 'iso',
        link: '/localisation'
      },
      {
        key: 'Estimate',
        name: 'Estimate',
        icon: 'add_circle',
        link: '/estimate'
      },
      {
        key: 'Sales Order',
        name: 'Sales Order',
        icon: 'text_fields',
        link: '/app/sales/order'
      },
      {
        key: 'Invoice',
        name: 'Invoice',
        icon: 'list',
        link: '/app/invoice'
      },
      {
        key: 'Purchase Order',
        name: 'Purchase Order',
        icon: 'date_range',
        link: '/purchase/order'
      },
      {
        key: 'Default',
        name: 'Default',
        icon: 'ballot',
        link: '/default'
      },
      {
        key: 'Email Service',
        name: 'Email Service',
        icon: 'ballot',
        link: '/email/service'
      },
      {
        key: 'Email Templates',
        name: 'Email Templates',
        icon: 'check_box',
        link: '/email/templates'
      },
      {
        key: 'Scheduling',
        name: 'Scheduling',
        icon: 'storage',
        link: '/scheduling'
      },
      {
        key: 'Categories',
        name: 'Categories',
        icon: 'tune',
        link: '/app/categories'
      },
      {
        key: 'Currencies',
        name: 'Currencies',
        icon: 'cloud_upload',
        link: '/app/currencies'
      },
      {
        key: 'Taxes',
        name: 'Taxes',
        icon: 'format_color_text',
        link: '/app/taxes'
      },
      {
        key: 'Credit Note',
        name: 'Credit Note',
        icon: 'cloud_upload',
        link: '/credit/note'
      },
      {
        key: 'Debit Note',
        name: 'Debit Note',
        icon: 'format_color_text',
        link: '/debit/note'
      },
      {
        key: 'Offline Payments',
        name: 'Offline Payments',
        icon: 'cloud_upload',
        link: '/offline/payments'
      },
      {
        key: 'Paypal Standard',
        name: 'Paypal Standard',
        icon: 'format_color_text',
        link: '/paypal'
      },
      {
        key: 'Inventory',
        name: 'Inventory',
        icon: 'cloud_upload',
        link: '/inventory'
      },
      {
        key: 'CRM',
        name: 'CRM',
        icon: 'format_color_text',
        link: '/crm'
      },
      {
        key: 'Reports',
        name: 'Reports',
        icon: 'format_color_text',
        link: '/app/reports'
      },
    ]
  },
  {
    key: 'Help',
    name: 'Help',
    icon: 'extension',
    link: '/help',
    child: []
  },
];
