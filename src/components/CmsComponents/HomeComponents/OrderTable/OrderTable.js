import React from 'react'
import TableMin from '../TableMin'

export default function OrderTable() {
  const transactions=[
    {id:1,name:'Reza Sadati',data:'12 Jun 2022',phone:9196235112,email:'Reza@Gmail.com',img:'../../../images/face/images (1).jpg'},
    {id:2,name:'Ali Alimi',data:'5 Feb 2023',phone:9127506258,email:'Ali@Gmail.com',img:'../../../images/face/download.jpg'},
    {id:3,name:'Omid Rezayi',data:'23 Agu 2023',phone:9185685778,email:'Omid@Gmail.com',img:'../../../images/face/images.jpg'},
    {id:4,name:'Akbar Elahi',data:'13 Des 2021',phone:9128741223,email:'Akbar@Gmail.com',img:'../../../images/face/download9.jpg'},
    {id:5,name:'Mohsen Samae',data:'08 Apr 2020',phone:9196052113,email:'Masoud@Gmail.com',img:'../../../images/face/download8.jpg'},
    {id:6,name:'Alireza Soltani',data:'29 Agu 2023',phone:9127025114,email:'Alireza@Gmail.com',img:'../../../images/face/images7.jpg'},
    {id:7,name:'Hossein Salami',data:'15 Jan 2022',phone:9197123441,email:'Hossein@Gmail.com',img:'../../../images/face/images 6.jpg'},
    {id:8,name:'Omid Ghodsi',data:'23 Jun 2023',phone:9176582114,email:'Omid@Gmail.com',img:'../../../images/face/images 5.jpg'},
]
const products=[
  {id:1,name:'AppleWatch256',data:'12 Jun 2022',phone:9196235112,email:'Reza@Gmail.com',img:'../../../images/product/pic252525.jpg'},
  {id:2,name:'Anker GH-850',data:'5 Feb 2023',phone:9127506258,email:'Ali@Gmail.com',img:'../../../images/product/pic6.jpg'},
  {id:3,name:'Jenuss RE-8',data:'23 Agu 2023',phone:9185685778,email:'Omid@Gmail.com',img:'../../../images/product/pic1313.jpg'},
  {id:4,name:'A4-Teach 835',data:'13 Des 2021',phone:9128741223,email:'Akbar@Gmail.com',img:'../../../images/product/pic7.jpg'},
  {id:5,name:'Galexy G83',data:'08 Apr 2020',phone:9196052113,email:'Masoud@Gmail.com',img:'../../../images/product/pic24.jpg'},
  {id:6,name:'Logitec Y-96',data:'29 Agu 2023',phone:9127025114,email:'Alireza@Gmail.com',img:'../../../images/product/pic11.jpg'},
  {id:7,name:'XP-45',data:'15 Jan 2022',phone:9197123441,email:'Hossein@Gmail.com',img:'../../../images/product/pic141414.jpg'},
  {id:8,name:'ProOne F-35',data:'23 Jun 2023',phone:9176582114,email:'Omid@Gmail.com',img:'../../../images/product/pic242424.jpg'},
]
  return (
    <div className='container centerr' >

      <div className='row'>
<div className='col col-md-4'><TableMin title=' آخرین کاربران  :' users={transactions} th1='شناسه'th2='تصویر' th3='کاربر' table='table-primary'/>
</div>
<div className='col col-md-4'><TableMin title=' آخرین محصولات :' users={products} th1='شناسه'th2='تصویر' th3='کاربر' table='table-info'/>
</div>
<div className='col col-md-4'><TableMin title='آخرین سفارشات :' users={transactions} th1='شناسه'th2='تصویر' th3='کاربر' table='table-warning'/>
</div>

      </div>


    </div>
  )
}
