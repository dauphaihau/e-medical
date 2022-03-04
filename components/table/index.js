import Pagination from "./pagination";

const TableHeadItem = ({item}) => {
  return (
    <>
      <td title={item} className={item === 'STT' ? 'text-center' : 'text-left'}>{item}</td>
    </>
  );
};

const TableRow = ({data}) => {
  return (
    <tr>
      {data?.map(item => (
        <td
          key={Math.random()}>{item}
        </td>
      ))}
    </tr>
  )
};

const Table = ({theadData, tbodyData, titleTable = '', widthContainer = ''}) => {
  return (
    <div className={`container-table ${widthContainer}`}>
      <h4>{titleTable}</h4>
      <table className='table'>
        <thead>
        <tr>
          {theadData.map((h) => (<TableHeadItem key={h} item={h}/>))}
          <td/>
        </tr>
        </thead>
        <tbody>
          {tbodyData?.map((item) => (<TableRow key={item.id} data={item.items}/>))}
        </tbody>
      </table>
      <Pagination data={tbodyData}/>
    </div>
  );
};

export default Table;