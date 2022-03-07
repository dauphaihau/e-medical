import {useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {PencilIcon, TrashIcon} from "@heroicons/react/outline";
import Input from "@components/form/input";
import {schoolService} from "@services";

const SchoolList = () => {
  const [schools, setSchools] = useState([])
  const router = useRouter();

  useEffect(async () => {
    try {
      const {...response} = await schoolService.list()
      setSchools(response.data)
    } catch (error) {
      console.log({error})
    }
  }, []);

  const handleDelete = async (id) => {
    swal({
      title: "Bạn chắc chắn muốn xóa?",
      text: "",
      icon: "warning",
      buttons: true,
      successMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const result = await schoolService.delete(id);
        if(result){
          router.reload();
        }
        else{
          swal('Xóa không thành công!!', '', 'error');s
        }
      }
    });
  
  };

  return (
    <>
      <h4>Tổ chức</h4>
      <Input className='md:w-1/2 lg:w-1/4' placeholder='Tìm kiếm...' name="s"/>
      <div className="mt-8 overflow-x-auto lg:overflow-x-visible">
        <div className='container-table'>
          <h4>Danh sách trường</h4>
          <table className='table'>
            <thead>
              <tr>
                <th className='text-center'>STT</th>
                <th>Tên trường</th>
                <th>Địa chỉ</th>
                <th>Tỉnh/thành</th>
                <th>Quận/Huyện</th>
                <th>Phường/Xã</th>
                <th/>
              </tr>
            </thead>
            <tbody>
              {schools?.map((school, index) => (
                <tr key={index}>
                  <td>{parseInt(skip) + index + 1}</td>
                  <td>{school.schoolname}</td>
                  <td>{school.address}</td>
                  <td>{school.province?.provinceName}</td>
                  <td>{school.district?.districtName}</td>
                  <td>{school.ward?.wardName}</td>
                  <td>
                     <Link href={`/to-chuc/truong/${school._id}`}>
                       <a><PencilIcon className='h-5 w-5 inline'/></a>
                     </Link>
                     <TrashIcon
                       className='h-5 w-5 inline ml-4 cursor-pointer'
                       onClick={() => handleDelete(school._id)}
                     />
                  </td>
              </tr>
              ))}
            </tbody>
          </table>
          <Pagination data={schools}/>
        </div>
      </div>

    </>
  );
}

export default SchoolList;

