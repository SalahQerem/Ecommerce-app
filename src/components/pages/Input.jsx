import React from 'react'

function Input({id, type='text', name, title, onChange, errors}) {
  return (
    <div className='input-group mb-3'>
        <label htmlFor={id}>{title}</label>
        <input id={id} type={type} name={name} onChange={onChange} className='form-control'/>
        {errors[name] && <p className='text text-danger'>{errors[name]}</p>}
    </div>
  )
}

export default Input