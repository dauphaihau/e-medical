
import React, {useEffect, useState, useRef} from "react";
import {useRouter} from "next/router";
// import Select from "@components/form/select";
import Select from "react-select";
import {ErrorMessage} from "formik";

import { locationService } from "@services";
const defaultSelectValue = {
  value: "",
  label: "",
  code: "",
};
const Region = (props) => {
  const selectInputRef = useRef(null);
  // const router = useRouter();
  const {
    form,
    listProvince = [],
    provinceSelected = defaultSelectValue,
    districtSelected = defaultSelectValue,
    wardSelected = defaultSelectValue,
    onChange,
    ...others
  } = props;
  
  // const [listProvince, setListProvince] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWard, setListWard] = useState([]);

  const [province, setProvince] = useState(provinceSelected);
  const [district, setDistrict] = useState(districtSelected);
  const [ward, setWard] = useState(wardSelected);

  const onChangeProvince = async (e) => {
    const districts = await locationService.listDistrict(e.code);
    setListDistrict(districts);
  }

  const onChangeDistrict = async (e) => {
    const wards = await locationService.listWard(e.code);
    setListWard(wards);
  }

  useEffect( () => {
    setProvince(provinceSelected);
    onChangeProvince(provinceSelected);
    setDistrict(districtSelected);
  }, [provinceSelected, districtSelected, wardSelected])

  useEffect( () => {
    setDistrict(districtSelected);
    onChangeDistrict(districtSelected);
  }, [districtSelected])

  useEffect( () => {
    setWard(wardSelected);
  }, [wardSelected])

  return (
    <>
      <div className='form-group'>
        <label>Tỉnh/Thành</label>
        <Select
          id="province"
          label='Tỉnh/thành'
          name='province'
          options={listProvince}
          value={province}
          form={form}
          // defaultValue={province}
          onChange={(e) => {
            onChangeProvince(e);
            setProvince(e);
            setDistrict(defaultSelectValue);
            setListWard([]);
            setWard(defaultSelectValue);
            form && form.setFieldValue('province', e);
          }}
        />
        {(form && form.errors['province'] && form.errors['province'].value ) &&(
        <div className='text-danger mt-[5px]'>{form.errors['province'].value}</div>  
        )}
      </div>
      <div className='form-group'>
        <label>Quận/Huyện</label>
        <Select
          id="district"
          label='Quận/huyện'
          name='district'
          options={listDistrict}
          value={district}
          form={form}
          onChange={(e) => {
            onChangeDistrict(e);
            setDistrict(e);
            setWard(defaultSelectValue);
            form && form.setFieldValue('district', e);
          }}
        />
        {(form && form.errors['district'] && form.errors['district'].value ) &&(
        <div className='text-danger mt-[5px]'>{form.errors['district'].value}</div>  
        )}
      </div>
      
      <div className='form-group'>
        <label>Phường/Xã</label>
        <Select
          id="ward"
          label='Phường/Xã' 
          name='ward'
          options={listWard}
          form={form}
          value={ward}
          onChange={(e) => {
            setWard(e);
            form && form.setFieldValue('ward', e);
          }}
        />
        {(form && form.errors['ward'] && form.errors['ward'].value ) &&(
        <div className='text-danger mt-[5px]'>{form.errors['ward'].value}</div>  
        )}
      </div>
    </>
  );
};

export default Region;