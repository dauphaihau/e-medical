import Input from "../../components/form/input";
import Table from "../../components/table";
import TitleContent from "../../components/title-contet";
import Select from "react-select";

const theadData = [
  'STT',
  'Tên trường', 'Niên khoá',
  'Số lớp',
  'Số học sinh',
  'Thời gian bắt đầu',
  'Thời gian kết thúc'
  , 'Chỉnh sửa'
];

const editIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
</svg>;

const tbodyData = [
  {
    id: "1",
    items: ["1", "Harvard", "2000-2001", "A1", '10', '10/20/1990', '10/20/1991', editIcon],
  },
  {
    id: "2",
    items: ["2", "Harvard", "2000-2001", "A1", '10', '10/20/1990', '10/20/1991', editIcon],
  },
  {
    id: "3",
    items: ["2", "Harvard", "2000-2001", "A1", '10', '10/20/1990', '10/20/1991', editIcon],
  },
  {
    id: "3",
    items: ["2", "Harvard", "2000-2001", "A1", '10', '10/20/1990', '10/20/1991', editIcon],
  },
  {
    id: "3",
    items: ["2", "Harvard", "2000-2001", "A1", '10', '10/20/1990', '10/20/1991', editIcon],
  },
  {
    id: "3",
    items: ["2", "Harvard", "2000-2001", "A1", '10', '10/20/1990', '10/20/1991', editIcon],
  },
  {
    id: "3",
    items: ["2", "Harvard", "2000-2001", "A1", '10', '10/20/1990', '10/20/1991', editIcon],
  },
  {
    id: "3",
    items: ["2", "Harvard", "2000-2001", "A1", '10', '10/20/1990', '10/20/1991', editIcon],
  },
  {
    id: "3",
    items: ["2", "Harvard", "2000-2001", "A1", '10', '10/20/1990', '10/20/1991', editIcon],
  },
  {
    id: "3",
    items: ["2", "Harvard", "2000-2001", "A1", '10', '10/20/1990', '10/20/1991', editIcon],
  },
];

const options = [
  {value: 'chocolate', label: 'Chocolate'},
  {value: 'strawberry', label: 'Strawberry'},
  {value: 'vanilla', label: 'Vanilla'}
]

const customStyles = {
  control: (base, state) => ({
    ...base,
    background: "#f3f6f9",
    borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
    // borderColor: state.isFocused ? "yellow" : "green",
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      // borderColor: state.isFocused ? "red" : "blue"
    }
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 0,
    marginTop: 0
  }),
  menuList: (base) => ({
    ...base,
    padding: 0
  })
};


const handleAddUser = (selectedOptions) => {
  const selectedUsers = [];
  for (let option of selectedOptions) {
    selectedUsers.push(parseInt(option.value));
  }
  setFieldValue('listUserAsign', selectedUsers)
}

let prepareUserList = () => {
  let options = [];

  // eslint-disable-next-line array-callback-return
  options?.map((user) => {
    options.push({
      value: user.userId,
      label: user.name
    })
  });
  return options;
}

const NienKhoaList = ({stateSidebar}) => {
  return (
    <>
      <TitleContent title='Niên khoá' stateSidebar={stateSidebar}>
        <Select
          styles={customStyles}
          options={options}
        />
        <Select
          closeMenuOnSelect={false}
          defaultValue={[options[0], options[1]]}
          isMulti
          options={options}
          styles={customStyles}
        />
        <Input width='md:w-1/2 lg:w-1/4' name='search' placeholder='Search anything...'/>
        <div className="box mt-[50px] drop-shadow-2xl overflow-x-auto">
          <Table theadData={theadData} tbodyData={tbodyData}/>
        </div>
      </TitleContent>
    </>
  );
}

export default NienKhoaList;