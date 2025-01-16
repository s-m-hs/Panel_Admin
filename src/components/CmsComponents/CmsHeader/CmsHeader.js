import React ,{useContext, useEffect,useState}from 'react'
import { Link } from 'react-router-dom';
import './CmsHeader.css'
import GridViewIcon from '@mui/icons-material/GridView';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LightModeIcon from '@mui/icons-material/LightMode';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import { CmsContext, HomeContext } from '../../../context/CmsContext';
import MenuIcon from '@mui/icons-material/Menu';
import mode from '../../../utils/ModsB';
import apiUrl from '../../../utils/ApiConfig';
import ApiGetX2 from '../../../utils/ApiServicesX/ApiGetX2';



export default function CmsHeader() {
  const[flagThem,setFlagThem]=useState(false)
  const cmsContext=useContext(CmsContext)
  const homeContext=useContext(HomeContext)
  const headerAuth = `Bearer ${cmsContext.token.token}`;
  const getlocalStorage= localStorage.getItem('loginToken')

  const sideMenueHandler=()=>{  ///<<< to control sidemenue on mobileSize   
    homeContext.setSideMenueFlag(prev=>!prev)
  }

  const changeTheme=()=>{
    setFlagThem(prev=>!prev)
    homeContext.setThemContext(prev=>!prev)
    }

    const funcA=(result)=>{
      homeContext.setMessageNotification(result)
    }
    const getAllTicket=()=>{
      ApiGetX2('/api/CyTicket/getAllTickets?status=1',headerAuth,funcA)


  }
  
    useEffect(()=>{
  if(flagThem){
      document.documentElement.style.setProperty('--white','#464646')
    document.documentElement.style.setProperty('--white1','#2e2e2e')
    document.documentElement.style.setProperty('--gray3','#9b9b9b')
    // document.documentElement.style.setProperty('--gray4','#9b9b9b')
    document.documentElement.style.setProperty('--white3','#d6d6d6')
    document.documentElement.style.setProperty('--white2','#d6d6d6')
    document.documentElement.style.setProperty('--black0','#ffffff')
    document.documentElement.style.setProperty('--blue0','#555 ')
    document.documentElement.style.setProperty('--blue2','#B9B9B9 ')

  }else{
    document.documentElement.style.setProperty('--white','#ffffff')
    document.documentElement.style.setProperty('--white1','#fafaff')
    document.documentElement.style.setProperty('--gray3','#555')
    // document.documentElement.style.setProperty('--gray4','#555')
    document.documentElement.style.setProperty('--white3','#555')
    document.documentElement.style.setProperty('--white2','#ffffff')
    document.documentElement.style.setProperty('--black0','#000000')
    document.documentElement.style.setProperty('--blue0','#f0f8ff')
    document.documentElement.style.setProperty('--blue2','#fff')
  }
    },[flagThem])
// console.log(cmsContext.user) 
// console.log(homeContext.themContext) 

// console.log(getlocalStorage)
// console.log(homeContext.isLogin)
// console.log(homeContext.messageNotification)
useEffect(()=>{
  homeContext.setIsLogin(true)
  if(getlocalStorage){
    homeContext.setIsLogin(true)
  }
},[getlocalStorage])

useEffect(()=>{
  getAllTicket()
  // if(homeContext.messageNotification?.length==0){
  //   getAllTicket()
  // }
},[homeContext.flagMessageNotification])

  return (
    <div className='container cmsheader-container'>
        <div className="row cmsheader-row">
            <div className="col col-6 cmsheader-col1">
            <h4 className='cmsheader-gridviewIcon'>
            <i class="fa-solid fa-chart-pie fa-beat fa-xs"></i> پنل مدیریت{mode.mode1 ? mode.mode1 : mode.mode2 ? mode.mode2 : ''}  
            </h4>

            </div>
            <div className="col col-1 col-sm-2 cmsheader-col2"></div>
            <div className="col cmsheader-col3 cmsheader-col3">
<button  className='cmsheader-sidemenue-button' onClick={sideMenueHandler}><MenuIcon/></button>

<div className='cmsheader-div'> <Link to={'tickets'}> <NotificationsIcon /> 
{homeContext.messageNotification?.length >0 && <span className='cmsheader-span' >{homeContext.messageNotification?.length}</span>
}

</Link> </div>

{!mode.mode1 && <>
          {/* <div className='cmsheader-div'>   <LanguageIcon /> <span className='cmsheader-span' >2</span></div>  */}
         {/* <SettingsIcon className='cmsheader-icon' />  */}
         {flagThem ? <button className='cmsheader-icon' onClick={changeTheme}><LightModeIcon/></button> 
         :
         <button className='cmsheader-icon' onClick={changeTheme}><BedtimeIcon/></button> 

         }
        
         {/* <Avatar sx={{ width: 30, height: 30 }} className='cmsheader-icon' alt="Travis Howard" src="/images/images 3.jpg" /> */}
</> }
            
          
    

          <div className='cmsheader-div'> 
          <i class="fa-regular fa-circle-user fa-2xl"></i>
          {/* <i class="fa-solid fa-circle-user fa-2xl"></i> */}
          {/* <i class="fa-regular fa-user fa-xl"></i> */}
         </div>
         
         <div className='cmsheader-div'> 
          <span  className='cmsheader-span-user' >
            { cmsContext.user?.toUpperCase()}
          </span>
         </div>

          <div className='cmsheader-div'>   <Link onClick={()=>{
            localStorage.clear('loginToken')
            localStorage.clear('user')
          }} to={'/'}> 
          <i class="fa-solid fa-arrow-right-from-bracket fa-rotate-180 fa-xl"></i>
          </Link>
          </div>

            </div>
        </div>
    </div>
  )
}




