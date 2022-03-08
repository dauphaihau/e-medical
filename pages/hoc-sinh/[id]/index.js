import {Formik, Form} from "formik";
import Link from "next/link";
import {useRouter} from "next/router";

import {CheckIcon, EyeIcon} from "@heroicons/react/outline";
import Input from "@components/form/input";
import Radio, {RadioGroup} from "@components/form/radio";
import Layout from "@components/layout";
import Button from "@components/button";
import Textarea from "@components/form/textarea";
import Select from "@components/form/select";
import Table from "@components/table";


const DetailStudent = () => {
  const router = useRouter();
  const handleSubmitForm = async (values) => {
    console.log(values);
  };
  return (
    <>
      <div className='flex gap-x-4 mb-4'>
        <Button>SỔ THEO DÕI SỨC KHỎE HỌC SINH</Button>
        <Link href={`/hoc-sinh/${router.query.id}/covid-19`}>
          <a>
            <Button className='bg-primary-light text-black'>THEO DÕI PHÒNG CHỐNG DỊCH COVID-19</Button>
          </a>
        </Link>
      </div>
     
    </>
  );
}
export default DetailStudent;

DetailStudent.getLayout = (page) => <Layout>{page}</Layout>;
