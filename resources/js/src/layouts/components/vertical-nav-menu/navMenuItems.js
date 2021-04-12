/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  ----------------------------------------------------------------------------------------
==========================================================================================*/


export default [
  {
    url: null,
    name: 'Dashboard',
    tag: '2',
    tagColor: 'warning',
    icon: 'HomeIcon',
    i18n: 'Dashboard',
    submenu: [
      {
        url: '/dashboard/analytics',
        name: 'Analytics',
        slug: 'dashboard-analytics',
        i18n: 'Analytics'
      },
      {
        url: '/dashboard/ecommerce',
        name: 'eCommerce',
        slug: 'dashboard-ecommerce',
        i18n: 'eCommerce'
      }
    ]
  },
  {
    header: 'Apps',
    icon: 'PackageIcon',
    i18n: 'Apps',
    items: [
      {
        url: '/apps/email',
        name: 'Email',
        slug: 'email',
        icon: 'MailIcon',
        i18n: 'Email'
      },
      {
        url: '/apps/chat',
        name: 'Chat',
        slug: 'chat',
        icon: 'MessageSquareIcon',
        i18n: 'Chat'
      },
      {
        url: '/apps/todo',
        name: 'Todo',
        slug: 'todo',
        icon: 'CheckSquareIcon',
        i18n: 'Todo'
      },
      {
        url: '/apps/calendar/vue-simple-calendar',
        name: 'Calendar',
        slug: 'calendar-simple-calendar',
        icon: 'CalendarIcon',
        tagColor: 'success',
        i18n: 'Calendar'
      },
      {
        url: null,
        name: 'eCommerce',
        icon: 'ShoppingCartIcon',
        i18n: 'eCommerce',
        submenu: [
          {
            url: '/apps/eCommerce/shop',
            name: 'Shop',
            slug: 'ecommerce-shop',
            i18n: 'Shop'
          },
          {
            url: '/apps/eCommerce/item/',
            name: 'Item Details',
            slug: 'ecommerce-item-detail-view',
            i18n: 'ItemDetails'
          },
          {
            url: '/apps/eCommerce/wish-list',
            name: 'Wish List',
            slug: 'ecommerce-wish-list',
            i18n: 'WishList'
          },
          {
            url: '/apps/eCommerce/checkout',
            name: 'Checkout',
            slug: 'ecommerce-checkout',
            i18n: 'Checkout'
          }
        ]
      },
      {
        url: null,
        name: 'User',
        icon: 'UserIcon',
        i18n: 'User',
        submenu: [
          {
            url: '/apps/user/user-list',
            name: 'List',
            slug: 'app-user-list',
            i18n: 'List'
          },
          {
            url: '/apps/user/user-view/268',
            name: 'View',
            slug: 'app-user-view',
            i18n: 'View'
          },
          {
            url: '/apps/user/user-edit/268',
            name: 'Edit',
            slug: 'app-user-edit',
            i18n: 'Edit'
          }
        ]
      }
    ]
  },

  {
    url: "/",
    name: "Dashboard",
    slug: "dashboard",
    icon: "HomeIcon",
  },
  {
    url: "/module-manager",
    name: "modules",
    slug: "modules",
    icon: "FileIcon",
  },
  {
    url: "/role-manager",
    name: "role",
    slug: "role",
    icon: "FileIcon",
  },
  {
    url: "/menu-manager",
    name: "Menu Manager",
    slug: "menumanager",
    icon: "FileIcon",
  },
  {
    url: "/company-list",
    name: "Company",
    slug: "Company",
    icon: "FileIcon",
  },
  {
    url: "/user-list",
    name: "User list",
    slug: "user-list",
    icon: "FileIcon",
  },
  {
    url: "/user-create",
    name: "Create user",
    slug: "create-user",
    icon: "FileIcon",
  }
  ,
  {
    url: "/license-manager",
    name: "license-manager",
    slug: "license-manager",
    icon: "FileIcon",
  }
]
