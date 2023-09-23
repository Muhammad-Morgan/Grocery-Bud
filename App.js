import React, { useState, useEffect, useRef, useReduce } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import List from './List'
import Alert from './Alert'
import Values from 'values.js'

const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if (list) {
    return JSON.parse(list)
  }
  else 
  {
    return []
    }
}

function App() {
  const [item, setItem] = useState('')
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({
    show: true,
    msg: '',
    type: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!item) {
      changeAlert(true, 'Enter a value', 'danger')
    }
    else if (item && isEditing) {
      setList(list.map((element) => {
        if (element.id === editID) {
          return { ...element, value: item }
        }
        return element
      }))
      setItem('')
      setIsEditing(false)
      setEditID(null)
      changeAlert(true, 'Item was amended', 'success')
    }
    else {
      changeAlert(true, 'Item was added', 'success')
      const newItem = { id: new Date().getTime().toString(), value: item }
      setList([...list, newItem])
      setItem('')
    }
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditID(id)
    setItem(specificItem.value)
  }

  const removeItem = (id) => {
    changeAlert(true, 'Item was removed', 'danger')
    const newList = list.filter((item) => item.id !== id)
    setList(newList)
  }

  const changeAlert = (show = false, msg = '', type = '') => {
    setAlert({
      show, msg, type
    })
  }

  useEffect(() => {
  localStorage.setItem('list',JSON.stringify(list))
},[list])

  return (
    <main className="container">
      {alert.show && <Alert {...alert} removeAlert={changeAlert} />}
      <form onSubmit={handleSubmit}
        className="text-bar">
        <h3>Grocery Bud</h3>
        <input type="text"
          placeholder='eggs'
          name="grocery"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <button type='submit'
          className='btn'>
          {!isEditing ? 'Add Item' : 'Edit'}
        </button>
      </form>

      {list.length > 0 &&
        (<section className="list-container">
          <List list={list} removeItem={removeItem} editItem={editItem} />
          <button className='clear-btn'
            onClick={() => {
              changeAlert(true, 'List was cleared', 'danger')
              setList([])
            }}
          >Clear All</button>
        </section>)
      }
    </main>
  )

}
export default App