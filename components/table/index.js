import Pagination from "./pagination";
import Link from "next/link";
import Button from "../button";

const TableHeadItem = ({item}) => {
  return (
    <td className='font-bold' title={item}>{item}</td>
  );
};

const TableRow = ({data}) => {
  return (
    <tr>
      {data.map((item) => (<td key={Math.random()}>{item}</td>))}
    </tr>
  );
};

const Table = ({theadData, tbodyData, titleTable = '', pathLinkBtnAdd = ''}) => {
  return (
    <div className='container-table'>
      <div>
        <h4>{titleTable}</h4>
        <Link href={pathLinkBtnAdd}>
          <a>
            <Button>Thêm mới</Button>
          </a>
        </Link>
      </div>
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