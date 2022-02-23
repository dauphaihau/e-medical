import React, {useState} from 'react';
import Input from "../../components/form/input";
import Pagination from "../../components/table/pagination";
import TitleContent from "../../components/title-content";

const data = [
  {
    username: 'Hau',
    phone: '901111921'
  },
  {
    username: 'Hau',
    phone: '901111921'
  },
  {
    username: 'Hau',
    phone: '901111921'
  },
  {
    username: 'Hau',
    phone: '901111921'
  },
  {
    username: 'Hau',
    phone: '901111921'
  },
  {
    username: 'Hau',
    phone: '901111921'
  },
  {
    username: 'Hau',
    phone: '901111921'
  },
  {
    username: 'Hau',
    phone: '901111921'
  },
  {
    username: 'Hau',
    phone: '901111921'
  },
  {
    username: 'Hau',
    phone: '901111921'
  },
  {
    username: 'Hau',
    phone: '901111921'
  },
  {
    username: 'Hau',
    phone: '901111921'
  },
  {
    username: 'Hau',
    phone: '901111921'
  },
  {
    username: 'Hau',
    phone: '901111921'
  },
]

const CbqlList = ({pagination}) => {
  const staffPerPage = 9;
  return (
    <TitleContent title='Danh sách CQBL'>
      <div>
        <div className='mb-4 md:w-1/3 lg:w-1/4'>
          <Input label='Tìm kiếm' direction='flex-col' placeholder='Tên hoặc số điện thoại'/>
        </div>
        <button className="btn w-[45%] md:w-[24%] lg:w-[15%] mb-4">
          Xem danh sách
        </button>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
          {data.map((user, index) => (
            <div className="box">
              <div className="box-header with-border">
                <a><h4 className="box-title">{user.username}</h4></a>
              </div>
              <div className="box-body">
                <div>Điện thoại: +84{user.phone}</div>
              </div>
            </div>
          ))}
        </div>
        {pagination && (
          <div className="flex justify-end">
            <Pagination
              staffPerPage={staffPerPage}
              data={data}
              totalStaff={data.length}
            />
          </div>
        )}
      </div>
    </TitleContent>
  );
}

export default CbqlList;