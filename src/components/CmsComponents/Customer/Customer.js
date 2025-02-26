import React, { useState, useEffect, useContext } from 'react'
import './Customer.css'
import { CmsContext, HomeContext } from '../../../context/CmsContext';
import { useForm as useFormA } from 'react-hook-form';
import { useForm as useFormB } from 'react-hook-form';
import { useForm as useFormC } from 'react-hook-form';
import {sha512} from "js-sha512";

import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import DataTable from '../DataTable/DataTable';
import Swal from 'sweetalert2'
import DotLoader from "react-spinners/DotLoader";
import { useForm } from "react-hook-form"
import apiUrl from '../../../utils/ApiConfig';
import mode from '../../../utils/ModsB';
import ApiPostX from '../../../utils/ApiServicesX/ApiPostX';


export default function Customer() {
  const [customerArray, setcustomerArray] = useState([])
  const customerArrayRevers = customerArray.slice().reverse()

  const [flagUpdate, setFlagUpdate] = useState(false)
  const [putId, setPutId] = useState('')
const[localToken,setLocalToken]=useState('')
const[profileDetail,setProfileDetail]=useState([])
  const cmsContext = useContext(CmsContext)
  const homeContext=useContext(HomeContext)
  const headerAuth = `Bearer ${cmsContext.token.token}`;

  const [searchUser,setSearchUser]=useState('')
  const [searchUserArray,setSearchUserArray]=useState([])
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useFormA({
    defaultValues: {}
  })
  const { register: registerFormB, handleSubmit: handleSubmitFormB, setValue:setValueB,reset:resetB, formState: { errorsB } } = useFormB({
    defaultValues: {
    }
  });

  const { register: registerFormC, handleSubmit: handleSubmitFormC, setValue:setValueC,reset:resetC, formState: { errorsC } } = useFormC({
    defaultValues: {
    }
  });
  const registerOptions = {
    customerName: { required: "customerName is required" },
    password: { required: "password is required" },
    customerStatus: { required: "password is required" },
    customercustomerType: { required: "password is required" },
  }
  ///////////////////
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });

  ////////////////////////////
  const customerStatus = [
    { id: 1, status: 'فعال', statusId: 0 }, { id: 2, status: 'مسدود', statusId: 1 }, { id: 3, status: 'غیرفعال', statusId: 2 },
  ]

  ////////////////////////////////
  const handleError = (errors) => { }

  const update = () => {
    // setValueB("update", {
    //   customerFirstName: customerFirstName ? `${customerFirstName}` : "",
    //   customerLastName: customerLastName ? `${customerLastName}` : "",
    //   mobile: mobile ? `${mobile}` : "",
 
    // });
  };

const changSearchHandlet=(e)=>{
  setSearchUser(e.target.value)
}

const searchHandler=()=>{

  let searchCustomer= customerArray?.filter(filter=>{
    return filter.name?.includes(`${searchUser}`) 

  }
  )
  setSearchUserArray(searchCustomer)}
useEffect(()=>{
  if(searchUser.length>2){
    searchHandler()

  }else if(searchUser.length<2){
    setSearchUserArray([])
  }

},[searchUser])

  const handleRegistration = (data) => {
    // console.log(data)
    if (!flagUpdate) {
      let obj = {
        un: data.customerMobile,
        pw: data.password,
        name:data.customerName
      }
    
      async function myAppPost() {
ApiPostX('/api/Customer/addCustomerWAuyth',headerAuth,obj,function () {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "کاربر با موفقیت اضافه شد",
    showConfirmButton: false,
    timer: 1500,
  });
  reset(
    setValue('')
  )
  getcustomerItem()
})
      }
      myAppPost()

    } 
  }

//   const handleRegistrationC=(data)=>{
//     let obj={
//       un: data.update.customerName,
//        pw:sha512(data.update.password )  
//      }
//      login(obj)
//      update()
//       }

