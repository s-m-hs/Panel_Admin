import React, { useContext, useEffect, useState, useRef } from 'react'
import './NewSubject.css'
import { useForm } from 'react-hook-form'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


import TextEditor from '../../Editor/TextEditor';

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import transition from "react-element-popper/animations/transition"
import opacity from "react-element-popper/animations/opacity"
import InputIcon from "react-multi-date-picker/components/input_icon"
import { useNavigate } from 'react-router-dom';
import { CmsContext } from '../../../context/CmsContext';
import apiUrl from '../../../utils/ApiConfig';
import fileUploadHandler from '../../../utils/Functions';
import ApiPostX from '../../../utils/ApiServicesX/ApiPostX';
import alertA from '../../../utils/AlertFunc/AlertA';
import ApiGetX from '../../../utils/ApiServicesX/ApiGetX';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import RichTextEditor from '../../IsolaEditor/RichTextEditor';
import ParagraphsRenderer from '../../IsolaEditor/ParagraphsRenderer';


export default function NewSubject({showw}) {
  const [ckValue, setCkValue] = useState('')
  const [categoryItem, setCategoriItem] = useState([])
  const [value4, setValue4] = useState()
  const [value5, setValue5] = useState()
  const [flagEditor,setFlagEditor]=useState(false)
  const [flagUpdate, setFlagUpdate] = useState(false)
  const [file, setFile] = useState({})
  const [imgUrl, setImgUrl] = useState('')
  const [file2, setFile2] = useState({})
  const [imgUrl2, setImgUrl2] = useState('')
  const navigate=useNavigate()
  const cmsContext=useContext(CmsContext)
  const headerAuth = `Bearer ${cmsContext.token.token}`;
  const contentRef = useRef(null);
    const [flagReset, setFlagReset] = useState(true)
    const [tabId, setTabId] = useState('')
    const [paragraphs, setParagraphs] = useState(JSON.parse(localStorage.getItem("paragraphs")) || []);
// const [isolaLocal,setIsplaLocal]=useState(localStorage.getItem("paragraphs") )
const [isolaLocal,setIsplaLocal]=useState(JSON.parse(localStorage.getItem("paragraphs")) || [] )
console.log(paragraphs)
  let dateModife = new Date()
  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
    } 
  });

  const handleEditorChange = (value) => {
    setCkValue(value);
};


 ///////////////////upload img function===>
  const fileChange = (e) => {
    setFile(e.target.files[0])
  }
  const fileChange2 = (e) => {
    setFile('')
    setImgUrl(e.target.value)
  }
  const fileChange3 = (e) => {
    setFile2(e.target.files[0])
  }
  const fileChange4 = (e) => {
    setFile2('')
    setImgUrl2(e.target.value)
  }

  //////////////////////////////

  useEffect(() => {
    if ( file?.name) {
      fileUploadHandler(file,setImgUrl)
    }
  }, [file])
  useEffect(() => {
    if (file2?.name) {
      fileUploadHandler(file2,setImgUrl2)
    }

  }, [, file2])
  /////////////////////////////////
