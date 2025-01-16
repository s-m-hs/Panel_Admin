
import React ,{useState,useEffect} from 'react';
import './App.css'
import routes from './routes';
import { useRoutes } from 'react-router-dom';
import {  HomeContext } from './context/CmsContext';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';

export default function App() {
  const getlocalStorage= localStorage.getItem('loginToken')

  const[sideMenueFlag,setSideMenueFlag]=useState(false)
  const[messageNotification,setMessageNotification]=useState([])
  const [flagMessageNotification,setFlagMessageNotification]=useState(false)
  const[isLogin,setIsLogin]=useState(()=>{
    if(getlocalStorage){
      return true
    }else{
return false
    }
  })
  const [themContext,setThemContext]=useState(false)


let router=useRoutes(routes)
// useEffect(()=>{
// if(getlocalStorage){
//   setIsLogin(true)
// }
// },[getlocalStorage])
 ///////////////
//  useEffect(()=>{
//   return()=>localStorage.removeItem('loginToken')
// })   const getAllTicket=()=>{

  return (
    <>
    <HomeContext.Provider  value={{
      isLogin,setIsLogin,
      themContext,setThemContext,
      messageNotification,setMessageNotification,
      flagMessageNotification,setFlagMessageNotification,
  sideMenueFlag,setSideMenueFlag   ///<<< to control sidemenue on mobileSize
}}>
<div className='App' >

  {router}


</div>

</HomeContext.Provider>


    </>


  )

}


