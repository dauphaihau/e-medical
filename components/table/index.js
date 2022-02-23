import Pagination from "../pagination";
// import {getBadge} from "./constant";

export default function Table({ data, columns }) {
  return (
    <>
      <div className="container_table drop-shadow-2xl">
        <table className="table">
          <thead>
            <tr>
              {columns && columns.map((item, idx) => (
                <th
                  key={idx}
                >{item.text}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data && data.map((item, idx) => (
              <tr className="sorting_1 " key={idx}>
                <td>{item.id}</td>
                <td>{item.fullName}</td>
                <td>{item.className}</td>
                <td>...</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          data={data}
        />
      </div>
    </>
  )
}