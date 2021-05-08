import React, { useState } from 'react'

const AddCategoryForm = props => {
	const [ term, setTerm ] = useState('')
	const handleInputChange = event => {
        console.log("Handle")
        console.log(event.target)
		const { name, value } = event.target
		setTerm(event.target.value)
	}

	return (
		<form
			onSubmit={event => {
				event.preventDefault()
                console.log(term)
				if (!term ) return
				props.addCategory(term)
				setTerm('')
			}}
		>
			<label>Name</label>
			<input type="text" name="name" value={term} onChange={handleInputChange} />
			<button>Add New Category</button>
		</form>
	)
}

export default AddCategoryForm