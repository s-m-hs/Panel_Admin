import apiUrl from "../../ApiConfig"



const ApiGet=(url,headerAuth,setFun1,navigation)=>{
    async function myAppGet(){
const res=await fetch(`${apiUrl}${url}`,{
    method:'GET',
    headers:{
        "Content-Type": "application/json",
        Authorization: headerAuth,
    } 
}
).then(res=>{
   return res.json()
}).then(result=>setFun1(result)).
catch(error => navigation('/errorpage'))
    }
    myAppGet()
}

export default ApiGet