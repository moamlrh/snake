import React from 'react' 

export default (props) =>{
  return(
    <div className="food" style={{left:props.dots[0]+'%', top:props.dots[1]+'%'}}></div>
  )
}