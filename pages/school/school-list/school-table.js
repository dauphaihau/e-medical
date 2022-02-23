import Pagination from "../../../components/table/pagination";
import Table from "../../../components/table";

const SchoolTable = ({data, columns, pagination}) => {
  const staffPerPage = 12;
  return (
    <div className="box mt-[50px] drop-shadow-2xl overflow-x-auto">
      <Table data={data} columns={columns}/>
      {/*<table className="table-auto w-full">*/}
      {/*  <thead>*/}
      {/*  <tr>*/}
      {/*    {columns && columns.map((item, idx) => (*/}
      {/*      <th*/}
      {/*        className="sorting w-[10%] select-none"*/}
      {/*        key={idx}*/}
      {/*      >*/}
      {/*        {item.text}*/}
      {/*      </th>*/}
      {/*    ))}*/}
      {/*  </tr>*/}
      {/*  </thead>*/}
      {/*  <tbody>*/}
      {/*  {data && data.map((item, idx) => (*/}
      {/*    <tr className="sorting_1" key={idx}>*/}
      {/*      <td className="value_sort select-none">{item.id}</td>*/}
      {/*      <td className="value_sort select-none text-red-600">{item.fullName}</td>*/}
      {/*      <td className="value_sort select-none text-red-600">{item.phone}</td>*/}
      {/*      <td className="value_sort select-none text-red-600">{item.province}</td>*/}
      {/*      <td className="value_sort select-none text-red-600">{item.district}</td>*/}
      {/*      <td className="value_sort select-none text-red-600">{item.ward}</td>*/}
      {/*      <td className="value_sort relative action cursor-pointer select-none">*/}
      {/*        <button className="btn-action">...</button>*/}
      {/*        <div className="ls-action right-[10%] z-10 drop-shadow-xl absolute ">*/}
      {/*          <ul>*/}
      {/*            <li>View Details</li>*/}
      {/*            <li>Edit</li>*/}
      {/*            <li>Delete</li>*/}
      {/*          </ul>*/}
      {/*        </div>*/}
      {/*      </td>*/}
      {/*    </tr>*/}
      {/*  ))}*/}
      {/*  </tbody>*/}
      {/*</table>*/}

      {/* pagination */}
      {/*{pagination &&*/}
      {/*  (*/}
      {/*    <div className="table__footer p-4 flex items-center justify-between">*/}
      {/*      <p className="hidden md:block ml-6">Showing 1*/}
      {/*        to {data && (data?.length < 10 ? data?.length : 10)} of {data?.length} entries</p>*/}
      {/*      <div className="flex justify-end">*/}
      {/*        <Pagination*/}
      {/*          staffPerPage={staffPerPage}*/}
      {/*          totalStaff={data.length}*/}
      {/*          data={data}*/}
      {/*        />*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  )}*/}
    </div>
  )
}

export default SchoolTable;