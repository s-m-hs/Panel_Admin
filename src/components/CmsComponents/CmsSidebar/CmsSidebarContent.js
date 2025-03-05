import React, { useContext, useEffect, useState } from 'react';
import './CmsSidebar.css';
import { NavLink, Link } from 'react-router-dom';
import BuildVirsion from '../../../utils/BuildVirsion';
import { HomeContext } from '../../../context/CmsContext';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function CmsSidebarContent() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const homeContext = useContext(HomeContext);
  const getlocalRole = localStorage.getItem('cyRole');
  const [roleState, setRoleState] = useState(parseInt(getlocalRole));

  const hasAccess = (field) => {
    if (roleState === 8) return true; // دسترسی کامل
    const accessMap = {
      orders: [6,4],
      products: [5, 6,4],
      manufacturer: [5, 6],
      categorySpecialty: [5],
      messages: [6],
      subjects: [6], 
    };
    return accessMap[field]?.includes(roleState) || false;
  };



  return (
    <>
      <h6 className="cmssidebar-h6">Dashboard</h6>
      <Link className="cmssidebar-div" to={'/p-admin'}>
        <i className="fa-sharp fa-solid fa-house fa-lg" style={{ marginLeft: '5px' }}></i>
        <span>خانه</span>
      </Link>

      <hr />
      <h6 className="cmssidebar-h6">Quick menu</h6>
      {hasAccess('bosses') && (
     <NavLink className='cmssidebar-div' to={'users'}>
               <i class="fa-solid fa-users fa-lg" style={{marginLeft:'5px'}}></i>
                    <span> مدیران</span></NavLink>)}

                    {hasAccess('customer') && (
  <NavLink className='cmssidebar-div' to={'customer'}>
  <i class="fa-solid fa-user-pen fa-lg" style={{marginLeft:'5px'}}></i>
  <span> کاربران</span></NavLink>)}
                  

                    {hasAccess('menue') && (   <NavLink className='cmssidebar-div' to={'menu'} >
                     <i class="fa-solid fa-calendar-minus fa-lg  " style={{marginLeft:'5px'}}></i>
                     <span  >منو </span>
                </NavLink>)}

                {hasAccess('publicCategory') && (
                <NavLink  className='cmssidebar-div' to={'category'}>
                    <i class="fa-solid fa-layer-group fa-lg" style={{marginLeft:'5px'}}></i>
                     <span>دسته بندی عمومی </span> </NavLink >)}

                     {hasAccess('categorySpecialty') && (
        <NavLink className="cmssidebar-div" to={'categoryspecialty'}>
          <i className="fa-solid fa-layer-group fa-lg" style={{ marginLeft: '5px' }}></i>
          <span>دسته بندی تخصصی</span>
        </NavLink>
      )}


{hasAccess('subjects') && (
        <NavLink className="cmssidebar-div" to={'CmsSubject'}>
          <i className="fa-solid fa-file-lines fa-lg" style={{ marginLeft: '5px' }}></i>
          <span>مطالب</span>
        </NavLink>
      )}

{hasAccess('parameter') && (
                   <NavLink  className='cmssidebar-div' to={'parameter'}>
                    <i class="fa-solid fa-key fa-lg" style={{marginLeft:'5px'}}></i>
                  <span>متغیرها   </span> </NavLink >)}

                  {hasAccess('skin') && (
                   <NavLink  className='cmssidebar-div' to={'skin'}>
                   <i class="fa-solid fa-palette fa-lg"style={{marginLeft:'5px'}}></i>
<span>قالب ها   </span> </NavLink >)}



      {hasAccess('manufacturer') && (
        <NavLink className="cmssidebar-div" to={'manufacturer'}>
          <i className="fa-solid fa-compass-drafting fa-lg" style={{ marginLeft: '5px' }}></i>
          <span>شرکت سازنده</span>
        </NavLink>
      )}

      {hasAccess('products') && (
        <NavLink className="cmssidebar-div" to={'product'}>
          <i className="fa-solid fa-store fa-lg" style={{ marginLeft: '5px' }}></i>
          <span>محصولات</span>
        </NavLink>
      )}

      {hasAccess('orders') && (
        <NavLink className="cmssidebar-div" to={'order'}>
          <i className="fa-solid fa-store fa-lg" style={{ marginLeft: '5px' }}></i>
          <span>سفارشات</span>
        </NavLink>
      )}

 


               <hr />
                <h6 className='cmssidebar-h6'>Notifications</h6>
                {hasAccess('email') && (
  <NavLink className='cmssidebar-div' to={'useremail'}>
  <i class="fa-solid fa-envelope fa-lg" style={{marginLeft:'5px'}}></i>
      <span>ایمیل </span> </NavLink>)}
 
                
               
           
      {hasAccess('messages') && (
        <NavLink className="cmssidebar-div" to={'tickets'}>
          <i className="fa-solid fa-message fa-lg" style={{ marginLeft: '5px' }}></i>
          <span>پیام‌ها</span>
          <div className="cmssidebar-div cmssidebarrr">
            {homeContext.messageNotification?.length > 0 && (
              <>
                <NotificationsIcon />
                <span className="cmssidebar-span">{homeContext.messageNotification?.length}</span>
              </>
            )}
          </div>
        </NavLink>
      )}


      <hr />
      <h6 className="cmssidebar-h6">Staff</h6>
      <div className="cmssidebar-div">
        <i className="fa-solid fa-gear fa-lg" style={{ marginLeft: '5px' }}></i>
        <span>تنظیمات</span>
      </div>
      <div className="cmssidebar-div">
        <i className="fa-solid fa-toolbox fa-lg" style={{ marginLeft: '5px' }}></i>
        <span>خدمات</span>
      </div>
      <div className="cmssidebar-div">
        <i className="fa-solid fa-circle-info fa-lg" style={{ marginLeft: '5px' }}></i>
        <span>درباره</span>
      </div>
      <NavLink className="cmssidebar-div" to={'/'} onClick={()=>{
        localStorage.removeItem('loginToken')
        localStorage.removeItem('user')
        localStorage.removeItem('cyRole')
      }}>
        <i className="fa-solid fa-right-from-bracket fa-lg" style={{ marginLeft: '5px' }}></i>
        <span>خروج</span>
      </NavLink>
      <hr />

      {/* نمایش تاریخ */}
      <div
        className="date-display"
        style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '15px' }}
      >
        {currentDate.toLocaleDateString('fa-IR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </div>

      {/* نمایش نسخه */}
      <div
        className="unique-code"
        style={{ textAlign: 'center', marginTop: '10px', fontWeight: 'bold', fontSize: '15px' }}
      >
        V.{BuildVirsion}
      </div>
    </>
  );
}


