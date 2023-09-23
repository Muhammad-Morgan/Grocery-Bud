import React, {useEffect} from 'react'

function Alert({msg,type,removeAlert}) {
  
    useEffect(() => {
        const timeOut = setTimeout(() => {
        removeAlert()
        }, 3000)
        return ()=> clearTimeout(timeOut)
},[type])
    
return (
      <p className={`alert ${type}`}>
          {msg}
    </p>
  )
}

export default Alert