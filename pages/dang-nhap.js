import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Moment from "moment";
import Image from "next/image";
import Link from "next/link";
import {Formik, Form} from "formik";
import Cookie from "cookie-cutter";
import * as Yup from "yup";

import Input from "../components/form/input";
import Button from "../components/button";
import logo2 from "../public/images/logo2.png";
import accountService from '../services/account';

const phoneRegExp = /(([03+[2-9]|05+[6|8|9]|07+[0|6|7|8|9]|08+[1-9]|09+[1-4|6-9]]){3})+[0-9]{7}\b/
const pinRegExp = /^\d{4}$/

const loginSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
    .required('Số điện thoại không được để trống'),
  pin: Yup.string()
    .matches(pinRegExp, "Vui lòng nhập 4 số mã PIN")
    .required('OTP không được để trống')
});

export default function Login () {
  const router = useRouter();
  const [requestTime, setRequestTime] = useState({
    time: null,
    phoneNumber: null,
  });

  const handleSubmitForm = async (values) => {
    try {
      const { request, ...response } = await accountService.loginViaOTP(values.phoneNumber,values.pin);
      
      Cookie.set("accessToken", response.data?.accessToken, {
        path: "/",
        expires: Moment().add(1, "years").toDate(),
      });
      await router.reload();
    } catch ({ response }) {
      switch (response.data.message) {
        case "Wrong PIN":
          swal("", "Mã PIN chưa đúng", "error", {
            button: "Tôi đã hiểu",
            dangerMode: true,
          });
          break;
        case "Unauthorized":
          swal("", "Tài khoản chưa có quyền đăng nhập hệ thống", "error", {
            button: "Tôi đã hiểu",
            dangerMode: true,
          }).then((a) => {
            Cookie.set("accessToken", "", {
              path: "/",
              expires: new Date(0),
            });
            // Router.reload();
          });
          break;
        default:
          swal("", "Đã có lỗi xảy ra", "error", {
            button: "Tôi đã hiểu",
            dangerMode: true,
          });
          break;
      }
    }
  };

  let phoneNumberChangeTimeout = null;
  const handlePhoneNumberChange = (phoneNumber) => {
    clearTimeout(phoneNumberChangeTimeout);
    phoneNumberChangeTimeout = setTimeout(async () => {
      const validPhoneNumber = phoneNumber.match(phoneRegExp);
      if (validPhoneNumber) {
        setRequestTime({
          time: Moment(),
          phoneNumber,
        });
        await accountService.requestPhonePin(phoneNumber);
      }
    }, 800);
  };

  return (
    <div className='form-login'>
      <Formik
        validationSchema={loginSchema}
        onSubmit={handleSubmitForm}
        enableReinitialize
        initialValues={{
          soDienThoai: '',
          otp: '',
        }}
      >
        {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
          }) => (
          <Form>
            <div className='flex justify-center'>
              <Link href="/">
                <a>
                  <Image src={logo2} alt="me" width="200" height="200" href='/'/>
                </a>
              </Link>
            </div>
            <div className='text-center my-8'>
              <h2 className='text-[2rem] text-primary pb-8'>Theo dõi bệnh nhân Covid-19</h2>
              <p>Vui lòng nhập số điện thoại để tiếp tục</p>
            </div>
            <Input
              label='Số điện thoại'
              name='phoneNumber'
              // error={errors.soDienThoai && touched.soDienThoai ? errors.soDienThoai : null}
              onChange={(e) => {
                handleChange(e);
                handlePhoneNumberChange(e.target.value);
              }}
            />
            <Input label='OTP' name='pin' onChange={handleChange} />
            <Button type='submit'>Đăng nhập</Button>
            <div className="copyright text-center mt-8">
              <div>
                <strong className="d-block">
                  Ứng dụng được phát triển bởi
                </strong>
              </div>
              <div>
                <a href={"https://edoctor.io"}>eDoctor</a> © 2021
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}