export const MENU = {
  staff_manager: [
    {
      title: "Trang chính",
      link: "/",
      roles: ["agent", "manager", "admin"],
      icon: "icon-Layout-4-blocks",
    },
    {
      title: "Danh sách CBQL",
      link: "/can-bo-quan-ly",
      roles: ["manager", "admin"],
      icon: "mdi mdi-account-circle",
      subNav: [
        {
          title: "Thêm CBQL",
          link: "/school/ho-so",
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
      link: "/school",
      roles: ["manager", "admin"],
      icon: "mdi mdi-account-box",

      subNav: [
        {
          title: "Thêm nhân viên",
          link: "/school/ho-so",
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
      subNav: [
        {
          title: "Patients Dashboard",
          link: "/benh-nhan?scoring=0",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-medical-bag",
        },
        {
          title: "Patients Dashboard",
          link: "/benh-nhan?scoringFrom=75",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-needle",
        },
        {
          title: "Hospital Dashboard",
          link: "/benh-nhan?scoringFrom=75",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-needle",
        },
      ],

    },
    {
      title: "Tổ chức",
      link: "/can-bo-quan-ly",
      roles: ["manager", "admin"],
      icon: "mdi mdi-account-circle",
      subNav: [
        {
          title: "Trường",
          link: "/benh-nhan?scoring=0",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-medical-bag",
        },
        {
          title: "Niên Khoá",
          link: "/benh-nhan?scoringFrom=75",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-needle",
        },
        {
          title: "Khối",
          link: "/benh-nhan?scoringFrom=75",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-needle",
        },
        {
          title: "Lớp",
          link: "/benh-nhan?scoringFrom=75",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-needle",
        },
      ],

    },
    {
      title: "Quản lý hồ sơ học sinh",
      link: "/students",
      roles: ["agent", "manager", "admin"],
      icon: "mdi mdi-clipboard-account",
      subNav: [
        {
          title: "Giáo viên",
          link: "/students",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-medical-bag",
        },
      ]
    },
    {
      title: "Quản lý nhân sự trường",
      link: "/personnel",
      roles: ["manager", "admin"],
      icon: "mdi mdi-account-box",
      subNav: [
        {
          title: "Giáo viên",
          link: "/benh-nhan?scoring=0",
          roles: ["manager", "admin"],
          icon: "mdi mdi-medical-bag",
        },
        {
          title: "Cán bộ quản lý",
          link: "/benh-nhan?scoringFrom=75",
          roles: ["manager", "admin"],
          icon: "mdi mdi-needle",
        },
        {
          title: "Nhân viên ",
          link: "/benh-nhan?scoringFrom=75",
          roles: ["manager", "admin"],
          icon: "mdi mdi-needle",
        },
      ],
    },
    {
      title: "Phòng chống Covid-19",
      link: "/bac-si",
      roles: ["manager", "admin"],
      icon: "mdi mdi-account-card-details",
    },
    {
      title: "Thông tin lan truyền",
      link: "/bac-si",
      roles: ["manager", "admin"],
      icon: "mdi mdi-account-card-details",
    },
    {
      title: "Người dùng",
      link: "/bac-si",
      roles: ["manager", "admin"],
      icon: "mdi mdi-account-card-details",
    },
  ]
};