import apiUrl from "../../ApiConfig";

const ApiDelete=(url,id,headerAuth,alert,...fun)=>{
    async function myAppPut() {
    const res = await fetch(`${apiUrl}${url}/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: headerAuth,
            "Content-Type": "application/json",
        },
    }).then(res => console.log(res)
     ).then(result=>{
        alert(fun([0]))
     }).
     catch(err => console.log(err))
}
myAppPut()

}
export default ApiDelete