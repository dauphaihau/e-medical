import {useEffect, useState} from "react";
import Link from "next/link";
import swal from "sweetalert";
import {useRouter} from "next/router";
import _ from "lodash";

import {EyeIcon, PencilIcon, TrashIcon} from "@heroicons/react/outline";
import Input from "@components/form/input";
import Pagination from "@components/pagination";
import {schoolService} from "@services";
import Button from "@components/button";
import {locationService} from "@services";
import Select from "@components/form/select";
import {useAuth} from "../../../context/auth";

const SchoolList = () => {
  const router = useRouter();
  const {user} = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [schools, setSchools] = useState([])

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

  let skip = 0;

  useEffect(() => {
    if (!router.isReady) return;
    loadInit();
    return () => {};
  }, [router.isReady]);

  const loadInit = async () => {
    const {query} = router;
    const provinces = await locationService.listProvince();
    setProvinceOptions(provinces);

    if (_.isEmpty(query)) {
      const res = await schoolService.list()
      setSchools(res.data);
    } else {
      await setIsLoading(true);

      const res = await schoolService.list(query)
      setSchools(res.data);

      let initDataSelected = {};
      if (query.province) {
        await setIsLoading(true)
        const provinceOption = _.find(provinces, (o) => o.code === query.province);
        // initDataSelected.province = provinceOption
        setSelects({...selects, ...{province: provinceOption}});
        const districtOptions = await locationService.listDistrict(query.province);
        setDistrictOptions(districtOptions);

        if (query.district) {
          const districts = await locationService.listDistrict(provinceOption.code);
          const districtOption = _.find(districts, (o) => o.code === query.district);
          // initDataSelected.district = districtOption
          setSelects({...selects, ...{district: districtOption, province: provinceOption}})
          const wardOptions = await locationService.listWard(query.district);
          setWardOptions(wardOptions);

          if (query.ward) {
            const wards = await locationService.listWard(districtOption.code);
            const wardOption = _.find(wards, (o) => o.code === query.ward);
            // initDataSelected.district = wardOption
            setSelects({...selects, ...{ward: wardOption, district: districtOption, province: provinceOption}})
          }
        }
      }
      await setIsLoading(false)
    }
  };

  const handleDelete = async (id) => {
    swal({
      title: "B???n ch???c ch???n mu???n x??a?",
      text: "",
      icon: "warning",
      buttons: true,
      successMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const result = await schoolService.delete(id);
        swal({
          title: result.message,
          icon: result.status?"success":"error"
        })
          .then(() => router.reload())
      }
    });
  };

  const onChangeProvince = async (e) => {
    const districts = await locationService.listDistrict(e.code);
    setDistrictOptions(districts);
  }

  const onChangeDistrict = async (e) => {
    const wards = await locationService.listWard(e.code);
    setWardOptions(wards);
  }

  const handleSubmitSearch = async (values) => {
    values.preventDefault();
    const newFilter = _.omitBy(filter, _.isEmpty);

    router.push({
        pathname: router.pathname,
        query: _.pickBy(newFilter, _.identity),
      },
      undefined,
      {shallow: true}
    );

    const res = await schoolService.list(newFilter)
    if (_.isEmpty(res)) {
      swal({
        text: "N???i dung t??m ki???m ??t nh???t l?? 3 k?? t???",
        icon: "error"
      });
    }
    setSchools(res.data)
  };

  return (
    <>
      <h4>T??? ch???c</h4>
      <form onSubmit={handleSubmitSearch}>
        <div className='grid-container'>
          <Input
            label='T??m ki???m'
            placeholder='T??n tr?????ng' name="s"
            onChange={e => setFilter({...filter, s: e.target.value})}
          />
          <Select
            label='T???nh/th??nh'
            name='province'
            placeholder='Ch???n T???nh th??nh'
            onChange={e => {
              onChangeProvince(e);
              setSelects({...selects, ...{province: e, district: null, ward: null}})
              setFilter({...filter, province: e.code, district: '', ward: ''})
            }}
            value={selects.province}
            options={provinceOptions}
          />
          <Select
            placeholder='Ch???n Qu???n'
            label='Qu???n/huy???n'
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
            placeholder='Ch???n Ph?????ng'
            label='Ph?????ng/X??'
            name='ward'
            value={selects.ward}
            onChange={e => {
              setSelects({...selects, ...{ward: e}})
              setFilter({...filter, ward: e.code})
            }}
            options={wardOptions}
          />
        </div>
        <Button type='submit'>T??m ki???m</Button>
      </form>
      <div className="mt-8 overflow-x-auto lg:overflow-x-visible">
        <div className='container-table w-[1200px] lg:w-full'>
          <h4>Danh s??ch tr?????ng</h4>
          <table className='table'>
            <thead>
              <tr>
                <th className='text-center'>STT</th>
                <th className='text-left'>T??n tr?????ng</th>
                <th className='text-left'>?????a ch???</th>
                <th className='text-left'>T???nh/th??nh</th>
                <th className='text-left'>Qu???n/Huy???n</th>
                <th className='text-left'>Ph?????ng/X??</th>
                <th/>
              </tr>
            </thead>
            <tbody>
              {!_.isEmpty(schools)
                ? schools?.map((school, index) => (
                  <tr key={index}>
                    <td>{skip + index + 1}</td>
                    <td>{school.schoolname}</td>
                    <td>{school.address}</td>
                    <td>{school.province?.provinceName}</td>
                    <td>{school.district?.districtName}</td>
                    <td>{school.ward?.wardName}</td>
                    <td>
                        {user?.role === 'staff' ?
                          <Link href={`/to-chuc/truong/${school._id}`}>
                            <a><EyeIcon className='h-5 w-5 inline'/></a>
                          </Link> :
                          <Link href={`/to-chuc/truong/${school._id}`}>
                            <a><PencilIcon className='h-5 w-5 inline'/></a>
                          </Link>
                        }
                      {user?.role === 'admin' &&
                        <TrashIcon
                          className='h-5 w-5 inline ml-4 cursor-pointer'
                          onClick={() => handleDelete(school._id)}
                        />
                      }
                    </td>
                  </tr>
                ))
                : (<tr><td colSpan='7'>Ch??a c?? d??? li???u</td></tr>)}
            </tbody>
          </table>
          {/* <Pagination data={schools}/> */}
        </div>
      </div>
    </>
       
  );
}

export default SchoolList;