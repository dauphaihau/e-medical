export const MENU = {
  staff_manager: [
    {
      title: "Trang chính",
      link: "/",
      roles: ["agent", "manager", "admin"],
      icon: 'icon-Layout-4-blocks',
    },
    {
      title: "Danh sách CBQL",
      link: "/can-bo-quan-ly",
      roles: ["manager", "admin"],
      icon: "mdi mdi-account-circle",
      subNav: [
        {
          title: "Thêm CBQL",
          link: "/to-chuc/ho-so",
          roles: ["manager", "admin"],
          icon: "mdi mdi-account-plus",
        },
      ],
    },
    {
      title: "Danh sách bệnh nhân",
      link: "/benh-nhan",
      roles: ["agent", "manager", "admin"],
      icon: "mdi mdi-clipboard-account",
      subNav: [
        {
          title: "Danh sách hồi phục",
          link: "/benh-nhan?scoring=0",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-medical-bag",
        },
        {
          title: "Danh sách nặng",
          link: "/benh-nhan?scoringFrom=75",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-needle",
        },
        {
          title: "Danh sách vừa",
          link: "/benh-nhan?scoringFrom=25&scoringTo=74",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-pill",
        },
        {
          title: "Danh sách nhẹ",
          link: "/benh-nhan?scoringFrom=1&scoringTo=24",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-heart",
        },
        {
          title: "Thêm bệnh nhân",
          link: "/benh-nhan/thong-tin-ban-dau",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-account-plus",
        },
        {
          title: "Tải dữ liệu excel",
          link: "/benh-nhan/nhap-du-lieu",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-file-excel",
        },
      ],
    },
    {
      title: "Danh sách bác sĩ",
      link: "/bac-si",
      roles: ["manager", "admin"],
      icon: "mdi mdi-account-card-details",
      subNav: [
        {
          title: "Thêm bác sĩ",
          link: "/bac-si/ho-so",
          roles: ["manager", "admin"],
          icon: "mdi mdi-account-plus",
        },
      ],
    },
    {
      title: "Danh sách nhân viên",
      link: "/to-chuc",
      roles: ["manager", "admin"],
      icon: "mdi mdi-account-box",
      subNav: [
        {
          title: "Thêm nhân viên",
          link: "/to-chuc/ho-so",
          roles: ["manager", "admin"],
          icon: "mdi mdi-account-plus",
        },
      ],
    },
  ],
  staff_agent: [
    {
      title: "Tổng quan",
      link: "/",
      roles: ["agent", "manager", "admin"],
      icon: "icon-Layout-4-blocks",
    },
    {
      title: "Tổ chức",
      // link: "/to-chuc",
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
      roles: ["manager", "admin"],
      icon: "mdi mdi-account-card-details",
    },
    {
      title: "Thông tin lan truyền",
      link: "/thong-tin",
      roles: ["manager", "admin"],
      icon: "mdi mdi-account-card-details",
    },
    {
      title: "Người dùng",
      link: "/nguoi-dung",
      roles: ["manager", "admin"],
      icon: "mdi mdi-account-card-details",
    },
  ]
};