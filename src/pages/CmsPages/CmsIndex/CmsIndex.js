import React, { useContext, useEffect, useState } from 'react'
import './CmsIndex.css'
import CmsHeader from '../../../components/CmsComponents/CmsHeader/CmsHeader';
import CmsSidebar from '../../../components/CmsComponents/CmsSidebar/CmsSidebar';
import { CmsContext, HomeContext } from '../../../context/CmsContext';
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import ScrollTo from '../../../utils/ScrollTo/ScrollTo';
import BuildVirsion from '../../../utils/BuildVirsion';
import CounterTile from '../../../components/CmsComponents/HomeComponents/Countertile/CounterTile';
import CircleChart from '../../../components/CmsComponents/HomeComponents/CircleChart/CircleChart';
import OrderTable from '../../../components/CmsComponents/HomeComponents/OrderTable/OrderTable';
import VerticalChart from '../../../components/CmsComponents/HomeComponents/VerticalChart/VerticalChart';
import mode from '../../../utils/ModsB';
import DateShow from '../../../utils/DateShow';
import DateShow2 from '../../../utils/DateShow2';
import Swal from 'sweetalert2'
import Navigat from '../../../utils/Navigat';





export default function CmsIndex() {
  const [isValid,setIsValid]=useState(false)
  const [flagResetInput,setFlagResetInput]=useState(false)
  const [ sideMenueFlag,setSideMenueFlag]=useState(false)
  const [flagClass, setFlagClass] = useState(true)
  const[flagPublic,setFlagPublic]=useState(false)
const [arrayIdParam,setArrayIdParam]=useState([])
const[token,setToken]=useState('')
const [user,setUser]=useState('')
const[resetSearchbox,setResetSearchbox]=useState(false)
const[xtSearchA,setXtSearchA]=useState('')
const[xtSearchB,setXtSearchB]=useState('')
const[xtSearchC,setXtSearchC]=useState('')
const[xtSearchD,setXtSearchD]=useState('')
const[xtSearchE,setXtSearchE]=useState('')
const[xtSearchF,setXtSearchF]=useState('')
const[xtSearchG,setXtSearchG]=useState('')
const[flagError,setFlagError]=useState(false)

const navigatt = useNavigate()
let{isLogin}=useContext(HomeContext)
useEffect(()=>{
setToken(JSON.parse(localStorage.getItem('loginToken')))
setUser(localStorage.getItem('user'))
},[])
// useEffect(()=>{
//   return()=>setToken('')
// })

const location = useLocation();
  return (

    <>
      <CmsContext.Provider value={{
        arrayIdParam,setArrayIdParam,
        isValid,setIsValid,
        flagResetInput,setFlagResetInput,
       sideMenueFlag,setSideMenueFlag,
        flagClass, setFlagClass,
        flagPublic,setFlagPublic,
        token,setToken,
        user,setUser,
        xtSearchA,setXtSearchA,
        xtSearchB,setXtSearchB,
        xtSearchC,setXtSearchC,
        xtSearchD,setXtSearchD,
        xtSearchE,setXtSearchE,
        xtSearchF,setXtSearchF,
        xtSearchG,setXtSearchG,
        resetSearchbox,setResetSearchbox,
        flagError,setFlagError
      }}>
        <div className="cms-container">

          <CmsHeader />

          <div className="container  app-container">
            <div className="row">
              <div className="col col-1 col-md-2 mt-5"><CmsSidebar /></div>
              <div className="col col-10 col-md-10 mt-5">
                <div className={flagClass ? 'cmsindex-maincontainer-div' : 'cmsindex-maincontainer-div-hidden'} >

{!mode.mode1 && <div className='container'>
  <div className='row '>
    
    <div className='col-8 cmsindex-countertile'>
      <div className='centerr '>

      <DateShow2/>
      <CounterTile/>
      </div>
      
      <OrderTable/>

    </div>

    <div className='col-4'> 
    <CircleChart/>
    <VerticalChart/>
    </div>

  </div>
  {/* <div className='row'>

    <div className='col-8 boxSh mt-3'>

    </div>
    
    <div className='col-4 boxSh mt-3 cmsindex-charts-div'>
 
     
      
      </div>

  </div> */}
  <div className='row'></div>
</div>
}


                  {/* <h4>خانه</h4>
                  <div className="unique-code" style={{ textAlign: 'center', marginTop: '10px', fontWeight: 'bold', fontSize:'15px',
textShadow: '2px 2px 0px rgba(255, 255, 255, 1), 5px 4px 0px rgba(0, 0, 0, 0.15)'

                  }}>
        Virsion.{BuildVirsion}
      </div> */}
                </div>
<ScrollTo/>
              {isLogin ?  <Outlet /> : 
              
              //  location.pathname.startsWith('/p-admin') ? <Outlet />
              //  :
              <Navigat/>
                  // Swal.fire({
                  //   position: "center",
                  //   icon: "info",
                  //   title: "لطفا با حساب کاربری معتبر وارد شوید...",
                  //   showConfirmButton: false,
                  //   timer: 1500,
                  // }).then(res=>{
                  //   console.log('first')
                  //   navigatt('/')
                  // }) 
       
          
} 

              </div>
            </div>
          </div>
        </div>

      </CmsContext.Provider>




    </>

  )
}