//   const handleRegistrationB=(data)=>{
// let obj={
//   id: 0,
//   cyUserID:profileDetail.cyUserID,
//   name: data.update.customerFirstName,
//   family: data.update.customerLastName,
//   email: 'string',
//   website: "string",
//   mobile: data.update.mobile,
//   description: "string",
//   userImageUrl: "string",
//   username:profileDetail.username
// }
// async function myApp(){
//   const res=await fetch(`${apiUrl}/api/Customer/UpdateProfile`,{
//     method:'POST',
//     headers: {
//       "Content-Type": "application/json",
//       Authorization:`Bearer ${localToken}`
//     },
//     body:JSON.stringify(obj)
//   }).then(res=>{
//     // console.log(res)
// if(res.status==200){
//   // alertA()
//   return res.json()
// }
//   }
//   )
// }

// myApp()
//   }
// ///////////////////////////
// const login=(obj)=>{
//   async function myAppPost(){
//     const getLocalStorage=localStorage.getItem('loginTokenCustomer')
//     const res=await fetch(`${apiUrl}/api/Customer/login`,{
//       method:'POST',
//       headers:{
//         "Content-Type": "application/json",
//         Authorization:`Bearer ${getLocalStorage}` ,
//       },
//       body:JSON.stringify(obj)
//     }).then(res=>{
//       if(res.status==200){
//         return res.json()
//       }
//     }).then(result=>{
//       if(result){
//         localStorage.setItem('loginTokenCustomer',result.token)
//         // localStorage.setItem('user',obj.un)
//         setLocalToken(result.token)
  
//       }else{
//         // alertB()
//       }
//     })
//   }
//   myAppPost()

// }
//   /////////////////////////
//   const getProfile=()=>{
//     async function myApp(){
//       const res=await fetch(`${apiUrl}/api/Customer/GetProfile`,{
//         method:'GET',
//         headers: {
//           Authorization: `Bearer ${localToken}`,
//           "Content-Type": "application/json",
//         },
//       }).then(res=>{
//         return res.json()
//       }).then(result=>{
//         setProfileDetail(result)
//       })
//     }
//     myApp()
//   }
  /////////////////////////////////
  const getcustomerItem = () => {
    async function myAppGetcustomer() {
      const res = await fetch(`${apiUrl}/api/CyUsers/GetUserByType/1`, {
        method: 'GET'
      }).then(res => res.json()).then(
        result => {

          setcustomerArray(result)
        }
      )
    }
    myAppGetcustomer()
  }
  //////////////////////
  const deleteHandler = (id) => {
    swalWithBootstrapButtons.fire({
      title: "آیا از حذف اطمینان دارید؟",
      icon: "warning",
      input: "text",
      showCancelButton: true,
      confirmButtonText: "بله",
      cancelButtonText: "خیر ",
      reverseButtons: true,
      preConfirm: (value) => {
        if (value.toLowerCase() !== "ok") {
          Swal.showValidationMessage("کلمه عبور را وارد");
        }
        return value.toLowerCase() === "ok"; 
      },
    }).then((result) => {
      if (result.isConfirmed) {
        async function myAppDelet() {
          const res = await fetch(`${apiUrl}/api/CyUsers/${id}`, {
            method: 'DELETE'
          }).then(
            res => console.log(res)
          ).then(result => {
            swalWithBootstrapButtons.fire({
              title: "حذف انجام شد!",
              icon: "success"
            }).then(result => {
              getcustomerItem()
            })
          })
        }
        myAppDelet()
      } else if (

        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "حذف انجام نشد",
          icon: "error"
        });
      }



    })
    reset(
      setValue('')
    )
    
  //   .then((result => {
  //     if (result.isConfirmed) {
  //       async function myAppDelet() {
  //         const res = await fetch(`${apiUrl}/api/CyUsers/${id}`, {
  //           method: 'DELETE'
  //         }).then(
  //           res => console.log(res)
  //         ).then(result => {
  //           swalWithBootstrapButtons.fire({
  //             title: "حذف انجام شد!",
  //             icon: "success"
  //           }).then(result => {
  //             getcustomerItem()
  //           })
  //         })
  //       }
  //       myAppDelet()
  //     } else if (

  //       result.dismiss === Swal.DismissReason.cancel
  //     ) {
  //       swalWithBootstrapButtons.fire({
  //         title: "حذف انجام نشد",
  //         icon: "error"
  //       });
  //     }
  //   }
  // ))

  }
  /////////////////////
  const editHandler = (...data) => {
    setPutId(data[0])
    setFlagUpdate(true)
    setValue('update', { customerName: data[1], password: data[2], customerStatus: data[3], customercustomerType: data[4] })
  }
  /////////////////
  const resetUpdatField = () => {
    setFlagUpdate(false)
    reset(
      setValue('')
    )
  }
  //////////////////
