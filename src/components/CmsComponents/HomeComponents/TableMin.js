import React from 'react'
import './TableMin.css'

export default function TableMin(props) {


  return (


    <div className={`table  ${props.table} table-hover table-striped tablemin-div `}>

<h4 className='boxSh TableMin-h4'>{props.title}</h4>
        <thead>
            <tr key="">
                <th>{props.th1}</th>
                <th>{props.th2}</th>
                <th>{props.th3}</th>
            </tr>
        </thead>
        
        <tbody>
            {props.users.map(item=>(
                 <tr key={item.id}>
                <td>{item.id}</td>
                <td><img className='tablemin-div-img' src={item.img} alt="" /> </td>
                <td>{item.name}</td>
            </tr>
            ))}
           
        </tbody>
    </div>
  )
}
