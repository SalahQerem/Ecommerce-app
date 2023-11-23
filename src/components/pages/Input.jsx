import React from 'react'

function Input({id, type='text', name, title, onChange, errors, onBlur, touched}) {
  return (
    <div className='input-group mb-2'>
        <label htmlFor={id} className='w-100 fs-5 pb-2'>{title}</label>
        <input 
          id={id} 
          type={type} 
          name={name} 
          onChange={onChange} 
          onBlur={onBlur} 
          className='form-control rounded-3 w-100'
        />
        {errors[name] && touched[name] && <p className='text-danger mb-0 ms-auto'>{errors[name]}</p>}
    </div>
  )
}

export default Input