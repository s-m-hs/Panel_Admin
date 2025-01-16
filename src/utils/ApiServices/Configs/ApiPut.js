import apiUrl from "../../ApiConfig";

const ApiPut=(url,id,headerAuth,obj,alert,...fun)=>{
    async function myAppPut() {
    const res = await fetch(`${apiUrl}${url}/${id}`, {
        method: 'PUT',
        headers: {
            Authorization: headerAuth,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)
    }).then(res => {
        if (res.ok) {
         alert()
         fun([0])
         fun([1])
         fun([2])
        }
     }
    ).catch(err => console.log(err))
}
myAppPut()

}
export default ApiPut