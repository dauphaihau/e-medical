import React from 'react';
import TitleContent from "../../components/title-content";

const StaffDetail = () => {
  return (
    <TitleContent title='Thông tin chi tiết'>
      <div className='staff-detail'>
        <div className='staff-'>
          <div className="box lg:w-[500px]">
            <div className="box-header with-border">
              <h4 className="box-title">Thông tin Nhân Viên</h4>
            </div>
            <div className="box-body">
              <p>Ngày sinh: </p>
              <p>Giới tính: Nam</p>
              <p>Zalo/Facetime: -</p>
              <p>Địa chỉ: </p>
              <p>Điện thoại: +84</p>
            </div>
          </div>
          <div className="box lg:w-[500px]">
            <div className="box-header with-border">
              <h4 className="box-title">Khu vực phụ trách</h4>
            </div>
            <div className="box-body">
              <p>Khu phố : -</p>
              <p>Phường : </p>
              <p>Quận : </p>
            </div>
          </div>
        </div>
        <button className='btn mb-4'>Cập nhật thông tin</button>
      </div>
    </TitleContent>
  );
}

export default StaffDetail;