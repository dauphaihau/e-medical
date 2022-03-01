import Pagination from "./pagination";

const TableHeadItem = ({item}) => {
  return (
    <td title={item}>
      {item}
    </td>
  );
};

const TableRow = ({data}) => {
  return (
    <tr>
      {data.map((item) => (<td key={Math.random()}>{item}</td>))}
    </tr>
  );
};

const Table = ({theadData, tbodyData}) => {
  return (
    <div className='container-table'>
      <table className='table'>
        <thead>
        <tr>
          {theadData.map((h) => (<TableHeadItem key={h} item={h}/>))}
        </tr>
        </thead>
        <tbody>
        {tbodyData.map((item) => (<TableRow key={item.id} data={item.items}/>))}
        </tbody>
      </table>
      <Pagination data={tbodyData}/>
    </div>
  );
};

export default Table;