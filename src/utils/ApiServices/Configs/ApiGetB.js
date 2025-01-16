
import apiUrl from "../../ApiConfig"


const ApiGetB=(url,authHeader,setFun,navig)=>{


    async function myAppGet(){
        const res=await fetch(`${apiUrl}${url}`,{
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authHeader}`,
          }
        }).then(res => res.json()).
        then((result) =>
                setFun(result)
            
        ).catch(error => navig('/errorpage'))
      }
      myAppGet()  
}
export default ApiGetB