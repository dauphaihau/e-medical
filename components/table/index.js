import Pagination from "./pagination";

const TableHeadItem = ({item}) => {
  return (
    <td title={item} className={item === 'STT' ? 'text-center' : 'text-left'}>{item}</td>
  );
};

const TableRow = ({data}) => {
  return (
    <tr>
      {data.map(item => (
        <td
          // className={item[0] ? 'text-center' : 'text-left'}
          key={Math.random()}>{item}
        </td>
      ))}
    </tr>
  )
};

const Table = ({theadData, tbodyData, titleTable = ''}) => {
  return (
    <div className='container-table'>
      <h4>{titleTable}</h4>
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