import apiUrl from "../ApiConfig";

const ApiPostX3=(url,headerAuth,id,func)=>{
async function myAppPost() {
    const res = await fetch(`${apiUrl}${url}${id}`, {
        method: 'POST',
        headers: {
            Authorization: headerAuth,
            "Content-Type": "application/json",
        },
    }).then(res => {
        console.log(res)
        if (res.ok) {
            return res.json().then(result=>{
                // console.log(result);
        if(result){
            func(result)

        }
    })
        }
    }
    ).catch(err =>console.log(err))
}
myAppPost()
}
export default ApiPostX3