export const MENU = {
  patient: [
    {
      title: "Trang chính",
      link: "/",
    },
    {
      title: "Cập nhật hồ sơ",
      link: "/benh-nhan/ho-so",
    },
    {
      title: "Cập nhật tình trạng",
      link: "/benh-nhan/thong-tin-hang-ngay",
    },
  ],
  doctor: [
    {
      title: "Trang chính",
      link: "/",
    },
    {
      title: "Cập nhật hồ sơ",
      link: "/bac-si/ho-so",
    },
    {
      title: "Danh sách bệnh nhân",
      link: "/benh-nhan",
    },
  ],
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
          link: "/staff/ho-so",
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
      link: "/staff",
      roles: ["manager", "admin"],
      icon: "mdi mdi-account-box",

      subNav: [
        {
          title: "Thêm nhân viên",
          link: "/staff/ho-so",
          roles: ["manager", "admin"],
          icon: "mdi mdi-account-plus",
        },
      ],
    },
  ],
  staff_agent: [
    {
      title: "Dashboard",
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
      title: "Appointments",
      link: "/can-bo-quan-ly",
      roles: ["manager", "admin"],
      icon: "mdi mdi-account-circle",
    },
    {
      title: "Patients",
      link: "/benh-nhan",
      roles: ["agent", "manager", "admin"],
      icon: "mdi mdi-clipboard-account",
      subNav: [
        {
          title: "Patients",
          link: "/benh-nhan?scoring=0",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-medical-bag",
        },
        {
          title: "Patients Details",
          link: "/benh-nhan?scoringFrom=75",
          roles: ["agent", "manager", "admin"],
          icon: "mdi mdi-needle",
        },
      ],

    },
    {
      title: "Reports",
      link: "/staff",
      roles: ["manager", "admin"],
      icon: "mdi mdi-account-box",
    },
    {
      title: "Doctors",
      link: "/bac-si",
      roles: ["manager", "admin"],
      icon: "mdi mdi-account-card-details",

      subNav: [
        {
          title: "Doctors",
          link: "/bac-si/ho-so",
          roles: ["manager", "admin"],
          icon: "mdi mdi-account-plus",
        },
        {
          title: "Doctor Details",
          link: "/bac-si/ho-so",
          roles: ["manager", "admin"],
          icon: "mdi mdi-account-plus",
        },
      ],
    },
  ]
};