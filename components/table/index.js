import Pagination from "./pagination";
import {useState} from "react";

const TableRow = ({rows, columns, handleAlign}) => {

  return (
    <>
      {rows?.map((row, index) => {
        return (
          <tr key={row._id}>
              {columns.map((column) => {
                if (column.render) {
                  return <td key={column.id} className={handleAlign(column)}>{column.render(row)}</td>
                }
                if (column.key) {
                  return <td key={column.id} className={handleAlign(column)}>{index + 1}</td>
                }
                return <td key={column.id} className={handleAlign(column)}>{row[column.id]}</td>
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
    itemsPerPage = 10,
    titleTable = '',
    widthContainer = ''
  } = props;

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem);

  const handleAlign = (props) => {
    return props.align === 'center' ? 'text-center' : 'text-left'
  };

  return (
    <div className="mt-8 overflow-x-auto lg:overflow-x-visible">
      <div className={`container-table lg:w-full ${widthContainer}`}>
        <h4>{titleTable}</h4>
        <table className='table'>
          <thead>
          <tr className='text-center'>
            {columns.map(column => (
              <th className={handleAlign(column)} key={column.id}>{column.title}</th>
            ))}
          </tr>
          </thead>
          <tbody>
            <TableRow
              columns={columns}
              rows={currentItems}
              handleAlign={value => handleAlign(value)}
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