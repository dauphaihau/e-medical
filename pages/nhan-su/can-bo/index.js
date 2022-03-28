import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import _ from "lodash";
import swal from "sweetalert";
import Link from 'next/link'

import {memberService} from "@services";
import Input from "@components/form/input";
import {PencilIcon, TrashIcon} from "@heroicons/react/outline";
import Button from "@components/button";
import {locationService, schoolService} from "../../../services";
import Select from "../../../components/form/select";
import {useAuth} from "../../../context/auth";

const Manager = () => {
  const router = useRouter();
  const {query} = router;
  const {user} = useAuth()
  const [members, setMembers] = useState();

  const [schoolOptions, setSchoolOptions] = useState([]);
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([])
  const [wardOptions, setWardOptions] = useState([])

  const [selects, setSelects] = useState({
    s: '',
    province: {
      value: '',
      label: ''
    },
    district: {
      value: '',
      label: ''
    },
    ward: {
      value: '',
      label: ''
    },
  })
  const [filter, setFilter] = useState({
    s: '',
    province: '',
    district: '',
    ward: '',
  })

  useEffect(() => {
    if (!router.isReady) return;
    loadInit();
    return () => {};
  }, [router.isReady]);

  const loadInit = async () => {
    const provinces = await locationService.listProvince();
    setProvinceOptions(provinces);

    if (user && user?.role === 'admin') {
      const schools = await schoolService.list({limit: 100});
      if (schools.total) {
        const schoolOptions = schools.data.map((data) => ({
          value: data._id,
          label: data.schoolname,
        }));
        setSchoolOptions(schoolOptions);
      }
    }

    if (_.isEmpty(query)) {
      const listMember = await memberService.listManagers();
      setMembers(listMember);
    } else {
      const listMember = await memberService.listManagers(query);
      setMembers(listMember);

      if (query.province) {
        const provinceOption = _.find(provinces, (o) => o.code === query.province);
        setSelects({...selects, ...{province: provinceOption}});
        const districtOptions = await locationService.listDistrict(query.province);
        setDistrictOptions(districtOptions);
        if (query.district) {
          const districts = await locationService.listDistrict(provinceOption.code);
          const districtOption = _.find(districts, (o) => o.code === query.district);
          setSelects({...selects, ...{district: districtOption, province: provinceOption}})
          const wardOptions = await locationService.listWard(query.district);
          setWardOptions(wardOptions);
          if (query.ward) {
            const wards = await locationService.listWard(districtOption.code);
            const wardOption = _.find(wards, (o) => o.code === query.ward);
            setSelects({...selects, ...{ward: wardOption, district: districtOption, province: provinceOption}})
          }
        }
      }
    }
  }

  const onChangeProvince = async (e) => {
    const districts = await locationService.listDistrict(e.code);
    setDistrictOptions(districts);
  }

  const onChangeDistrict = async (e) => {
    const wards = await locationService.listWard(e.code);
    setWardOptions(wards);
  }

  const handleDelete = async (id) => {
    swal({
      title: "Bạn chắc chắn muốn xóa?",
      text: "",
      icon: "warning",
      buttons: true,
      successMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const result = await memberService.remove(id);
        swal({
          title: result.message,
          icon: result.status?"success":"error"
        })
          .then(() => (result.status || result.statusCode === 403) && router.reload())
      }
    });
  };

  const handleSubmitSearch = async (e) => {
    e.preventDefault();
    const newFilter = _.omitBy(filter, _.isEmpty);

    router.push({
        pathname: router.pathname,
        query: _.pickBy(newFilter, _.identity),
      },
      undefined,
      {shallow: true}
    );

    const res = await memberService.list({...newFilter, type: 'manager'})
    if (!res) {
      swal({
        text: "Nội dung tìm kiếm ít nhất là 3 ký tự",
        icon: "error"
      });
    }
    setMembers(res)
  };

  return (
    <>
      <h4>Danh sách cán bộ quản lý</h4>
      <form onSubmit={handleSubmitSearch}>
        <div className="grid-container">
          <Input
            label='Tìm kiếm'
            placeholder='Tên cán bộ quản lý' name="s"
            onChange={e => setFilter({...filter, s: e.target.value})}
          />
          <Select
            label='Tỉnh/thành'
            name='province'
            placeholder='Chọn Tỉnh thành'
            onChange={e => {
              onChangeProvince(e);
              setSelects({...selects, ...{province: e, district: null, ward: null}})
              setFilter({...filter, province: e.code, district: '', ward: ''})
            }}
            value={selects.province}
            options={provinceOptions}
          />
          <Select
            placeholder='Chọn Quận'
            label='Quận/huyện'
            name='district'
            value={selects.district}
            onChange={e => {
              onChangeDistrict(e)
              setSelects({...selects, ...{district: e, ward: null}});
              setFilter({...filter, district: e.code, ward: ''})
            }}
            options={districtOptions}
          />
          <Select
            placeholder='Chọn Phường'
            label='Phường/Xã'
            name='ward'
            value={selects.ward}
            onChange={e => {
              setSelects({...selects, ...{ward: e}})
              setFilter({...filter, ward: e.code})
            }}
            options={wardOptions}
          />
          {user && user?.role === 'admin' &&
            <>
              <Select
                label='Tên trường'
                name='schoolId'
                onChange={e => {
                  setSelects({...selects, ...{school: e}})
                  setFilter({...filter, schoolId: e.value})
                }}
                options={schoolOptions}
              />
            </>
          }
        </div>
        <Button type='submit'>Tìm kiếm</Button>
      </form>
      <div className="mt-8 drop-shadow-2xl overflow-x-auto lg:overflow-x-visible">
        <div className='container-table'>
          <table className='table'>
            <thead>
              <tr>
                <th className="w-3">STT</th>
                <th>Họ tên</th>
                <th>Phone</th>
                <th>Địa chỉ</th>
                <th/>
              </tr>
            </thead>
            <tbody>
              {!_.isEmpty(members?.data)
                ? members.data?.map((row, idz) => (
                  <tr key={idz}>
                    <td>{idz + 1}</td>
                    <td className='text-center'>{row.fullName}</td>
                    <td className='text-center'>{row.phoneNumber}</td>
                    <td className='text-center'>{row.address}</td>
                    <td className='text-center'>
                      <Link href={router.pathname + '/' + row._id}>
                        <a><PencilIcon className='h-5 w-5 inline'/></a>
                      </Link>
                      <TrashIcon
                        className='h-5 w-5 inline ml-4 cursor-pointer'
                        onClick={() => handleDelete(row._id)}
                      />
                    </td>
                    </tr>
                ))
                : (<tr><td colSpan='4'>Chưa có dữ liệu</td></tr>)
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Manager;