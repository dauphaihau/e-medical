<<<<<<< HEAD
import {useState} from "react";
import Badge from "./badge";
import {getBadge} from "./constant";

export default function DataTable({data, columns, pagination}) {
  const [currentPage, setCurrentPage] = useState(1);

  const handleCountPage = data => {
    if (!data) return;
    let numPage = [1];
    for (let i = 1; i < data.length; i++) {
      if (data.length > i * 10) {
        numPage.push(i + 1)
      }
    }
    ;
    return numPage;
  };

  const numberPagination = handleCountPage(data);
  return (
    <>
      <div className="box drop-shadow-2xl">
        <table className="table-auto">
          <thead>
          <tr>
            {columns && columns.map((item, idx) => (
              <th
                className="sorting select-none"
                key={idx}
              >{item.text}</th>
            ))}
          </tr>
          </thead>
          <tbody>
          {data && data.map((item, idx) => (
            <tr className="sorting_1" key={idx}>
              <td className="value_sort select-none">{item.id}</td>
              <td className="value_sort select-none text-red-600">{item.text}</td>
              <td className="value_sort select-none">
                <Badge
                  status={getBadge(item.status)}
                />
              </td>
              <td className="value_sort action cursor-pointer select-none">
                <button className="btn-action">...</button>
                <div className="ls-action drop-shadow-xl absolute ">
                  <ul>
                    <li>View Details</li>
                    <li>Edit</li>
                    <li>Delete</li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
        {/* pagination */}
        {pagination &&
          (<div className="table__footer">
            <p className="ml-6 mt-3">Showing 1
              to {data && (data?.length < 10 ? data?.length : 10)} of {data?.length} entries</p>
            <div className="flex justify-end">
              <div className="pagination">
                <p className="mt-3 txt previous" onClick={() => setCurrentPage(1)}>Previous</p>
                {numberPagination?.map((item, idx) => {
                  return (
                    <a
                      key={idx}
                      className="cursor-pointer"
                      style={{
                        "backgroundColor": (currentPage === idx + 1) ? "#5156be" : "#fff",
                        "color": (currentPage === idx + 1) ? "#fff" : "black"
                      }}
                      onClick={() => setCurrentPage(idx + 1)}
                    >{item}</a>
                  )
                })}
                {!numberPagination && <span className="mt-3">...</span>}
                <p className="mt-3 txt next" onClick={() => setCurrentPage(numberPagination.length)}>Next</p>
              </div>
            </div>
          </div>)}
=======
import { useState } from "react";
import Badge from "@components/badge"
import Pagination from "../pagination";
// import {getBadge} from "./constant";

export default function Table({ data, columns }) {
  // const numberPagination = handleCountPage(data);
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
>>>>>>> origin/develop
      </div>
    </>
  )
}