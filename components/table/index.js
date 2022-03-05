import Pagination from "./pagination";
import {useState} from "react";

const TableColumn = ({columns}) => {
  return (
    <>
      {columns.map(column => (
        <th key={column.id}>{column.title}</th>
      ))}
    </>
  );
};

const TableRow = ({rows, columns}) => {

  return (
    <>
      {rows?.map(row => {
        return (
          <tr key={row._id}>
              {columns.map((column, index) => {
                if (column.render) {
                  return <td key={column.id}>{column.render(row)}</td>
                }
                if (column.key) {
                  return <td key={column.id}>{++index}</td>
                }
                return <td key={column.id}>{row[column.id]}</td>
              })}
            </tr>
        )
      })}
    </>
  )
};

const Table = (props) => {

  const {
    columns = [],
    rows = [],
    titleTable = '',
    widthContainer = ''
  } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="mt-8 overflow-x-auto lg:overflow-x-visible">
      <div className={`container-table lg:w-full ${widthContainer}`}>
        <h4>{titleTable}</h4>
        <table className='table'>
          <thead>
          <tr>
            <TableColumn columns={columns}/>
          </tr>
          </thead>
          <tbody>
            <TableRow
              columns={columns}
              rows={currentItems}
            />
          </tbody>
        </table>
        <Pagination
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          rows={rows}
          onPageChange={page => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default Table;