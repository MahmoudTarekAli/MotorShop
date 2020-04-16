import { RouteInfo } from './sidebar.metadata';
export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'الفئات',
    icon: 'fas fa-list',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: '/categories/AllCategories',
        title: 'الفئات',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/categories/add-category',
        title: 'اضافة فئه',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
    ]
  },
  {
    path: '',
    title: 'المنتجات',
    icon: 'fas fa-list',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: '/products/AllProducts',
        title: 'المنتجات',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/products/add-product',
        title: 'اضافة منتج',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
    ]
  },
  {
    path: '',
    title: 'فواتير المبيعات',
    icon: 'fas fa-list',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: '/saleInvoice/AllSalesInvoice',
        title: 'المبيعات',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/saleInvoice/add-saleInvoice',
        title: 'اضافة فاتورة مبيعات',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
    ]
  },
  {
    path: '',
    title: 'فواتير المشتريات',
    icon: 'fas fa-list',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: '/PurchaseInvoice/AllPurchaseInvoice',
        title: 'المشتريات',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/PurchaseInvoice/add-PurchaseInvoice',
        title: 'اضافة فاتورة مشتريات',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
    ]
  },
  {
    path: '',
    title: ' نماذج صيانة',
    icon: 'fas fa-list',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: '/maintenance/AllMaintenance',
        title: 'النماذج',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/maintenance/add-Maintenance',
        title: 'اضافة نموذج صيانة',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
    ]
  },
];
