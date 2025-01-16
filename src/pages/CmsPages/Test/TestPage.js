import React, { useContext, useEffect, useState } from 'react'
import TextEditor from '../../../EditorExamole';
import apiUrl from '../../../utils/ApiConfig';
import { CmsContext } from '../../../context/CmsContext';
import './test.css'

export default function TestPage() {
const cmscontext=useContext(CmsContext)

      const [flagEditor, setFlagEditor] = useState(false);
        const [ckValue, setCkValue] = useState("");
        const [subject,setSubject]=useState('')
      
        const handleEditorChange = (value) => {
            setCkValue(value);
          };
    
const get=()=>{
    async function myApp(){
        const res=await fetch (`${apiUrl}/api/CySubjects/23`,{
            method:'GET',
            headers:{
                Authorization:`Bearer ${cmscontext.token.token}`,
                "Content-Type":"application/json",
            }
        }).then(res=>{
            if(res.ok){
                return res.json()
            }
        }).then(result=>{
            console.log(result)
            setSubject(result)
        })
    }
    myApp()
}

useEffect(()=>{
get()
},[])
  useEffect(() => {
    cmscontext.setFlagClass(false)
    cmscontext.setSideMenueFlag(false)
    return () => cmscontext.setFlagClass(true)
  }, [])

  return (
    <div>
        <div dangerouslySetInnerHTML={{__html:subject.body}}></div>
    {/* <TextEditor height={!flagEditor ? '400px' :  '100vh'  } image={true} value={ckValue} onChange={handleEditorChange} /> */}

    </div>
)
}
 