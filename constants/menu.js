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
      id: 1,
      title: "Tổng quan",
      link: "/",
      roles: ["agent", "manager", "admin"],
      icon: "icon-Layout-4-blocks",
    },
    {
      id: 2,
      title: "Tổ chức",
      // link: "/to-chuc",
      roles: ["manager", "admin"],
      icon: "icon-Library",
      subNav: [
        {
          id: 2.1,
          title: "Trường",
          link: "/to-chuc/truong",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-medical-bag",
        },
        {
          id: 2.2,
          title: "Niên Khoá",
          link: "/to-chuc/nien-khoa",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-needle",
        },
        {
          id: 2.3,
          title: "Khối",
          link: "/to-chuc/khoi",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-needle",
        },
        {
          id: 2.4,
          title: "Lớp",
          link: "/to-chuc/lop",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-needle",
        },
      ],
    },
    {
      id: 3,
      title: "Quản lý hồ sơ học sinh",
      link: "/hoc-sinh",
      roles: ["agent", "manager", "admin"],
      icon: "icon-User",
    },
    {
      id: 4,
      title: "Quản lý nhân sự trường",
      // link: "/nhan-su",
      roles: ["manager", "admin"],
      icon: "icon-File-plus",
      subNav: [
        {
          id: 4.1,
          title: "Giáo viên",
          link: "/nhan-su/giao-vien",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-medical-bag",
        },
        {
          title: "Cán bộ quản lý",
          link: "/nhan-su/cbql",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-needle",
        },
        {
          title: "Nhân Viên",
          link: "/nhan-su/nhan-vien",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-needle",
        },
      ],
    },
    {
      id: 5,
      title: "Phòng chống Covid-19",
      // link: "/protection",
      roles: ["manager", "admin"],
      icon: "mdi mdi-account-card-details",
    },
    {
      id: 6,
      title: "Thông tin lan truyền",
      link: "/thong-tin",
      roles: ["manager", "admin"],
      icon: "mdi mdi-account-card-details",
    },
    {
      id: 7,
      title: "Người dùng",
      link: "/nguoi-dung",
      roles: ["manager", "admin"],
      icon: "mdi mdi-account-card-details",
    },
  ]
};