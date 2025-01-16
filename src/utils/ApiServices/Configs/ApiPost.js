import apiUrl from "../../ApiConfig";

const ApiPost=(url,headerAuth,obj,alert,...fun)=>{
    async function myAppPost() {
    const res = await fetch(`${apiUrl}${url}`, {
        method: 'POST',
        headers: {
            Authorization: headerAuth,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)
    }).then(res => {
        // console.log(res)
        if (res.ok) {
         alert()
         fun([0])
         fun([1])
         fun([2])
         fun([3])
        }
    }
    ).catch(err => console.log(err))
}
myAppPost()

}
export default ApiPost