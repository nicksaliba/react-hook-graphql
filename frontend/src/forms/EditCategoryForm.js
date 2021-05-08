import React, { useState, useEffect } from 'react'

const EditCategoryForm = props => {
  const [ category, setCategory ] = useState(props.currentCategory)

  useEffect(
    () => {
        setCategory(props.currentCategory)
    },
    [ props ]
  )

  const handleInputChange = event => {
      console.log(event.target)
    const { name, value } = event.target
    setCategory({ ...category, [name]: value  })
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()

        props.updateCategory(category.term, category)
      }}
    >
      <label>Term</label>
      <input type="text" name="term" value={category.term}  disabled onChange={handleInputChange}/>
      <label>Keywords</label>
      <input type="text" name="keywords" value={category.keywords} onChange={handleInputChange} />
      <button>Update Category</button>
      <button onClick={() => props.setEditing(false)} className="button muted-button">
        Cancel
      </button>
    </form>
  )
}

export default EditCategoryForm