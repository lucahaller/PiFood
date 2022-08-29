import {Link} from 'react-router-dom'
import React from 'react';
import './LandingPage.css'


export default function LandingPage(){
 return(
  
     <div className='body' >
      <body >
      <h1 className='titulo'>Henry Food</h1>
     <div>
       <Link to={"/home"}>
       <button className='button3'>Go To Recipes!</button>
       </Link>
        </div>
      </body>
    </div>
  
    
 )
}