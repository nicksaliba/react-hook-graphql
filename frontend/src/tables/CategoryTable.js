import React from 'react'
import Keyword from '../components/keyword'
const CategoryTable = props => (
  <table>
    <thead>
      <tr>
        <th>Term</th>
        <th>Keywords</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.categories.length > 0 ? (
        props.categories.map(category => (
          <tr key={category.term}>
            <td>{category.term}</td>
            <td><div className="ui relaxed grid"><div className="five column row"><Keyword keywordList={category.keywords}/></div></div></td>
            <td>
              { <button
                onClick={() => {
                  props.editRow(category)
                }}
                className="button muted-button"
              >
                Edit
              </button> }
              <button
                onClick={() => props.deleteCategory(category.term)}
                className="button muted-button"
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No Categories</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default CategoryTable