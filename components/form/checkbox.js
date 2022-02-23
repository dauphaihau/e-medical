import React from "react";

const Checkbox = ({label,value,name,id,title,color,types,fors}) => (
  // {console.log(color)}
    <div className={`form-group ${types=== "bgcheckbox" ? 'mb-0' : '' }`} >
    <label>{label}</label>
    <div className="form-switch pl-10">      
      <input type="checkbox" className="pl-4 form-check-input" name={name} id={id}/>
      <label className="form-check-label" for={fors} style={{color : `${color}`}}>{title}</label>
    </div>
    </div>
  
);

export default Checkbox;