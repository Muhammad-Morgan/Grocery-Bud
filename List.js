import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

function List({ list, removeItem, editItem }) {
    return <>
        {list.map((item) => {
            const { id, value } = item
            return (
                <div className="item" key={id} >
                    <p> {value} </p>
                    <div className="btn-container">
                        <button className='edit-btn'
                            onClick={() => editItem(id)}
                        >
                            <FaEdit />
                        </button>
                        <button className='trash-btn'
                            onClick={() => removeItem(id)}
                        >
                            <FaTrash />
                        </button>
                    </div>
                </div>
            )
        })}

    </>
}

export default List