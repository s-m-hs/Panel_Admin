import apiUrl from "../ApiConfig"



const ApiGetX2=(url,headerAuth,func)=>{
    async function myAppGet(){
const res=await fetch(`${apiUrl}${url}`,{
    method:'GET',
    headers:{
        "Content-Type": "application/json",
        Authorization: headerAuth,
    } 
}
).then(res=>{
    if(res.ok){
        return res.json().then(result=>func(result))
    }
}).catch(error => console.log(error))
    }
    myAppGet()
}

export default ApiGetX2