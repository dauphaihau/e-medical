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
      {data.map((item) => (<td key={item}>{item}</td>))}
    </tr>
  );
};

const Table = ({theadData, tbodyData, title, className, children, ...other}) => {
  return (
    <div className="container_table drop-shadow-2xl">
      <h1 className="font-bold ml-6">{title}</h1>
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
    </div>
  );
};

export default Table;