const funcA=()=>{
  alertA('آیتم با موفقیت اضافه شد"')
  reset(
    setValue('')
  )
  setImgUrl('')
  setFile('')
  setFile2('')
  setImgUrl2('')
  setCkValue('')
}

  const handleSubmitEdit = (data) => {
    let obj = {
      id: 0,
      preTitle: data.subTitle,
      title: data.title,
      urL_Title: data.url,
      describtion: data.description,
      body:flagReset ?ckValue : isolaLocal,
      tag: data.tag,
      extra: data.extra,
      dateShow: value4,
      dateExp: value5,
      isAuthenticate: true,
      bigImg: file2.name ? `${apiUrl}/${imgUrl2}` : imgUrl2,
      smallImg: file.name ? `${apiUrl}/${imgUrl}` : imgUrl,
      orderValue: 0,
      cyCategoryId: data.category
    }
    console.log(obj)
// ApiPostX('/api/CySubjects',headerAuth,obj,funcA)
  } 
  ////////////////////////////////
  const categoryIdChild = () => {
    // console.log('first')
  }
  //////////////////////
  const GetCategoryItem = () => {
    ApiGetX('/api/CyCategories',headerAuth,setCategoriItem,navigate)
  }

  //////////////////////////
  useEffect(() => {
    GetCategoryItem()
  }, [])
  function handleChange(value){
    setValue4( value && value.toDate())
    // console.log(value.format());   /// convert  to persian format
  }
  function handleChangeB(value){
    setValue5(value && value.toDate())
  }

  const ffc = (tabName) => {
    // cmsContext.setFlagResetInput(true)
    setTabId(tabName)
    if(tabName==="editor1"){
  setFlagReset(true)
}else if(tabName==="editor2"){
  setFlagReset(false)
}
} 
useEffect(() => {
  if (contentRef.current) {
    console.log('Element found:', contentRef.current);
    // کاری که می‌خواهید انجام دهید
  }
}, []);
  return (
    <div className='container'>
      <div className='row'>
        <form   className={!flagEditor ? 'newsubject-form ' :'newsubject-form-hidden'}     onSubmit={handleSubmit(handleSubmitEdit)} >

          <div className='row'>
            <div className='col-lg-9 newsubject-form-col9'>
              <div className="newsubject-login-label-float">
                <input
                  name="url"
                  type="text"
                  placeholder=""
                  {...register('url',)}
                />
                <label>URL </label>
              </div>

              <div className="newsubject-login-label-float">
                <input
                  name="title"
                  type="text"
                  placeholder=""
                  {...register('title',)}
                />
                <label>عنوان </label>
              </div>

              <div className="newsubject-login-label-float">
                <input
                  name="subTitle"
                  type="text"
                  placeholder=""
                  {...register('subTitle',)}
                />
                <label>پیش عنوان </label>
              </div>

              <div className="newsubject-login-label-float">
                <input
                  name="description"
                  type="text"
                  placeholder=""
                  {...register('description',)}
                />
                <label>خلاصه مطلب </label>
              </div>
              <div className="newsubject-login-label-float">
                <input
                  name="tag"
                  type="text"
                  placeholder=""
                  {...register('tag',)}
                />
                <label>تگ </label>
              </div>

              <div className="newsubject-login-label-float">
                <input
                  name="extra"
                  type="text"
                  placeholder=""
                  {...register('extra',)}
                />
                <label>اکسترا </label>
              </div>

              <div className="newsubject-login-label-float">
              <input type="text"
                  onChange={fileChange4}
                  value={imgUrl2}
                />
                <label>عکس اصلی </label>
                <div className='product-uploade-maindiv centerr'>

<div className='product-uploade-div'>
  <span><UploadFileIcon />
  </span>
  <input type="file"
                  placeholder='عکس اصلی'
                  className='producted-img-input'
                  onChange={fileChange3}
                />

</div>
<span>
                  <img className='producted-img-image' src={!flagUpdate ? `${apiUrl}/${imgUrl2}` : imgUrl2} alt="" />  </span>
                <img className='producted-img-image' src={!flagUpdate ? imgUrl2 : `${apiUrl}/${imgUrl2}`} alt="" />

</div>


              </div>

              <div className="newsubject-login-label-float">
              <input type="text"
                  onChange={fileChange2}
                  value={imgUrl}
                />
                <label>عکس کوچک </label>

                <div className='product-uploade-maindiv centerr'>

<div className='product-uploade-div'>
  <span><UploadFileIcon />
  </span>
 
  <input type="file"
                  placeholder='عکس کوچک'
                  className='producted-img-input'
                  onChange={fileChange}
                />

</div>
<span>
                  <img className='producted-img-image' src={!flagUpdate ? `${apiUrl}/${imgUrl}` : imgUrl} alt="" />  </span>
                <img className='producted-img-image' src={!flagUpdate ? imgUrl : `${apiUrl}/${imgUrl}`} alt="" />

</div>

              </div>
            </div>
            <div className='col-lg-3 newsubject-col3 '>
              <Button className='newsubject-regbutton'
                type='submit'
                variant="contained"
                color='info'
                endIcon={<SendIcon />}
              >
                <span>
                  افزودن
                </span>
              </Button>
              <div className='newsubject-form-col3'>
              <div className='newsubject-form-col3-date-div' style={{ direction: "rtl" }}>
                <span className='newsubject-form-col3-span'>تاریخ نشر:</span>
      <DatePicker
      className='custom-input'
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        value={value4}
        onChange={handleChange}
        animations={[
          opacity(), 
          transition({ from: 35, duration: 800 })
        ]}     
        render={<InputIcon/>}  />
 
    </div>
    <div className='newsubject-form-col3-date-div'style={{ direction: "rtl" }}>
    <span className='newsubject-form-col3-span'>تاریخ انقضا:</span>

      <DatePicker
      className='custom-input'
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        value={value5}
        onChange={handleChangeB}
        animations={[
          opacity(), 
          transition({ from: 35, duration: 800 })
        ]} 
        render={<InputIcon/>}
      />
    </div>

                <div className="newsubject-login-label-float">
                  <input
                    name="orderValue"
                    type="text"
                    placeholder=""
                    {...register('orderValue',)}
                  />
                  <label>اولویت نمایش   </label>
                </div>
                <br />
                <br />
                <div className='newsubject-radio'>
                  <label className='newsubject-category-selectlabel' >  تاییدشده : </label><br />
                  <input {...register("radio")} type="radio" value={true} />
                  <label >  تایید  </label>

                  <input {...register("radio")} type="radio" value={false} />
                  <label >  عدم تایید </label>
                </div>
                <br />
                <br />
                <label className='newsubject-category-selectlabel'>دسته بندی :</label>
                <select className='newsubject-category'
                  {...register("category")}>
                  <option value="">انتخاب کنید...</option>
                  {categoryItem && categoryItem.map(item => (
                    <>
                      <option key={item.id} value={item.id} onClick={categoryIdChild}> {item.text}
                      </option>
                    </>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </form>
        <div className='row'>
          <div className='col'>
            <div className="newsubject-editor">
            <span className="newsubject-editor-span" onClick={()=>setFlagEditor(prev=>!prev)}>
              {
                flagEditor ?             <i class="fa-solid fa-angles-down"></i>
                :
                <i class="fa-solid fa-angles-up"></i>

              }
            </span>
     
<>

{/* {paragraphs.length == 0 &&  */}
<>
<p>dadasd</p> 
<div ref={contentRef} className="content-wrapper">
        
        <ParagraphsRenderer
          paragraphs={paragraphs}
          activeParagraph={null}
          activeRow={null}
          activeElement={null}
          setActiveParagraph={() => {}}
          setActiveRow={() => {}}
          setActiveElement={() => {}}
          setIsImageSelected={() => {}}
          setActivePopup={() => {}}
          handleTextResize={() => {}}
          setImageSettings={() => {}}
          setParagraphs={() => {}}
          isViewMode={true}
        />
      </div>
</>
      
      {/* } */}


<Tabs
dir='rtl'
  defaultActiveKey="subject"
  id="fill-tab-example"
  className="mb-2"
  // fill
  onSelect={ffc}

>
  <Tab  
  eventKey="editor1" title=" ادیتور 1" style={{ background: 'inherit' }}>
 <div style={{paddingBottom:'30px'}}>

{
  showw==='newSub' && flagReset &&
  <TextEditor height={!flagEditor ? '600px' :  '100vh'  }  image={true}  value={ckValue} onChange={handleEditorChange}/>

}
</div>
  </Tab>

  <Tab 
  eventKey="editor2" title=" ادیتور2 " style={{ background: 'inherit' }}>
   {
    !flagReset && <div>
    <RichTextEditor />
  </div>
   }

  </Tab>

</Tabs>

</>



 <div>
 {/* <TextEditor value={ckValue} onChange={handleEditorChange} /> */}

 </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  )
}