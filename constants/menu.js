export const MENU = {

  admin: [
    {
      title: "Tổng quan",
      link: "/",
      id: 'summary',
      roles: ["agent", "manager", "admin"],
      icon: "icon-Layout-4-blocks",
    },
    {
      title: "Tổ chức",
      // link: "/to-chuc",
      id: 'organize',
      roles: ["manager", "admin"],
      icon: "icon-Library",
      subNav: [
        {
          title: "Trường",
          link: "/to-chuc/truong",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-medical-bag",
          features: {
            add: '/to-chuc/truong/them',
            id: '/to-chuc/truong/[id]',
          }
        },
        {
          title: "Niên Khoá",
          link: "/to-chuc/nien-khoa",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-needle",
          features: {
            add: '/to-chuc/nien-khoa/them',
            id: '/to-chuc/nien-khoa/[id]',
          }
        },
        {
          title: "Khối",
          link: "/to-chuc/khoi",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-needle",
          features: {
            add: '/to-chuc/khoi/them',
            id: '/to-chuc/khoi/[id]',
          }
        },
        {
          title: "Lớp",
          link: "/to-chuc/lop",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-needle",
          features: {
            add: '/to-chuc/lop/them',
            id: '/to-chuc/lop/[id]',
          }
        },
      ],
    },
    {
      title: "Quản lý hồ sơ học sinh",
      link: "/hoc-sinh",
      id: 'student',
      roles: ["agent", "manager", "admin"],
      icon: "icon-User",
      subNav: [
        {
          title: "Phụ Huynh",
          link: "/phu-huynh",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-medical-bag",
          features: {
            add: '/phu-huynh/them',
            id: '/phu-huynh/[id]',
          }
        },
        {
          title: "Học Sinh",
          link: "/hoc-sinh",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-medical-bag",
          features: {
            add: '/hoc-sinh/them',
            id: '/hoc-sinh/[id]',
            medical: '/hoc-sinh/[id]/kham-suc-khoe',
            declareMedical: '/hoc-sinh/[id]/khai-bao-y-te',
            vaccine: '/hoc-sinh/[id]/tiem-chung',
          }
        },
      ],
    },
    {
      title: "Quản lý nhân sự trường",
      // link: "/nhan-su",
      id: 'hr',
      roles: ["manager", "admin"],
      icon: "icon-File-plus",
      subNav: [
        {
          title: "Giáo viên",
          link: "/nhan-su/giao-vien",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-medical-bag",
          features: {
            add: '/nhan-su/giao-vien/them',
            id: '/nhan-su/giao-vien/[id]',
          }
        },
        {
          title: "Cán bộ quản lý",
          link: "/nhan-su/can-bo",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-needle",
        },
        {
          title: "Nhân Viên",
          link: "/nhan-su/nhan-vien",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-needle",
          features: {
            add: '/nhan-su/nhan-vien/them',
            id: '/nhan-su/nhan-vien/[id]',
          }
        },
      ],
    },
    {
      title: "Phòng chống Covid-19",
      // link: "/protection",
      id: 'covid-19',
      roles: ["manager", "admin"],
      icon: "mdi mdi-account-card-details",
    },
    {
      title: "Thông tin lan truyền",
      id: 'news',
      link: "/thong-tin",
      roles: ["manager", "admin"],
      icon: "mdi mdi-account-card-details",
    },
    {
      title: "Người dùng",
      id: 'users',
      link: "/nguoi-dung",
      roles: ["manager", "admin"],
      icon: "mdi mdi-account-card-details",
    },
  ],

  manager: [
    {
      title: "Tổng quan",
      link: "/",
      id: 'summary',
      roles: ["agent", "manager", "admin"],
      icon: "icon-Layout-4-blocks",
    },
    {
      title: "Tổ chức",
      // link: "/to-chuc",
      id: 'organize',
      roles: ["manager", "admin"],
      icon: "icon-Library",
      subNav: [
        {
          title: "Trường",
          link: "/to-chuc/truong",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-medical-bag",
          features: {
            add: '/to-chuc/truong/them',
            id: '/to-chuc/truong/[id]',
          }
        },
        {
          title: "Niên Khoá",
          link: "/to-chuc/nien-khoa",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-needle",
          features: {
            add: '/to-chuc/nien-khoa/them',
            id: '/to-chuc/nien-khoa/[id]',
          }
        },
        {
          title: "Khối",
          link: "/to-chuc/khoi",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-needle",
          features: {
            add: '/to-chuc/khoi/them',
            id: '/to-chuc/khoi/[id]',
          }
        },
        {
          title: "Lớp",
          link: "/to-chuc/lop",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-needle",
          features: {
            add: '/to-chuc/lop/them',
            id: '/to-chuc/lop/[id]',
          }
        },
      ],
    },
    {
      title: "Quản lý hồ sơ học sinh",
      link: "/hoc-sinh",
      id: 'student',
      roles: ["agent", "manager", "admin"],
      icon: "icon-User",
      subNav: [
        {
          title: "Phụ Huynh",
          link: "/phu-huynh",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-medical-bag",
          features: {
            add: '/phu-huynh/them',
            id: '/phu-huynh/[id]',
          }
        },
        {
          title: "Học Sinh",
          link: "/hoc-sinh",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-medical-bag",
          features: {
            add: '/hoc-sinh/them',
            id: '/hoc-sinh/[id]',
            medical: '/hoc-sinh/[id]/kham-suc-khoe',
            declareMedical: '/hoc-sinh/[id]/khai-bao-y-te',
            vaccine: '/hoc-sinh/[id]/tiem-chung',
          }
        },
      ],
    },
    {
      title: "Quản lý nhân sự trường",
      // link: "/nhan-su",
      id: 'hr',
      roles: ["manager", "admin"],
      icon: "icon-File-plus",
      subNav: [
        {
          title: "Giáo viên",
          link: "/nhan-su/giao-vien",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-medical-bag",
          features: {
            add: '/nhan-su/giao-vien/them',
            id: '/nhan-su/giao-vien/[id]',
          }
        },
        {
          title: "Cán bộ quản lý",
          link: "/nhan-su/can-bo",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-needle",
        },
        {
          title: "Nhân Viên",
          link: "/nhan-su/nhan-vien",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-needle",
          features: {
            add: '/nhan-su/nhan-vien/them',
            id: '/nhan-su/nhan-vien/[id]',
          }
        },
      ],
    },
    {
      title: "Phòng chống Covid-19",
      // link: "/protection",
      id: 'covid-19',
      roles: ["manager", "admin"],
      icon: "mdi mdi-account-card-details",
    },
    {
      title: "Thông tin lan truyền",
      id: 'news',
      link: "/thong-tin",
      roles: ["manager", "admin"],
      icon: "mdi mdi-account-card-details",
    },
    {
      title: "Người dùng",
      id: 'users',
      link: "/nguoi-dung",
      roles: ["manager", "admin"],
      icon: "mdi mdi-account-card-details",
    },
  ],

  staff: [
    {
      title: "Tổng quan",
      link: "/",
      id: 'summary',
      roles: ["agent", "manager", "admin"],
      icon: "icon-Layout-4-blocks",
    },
    {
      title: "Quản lý hồ sơ học sinh",
      link: "/hoc-sinh",
      id: 'student',
      roles: ["agent", "manager", "admin"],
      icon: "icon-User",
      subNav: [
        {
          title: "Phụ Huynh",
          link: "/phu-huynh",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-medical-bag",
          features: {
            add: '/phu-huynh/them',
            id: '/phu-huynh/[id]',
          }
        },
        {
          title: "Học Sinh",
          link: "/hoc-sinh",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-medical-bag",
          features: {
            add: '/hoc-sinh/them',
            id: '/hoc-sinh/[id]',
            medical: '/hoc-sinh/[id]/kham-suc-khoe',
            declareMedical: '/hoc-sinh/[id]/khai-bao-y-te',
            vaccine: '/hoc-sinh/[id]/tiem-chung',
          }
        },
      ],
    },
    {
      title: "Quản lý nhân sự trường",
      // link: "/nhan-su",
      id: 'hr',
      roles: ["manager", "admin"],
      icon: "icon-File-plus",
      subNav: [
        {
          title: "Giáo viên",
          link: "/nhan-su/giao-vien",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-medical-bag",
          features: {
            add: '/nhan-su/giao-vien/them',
            id: '/nhan-su/giao-vien/[id]',
          }
        },
        // {
        //   title: "Cán bộ quản lý",
        //   link: "/nhan-su/cbql",
        //   roles: ["agent", "manager", "admin"],
        //   icon: "mdi mdi-needle",
        // },
        {
          title: "Nhân Viên",
          link: "/nhan-su/nhan-vien",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-needle",
          features: {
            add: '/nhan-su/nhan-vien/them',
            id: '/nhan-su/nhan-vien/[id]',
          }
        },
      ],
    },
    {
      title: "Phòng chống Covid-19",
      // link: "/protection",
      id: 'covid-19',
      roles: ["manager", "admin"],
      icon: "mdi mdi-account-card-details",
    },
    {
      title: "Thông tin lan truyền",
      id: 'news',
      link: "/thong-tin",
      roles: ["manager", "admin"],
      icon: "mdi mdi-account-card-details",
    },
    {
      title: "Người dùng",
      id: 'users',
      link: "/nguoi-dung",
      roles: ["manager", "admin"],
      icon: "mdi mdi-account-card-details",
    },
  ],

  parent: [
    {
      title: "Tổng quan",
      link: "/",
      id: 'summary',
      roles: ["agent", "manager", "admin"],
      icon: "icon-Layout-4-blocks",
    },
    {
      title: "Quản lý hồ sơ học sinh",
      link: "/hoc-sinh",
      id: 'student',
      roles: ["agent", "manager", "admin"],
      icon: "icon-User",
      subNav: [
        {
          title: "Học Sinh",
          link: "/hoc-sinh",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-medical-bag",
          features: {
            add: '/hoc-sinh/them',
            id: '/hoc-sinh/[id]',
            medical: '/hoc-sinh/[id]/kham-suc-khoe',
            declareMedical: '/hoc-sinh/[id]/khai-bao-y-te',
            vaccine: '/hoc-sinh/[id]/tiem-chung',
          }
        },
      ],
    },
    {
      title: "Phòng chống Covid-19",
      // link: "/protection",
      id: 'covid-19',
      roles: ["manager", "admin"],
      icon: "mdi mdi-account-card-details",
    },
    {
      title: "Thông tin lan truyền",
      id: 'news',
      link: "/thong-tin",
      roles: ["manager", "admin"],
      icon: "mdi mdi-account-card-details",
    },
    {
      title: "Người dùng",
      id: 'users',
      link: "/nguoi-dung",
      roles: ["manager", "admin"],
      icon: "mdi mdi-account-card-details",
    },
  ],

  teacher: [
    {
      title: "Tổng quan",
      link: "/",
      id: 'summary',
      roles: ["agent", "manager", "admin"],
      icon: "icon-Layout-4-blocks",
    },
    {
      title: "Quản lý hồ sơ học sinh",
      link: "/hoc-sinh",
      id: 'student',
      roles: ["agent", "manager", "admin"],
      icon: "icon-User",
      subNav: [
        {
          title: "Phụ Huynh",
          link: "/phu-huynh",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-medical-bag",
          features: {
            add: '/phu-huynh/them',
            id: '/phu-huynh/[id]',
          }
        },
        {
          title: "Học Sinh",
          link: "/hoc-sinh",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-medical-bag",
          features: {
            add: '/hoc-sinh/them',
            id: '/hoc-sinh/[id]',
            medical: '/hoc-sinh/[id]/kham-suc-khoe',
            declareMedical: '/hoc-sinh/[id]/khai-bao-y-te',
            vaccine: '/hoc-sinh/[id]/tiem-chung',
          }
        },
      ],
    },
    {
      title: "Phòng chống Covid-19",
      // link: "/protection",
      id: 'covid-19',
      roles: ["manager", "admin"],
      icon: "mdi mdi-account-card-details",
    },
    {
      title: "Thông tin lan truyền",
      id: 'news',
      link: "/thong-tin",
      roles: ["manager", "admin"],
      icon: "mdi mdi-account-card-details",
    },
    {
      title: "Người dùng",
      id: 'users',
      link: "/nguoi-dung",
      roles: ["manager", "admin"],
      icon: "mdi mdi-account-card-details",
    },
  ],
};