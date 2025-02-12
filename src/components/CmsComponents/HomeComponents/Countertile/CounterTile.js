import React from 'react'
import './CounterTile.css'
import CounterSpan from '../../CounterSpan'

export default function CounterTile() {

  const tileArray = Array.from({ length: 7 })

  

  return (

    <>
      <div className=' centerr boxSh box-main-div ' >
      

        {/* <div class=" box centerc "  ><CounterSpan count={1500}/> </div> */}
        <div class=" box2 centerc">
          <p>مدیران</p>
          <CounterSpan count={35}/></div>

        <div class=" box3 centerc">
        <p>مشتریان</p>

          <CounterSpan count={1500}/></div>

        <div class=" box4 centerc">
                    <p>محصولات</p>

          <CounterSpan count={4500}/></div>

        <div class=" box5 centerc">
                    <p>مطالب</p>

          <CounterSpan count={350}/></div>

        <div class=" box6 centerc">
                    <p>تیکتها</p>

          <CounterSpan count={1400}/></div>

        <div class=" box7 centerc">
                    <p>سفازشات</p>

          <CounterSpan count={3500}/></div>

        <div class=" box8 centerc">
                    <p> مرسولی</p>

          <CounterSpan count={1500}/></div>

        <div class=" box9 centerc">
                    <p>خدمات</p>

          <CounterSpan count={1800}/></div>

     
       
      </div>


    </>



  )
}
