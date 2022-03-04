import React, {useState} from "react";

import Layout from "../../components/layout";
import Input from "../../components/form/input";
import Button from "../../components/button";
import Radio from "../../components/form/radio";
import Textarea from "../../components/form/textarea";

const KhamSucKhoeForm = () => {

  const ContentOne = (title) => {
    return (
      <div>
        <div className='w-1/2'>
          <Input classNameLabel='font-medium' label='Ngày' useFormik='true'/>
          <Input classNameLabel='font-medium' label='Thời gian' useFormik='true'/>
        </div>
        {renderButton()}
      </div>
    );
  };
  const ContentTwo = (title) => {
    return (
      <div>
        <div className='grid grid-cols-2 gap-x-4'>
          <Input classNameLabel='font-medium' label='Tuần hoàn :' useFormik='true'/>
          <Input classNameLabel='font-medium' label='Hô hấp :' useFormik='true'/>
          <Input classNameLabel='font-medium' label='Tiêu hóa :' useFormik='true'/>
          <Input classNameLabel='font-medium' label='Thận - Tiết niệu :' useFormik='true'/>
          <Input classNameLabel='font-medium' label='Thần kinh - Tâm thần :' useFormik='true'/>
          <Input classNameLabel='font-medium' label='Khám lâm sàng khác :' useFormik='true'/>
        </div>
        {renderButton()}
      </div>
    );
  };
  const ContentThree = (title) => {
    return (
      <div>
        <Radio
          className='mb-4'
          name='hoTen'
          value='Không kính'
        />
        <div className='grid grid-cols-2 gap-x-4'>
          <Input classNameLabel='font-medium' label='Mắt phải' useFormik='true'/>
          <Input classNameLabel='font-medium' label='Mắt trái' useFormik='true'/>
        </div>
        <Radio
          className='mb-4'
          name='hoTen'
          value='Có kính'
        />
        <div className='grid grid-cols-2 gap-x-4'>
          <Input classNameLabel='font-medium' label='Mắt phải' useFormik='true'/>
          <Input classNameLabel='font-medium' label='Mắt trái' useFormik='true'/>
        </div>
        <Textarea
          classNameLabel='font-medium'
          className='w-full' label='Các bệnh về mắt (nếu có)'
        />
        {renderButton()}
      </div>
    );
  };
  const ContentFour = (title) => {
    return (
      <div className='w-full'>
        <h4>Tai trái</h4>
        <div className='grid grid-cols-2 gap-x-4'>
          <Input classNameLabel='font-medium' label='Nói thường' useFormik='true'/>
          <Input classNameLabel='font-medium' label='Nói thầm' useFormik='true'/>
        </div>
        <h4 className='mt-4'>Tai phải</h4>
        <div className='grid grid-cols-2 gap-x-4'>
          <Input classNameLabel='font-medium' label='Nói thường' useFormik='true'/>
          <Input classNameLabel='font-medium' label='Nói thầm' useFormik='true'/>
        </div>
        <Textarea
          classNameLabel='font-medium'
          className='mt-4 w-full' label='Các bệnh về tai - mũi -họng (nếu có)'
        />
        {renderButton()}
      </div>
    );
  };
  const ContentFive = (title) => {
    return (
      <div>
        <div className='grid grid-cols-2 gap-x-4'>
          <Input classNameLabel='font-medium' label='Hàm trên' useFormik='true'/>
          <Input classNameLabel='font-medium' label='Hàm dưới' useFormik='true'/>
        </div>
        <Textarea
          classNameLabel='font-medium'
          className='w-full' label='Các bệnh về Răng Hàm Mặt (nếu có)'
        />
        {renderButton()}
      </div>
    );
  };
  const ContentSix = (title) => {
    return (
      <div>
        <Radio
          className='mb-4'
          name='hoTen'
          value='Bình thường'
        />
        <p className='mb-2 mt-4 font-medium'>Cong cột sống:</p>
        <div className='flex'>
          <Radio
            className='mb-4'
            name='hoTen'
            value='Gù'
          />
          <Radio
            className='mb-4'
            name='hoTen'
            value='Ưỡn'
          />
        </div>
        <p className='mb-2 mt-4 font-medium'>Vẹo cột sống:</p>
        <div className='flex'>
          <Radio
            className='mb-4'
            name='hoTen'
            value='Hình chữ S'
          />
          <Radio
            className='mb-4'
            name='hoTen'
            value='Hình chữ C'
          />
        </div>
        <Textarea
          classNameLabel='font-medium'
          className='w-full mt-4' label='Các bệnh về Cơ xương khớp (nếu có)'
        />
        {renderButton()}
      </div>
    );
  };

  const tabContent = [
    {
      id: 1,
      // heading: 'Thời gian khám sức khỏe định kỳ',
      heading: '1 Thời gian ',
      content: heading => <ContentOne title={heading}/>,
    },
    {
      id: 2,
      heading: '2 Nhi khoa',
      content: heading => <ContentTwo title={heading}/>
    },
    {
      id: 3,
      heading: '3 Thị lực',
      content: heading => <ContentThree title={heading}/>
    },
    {
      id: 4,
      heading: '4 Tai mũi họng',
      content: heading => <ContentFour title={heading}/>
    },
    {
      id: 5,
      heading: '5 Răng Hàm Mặt',
      content: heading => <ContentFive title={heading}/>
    },
    {
      id: 6,
      heading: '6 Cơ xương khớp',
      content: heading => <ContentSix title={heading}/>
    },
  ];

  const [activeTab, setActiveTab] = useState(1);
  const [currentTab, setCurrentTab] = useState(tabContent[0]);

  const renderButton = () => {
    return <div className='flex justify-end'>
      <Button onClick={() => setActiveTab(activeTab + 1)}>Tiếp tục</Button>
    </div>
  };

  const handleTabClick = (currentTab) => {
    setActiveTab(currentTab);
    const currentTabContent = tabContent.filter(item => item.id === currentTab);
    setCurrentTab(currentTabContent[0]);
  };

  console.log(currentTab.content(currentTab.heading))

  return (
    <div className="form">
      <h3 className="">Khám sức khoẻ định kỳ</h3>
      <div className="form-kskdk">
        <div className="form-kskdk__tabs">
          {tabContent.map(item => {
            return (
              <div
                key={item.id}
                className={`${activeTab === item.id ? 'bg-primary text-white' : 'bg-gray-100 text-[#737373]'} `}
                onClick={() => handleTabClick(item.id)}
              >
                <p>{item.heading}</p>
              </div>
            )
          })}
        </div>
        <div className="p-[20px]">
          {currentTab.content().type(currentTab.heading)}
        </div>
      </div>
    </div>
  )
};
export default KhamSucKhoeForm;

KhamSucKhoeForm.getLayout = (page) => <Layout>{page}</Layout>;