// useEffect(()=>{
//   getProfile()
// },[localToken])

  useEffect(() => {
    cmsContext.setFlagClass(false)
    getcustomerItem()

    return () => cmsContext.setFlagClass(true)

  }, [])
  return (
    <div className='container '>
      <div className="row">
      {!flagUpdate &&  <div className='col-12 col-sm-3 customer-col3 '>
         <form action="" onSubmit={handleSubmit(handleRegistration, handleError)}
         className='customer-col3-form'
         >
   <div className="login-label-float">
              <input
                // disabled
                name="customerName"
                type="text"
                placeholder=""
                className={errors.customerName ? 'formerror' : ''}
                {...register(!flagUpdate ? 'customerName' : 'update.customerName', registerOptions.customerName)}
              />
              <label> نام کاربری</label>
            </div>

            <div className="login-label-float">
              <input
                // disabled
                name="customerMobile"
                type="number"
                placeholder=""
                className={errors.customerName ? 'formerror' : ''}
                {...register(!flagUpdate ? 'customerMobile' : 'update.customerMobile', registerOptions.customerMobile)}
              />
              <label>شماره همراه</label>
            </div>


            <div className="login-label-float">
              <input
                // disabled
                name="password"
                type="text"
                placeholder=""
                className={errors.password ? 'formerror' : ''}
                {...register(!flagUpdate ? 'password' : 'update.password', registerOptions.password)}
              />
              <label> رمزعبور(حداقل 4 کاراکتر)</label>
            </div>



            {flagUpdate && <div className='customer-resticon'>
              <i class="fa-solid fa-rotate-left fa-2xl" style={{ color: ' #74C0FC' }} onClick={resetUpdatField}></i>
            </div>
            }

            <Button className='customer-regbutton'
              type='submit'
              variant="contained"
              color='info'
              endIcon={<SendIcon />}
            >
          
                <span>  افزودن </span>
          
            </Button>
          </form> </div> }
  
         

{/* {flagUpdate && 
  <div className='col-12 col-sm-3 customer-col3 '>

<form action="" onSubmit={handleSubmitFormC(handleRegistrationC)}
         className='customer-col3-form'
         >
            <div className="login-label-float">
              <input
                // disabled
                name="customerName"
                type="text"
                placeholder=""
                className={errors.customerName ? 'formerror' : ''}
                {...registerFormC(!flagUpdate ? 'customerName' : 'update.customerName', registerOptions.customerName)}
              />
              <label> نام کاربری</label>
            </div>
            <div className="login-label-float">
              <input
                // disabled
                name="password"
                type="text"
                placeholder=""
                className={errors.password ? 'formerror' : ''}
                {...registerFormC(!flagUpdate ? 'password' : 'update.password', registerOptions.password)}
              />
              <label> رمزعبور</label>
            </div>
            {flagUpdate && <div className='customer-resticon'>
              <i class="fa-solid fa-rotate-left fa-2xl" style={{ color: ' #74C0FC' }} onClick={resetUpdatField}></i>
            </div>
            }

            <Button className='customer-regbutton'
              type='submit'
              variant="contained"
              color='info'
              endIcon={<SendIcon />}
            >
          
                <span>  ورود  </span>
          
            </Button>
          </form>

  <form action="" onSubmit={handleSubmitFormB(handleRegistrationB)}
  className='customer-col3-form'
  >
     <div className="login-label-float">
       <input
         // disabled
         name="customerFirstName"
         type="text"
         placeholder=""

         {...registerFormB( 'update.customerFirstName')}
       />
       <label> نام</label>
     </div>


     <div className="login-label-float">
       <input
         // disabled
         name="customerLastName"
         type="text"
         placeholder=""
        //  value={profileDetail.family}

        //  className={errors.password ? 'formerror' : ''}
         {...registerFormB('update.customerLastName')}
       />
       <label> نام خانوادگی</label>
     </div>

     <div className="login-label-float">
       <input
         // disabled
         name="mobile"
         type="number"
         placeholder=""
        //  value={profileDetail.mobile}

        //  className={errors.password ? 'formerror' : ''}
         {...registerFormB('update.mobile')}
       />
       <label> شماره همراه </label>
     </div>

 

     {flagUpdate && <div className='customer-resticon'>
       <i class="fa-solid fa-rotate-left fa-2xl" style={{ color: ' #74C0FC' }} onClick={resetUpdatField}></i>
     </div>
     }

     <Button className='customer-regbutton'
       type='submit'
       variant="contained"
       color='info'
       endIcon={<SendIcon />}
     >
   
         <span>  ویرایش </span>
     </Button>
   </form> </div> 
} */}
        
         

        <div className='col-12 col-sm-9 customer-col9'>
          {customerArray.length == 0 ?
            <div className='customer-colsm9-div' >
              <DotLoader
                color="#0d6efd"
                loading
                size={150}
                speedMultiplier={1}
              />
            </div>
            :
            <DataTable title={'لیست کاربران :'}>


<div className='customer-div-input login-label-float'>
<div className='centerr'>
    <input type="text" 
    placeholder='نام مشتری را جستجو کن ...'
  onChange={(e)=>changSearchHandlet(e)}
  value={searchUser}
  />
  {/* <span><button className='btn btn-warning'
  onClick={()=>{
    searchHandler()
  }}
  >بگرد</button></span> */}
</div>


<div className={searchUserArray.length!=0 ? 'customer-search-div customer-show' : 'customer-search-div'}  >
  {searchUserArray.length!=0 && 
    <table className='table table-primary'>
<thead>
  <tr key="">
    <th>نام خانوادگی</th>
    <th>شماره همراه</th>
    <th>شناسه مشتری</th>
  </tr>
</thead>

<tbody>
  {searchUserArray?.map((item)=>( 
    <tr key={item.id}>
    <td>{item.cyUserID}</td>
    <td>{item.name}</td>
    <td>{item.mobile}</td>
  </tr>))}
 
</tbody>

    </table>
  }
</div>

</div>

              <table className={!homeContext.themContext ? 'table table-striped  user-table':'table table-striped table-dark user-table'} >
              <thead>
                  <tr>
                    <th>شماره</th>
                    <th>نام </th>
                    <th>نام خانوادگی </th>
                    <th>موبایل </th>
                    <th>وضعیت کاربر</th>
                    <th>شناسه</th>
                    <th>حذف</th>
                  </tr>
                </thead>
                <tbody>
                  {customerArrayRevers.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.family}</td>
                      <td>{item.mobile}</td>
                      <td>{customerStatus?.filter(filter => { return filter.statusId == item.status })[0]?.status}    </td>
                      <td>{item.cyUserID}</td>
                      <td>
                        {/* <button className='btn btn-info customer-editbut'
                          onClick={() => editHandler(item.id, item.cyUsNm, item.cyHsPs, item.status, item.customerType)}
                        >ویرایش</button> */}
                        <button className='btn btn-danger customer-deletbut'
                          onClick={() => deleteHandler(item.cyUserID)}
                        >حذف</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </DataTable>
          }
        </div>
      </div>
    </div>)
}
