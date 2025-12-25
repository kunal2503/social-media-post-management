import React from 'react'

const Input = ({placeholder,name,type,onChange,value,id}) => {
  return (
    <>
        <input name={name} type={type } placeholder={placeholder ? placeholder : "Enter value"} id={id ? id : null} onChange={onChange} value={value} className='outline-none px-6 py-2 border border-gray-400 rounded-sm w-full focus:border-2 focus:border-blue-500' />
    </>
  )
}

export default Input