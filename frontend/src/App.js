import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";

import datamuse from "./apis/datamuse";
import AddCategoryForm from "./forms/AddCategoryForm";
import EditCategoryForm from "./forms/EditCategoryForm";
import CategoryTable from "./tables/CategoryTable";

const App = () => {
  const GRAPHQL_API = "http://localhost:4000/graphql";
  const GET_CATEGORIES_QUERY = `query {\n  categories {\n    id\n    term\n    keywords\n  }}`;
  const initialFormState = { id: null, term: "", keywords: [] };
  //Setting States
  const [term, setTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(initialFormState);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const queryResult = await axios.post(GRAPHQL_API, {
        query: GET_CATEGORIES_QUERY,
      });

      const result = queryResult.data.data;
      console.log(result);
      setCategories(result.categories);
    };
    fetchData();
  }, []);

  //CRUD Operations
  const deleteCategory = (term) => {
    const DELETE_CATEGORY=`mutation{
      deleteCategory(term: "${term}"){
        id
        term
        keywords
      }}`;
    const deleteData = async()=>{
      const queryResult = await axios.post(GRAPHQL_API, {
        query: DELETE_CATEGORY,
      });
      setEditing(false);
      setCategories(categories.filter((category) => category.term !== term));
    }
    deleteData()
    
  };

  const updateCategory = (term, updatedCategory) => {
    console.log("UPDATED", updatedCategory);
    if (typeof updatedCategory.keywords === "string")
      updatedCategory.keywords = updatedCategory.keywords.split(",");
      console.log(updatedCategory.keywords);
    const UPDATE_CATEGORY = `mutation{
      updateCategory(term: "${term}",keywords:${JSON.stringify(updatedCategory.keywords)}){
        id
        term
        keywords
      }
      }`;
    const updateData = async () => {
      const queryResult = await axios.post(GRAPHQL_API, {
        query: UPDATE_CATEGORY,
      });
      const result = queryResult.data.data;
      setEditing(false);
      setCategories(
        categories.map((category) =>
          category.term === term ? updatedCategory : category
        )
      );
    };
    updateData(term, updatedCategory.keywords);
  };

  const addCategory = (term) => {
    console.log("ADD Category" + term);
    search(term);
  };

  const editRow = (category) => {
    setEditing(true);

    setCurrentCategory({
      id: category.id,
      term: category.term,
      keywords: category.keywords,
    });
  };

  const search = async (term) => {
    console.log("TERM", term);
    const response = await datamuse.get("words", {
      params: {
        ml: term,
      },
    });
    //console.log(response);
    const keywords = [];
    if (response.data) {
      response.data.slice(0, 10).map((keyword) => {
        keywords.push(keyword.word);
      });
      var obj = {};
      obj.term = term;
      obj.keywords = keywords;
      const ADD_CATEGORY=`mutation{
        createCategory(term: "${term}",keywords:${JSON.stringify(keywords)}){
          id
          term
          keywords
        }}`;
        const createData = async () => {
          const queryResult = await axios.post(GRAPHQL_API, {
            query: ADD_CATEGORY,
          });
          console.log(queryResult)
          setCategories([...categories, obj]);
        };
        createData()
    }
  };

  return (
    <div className="container">
      <h1>Category + keyword App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          <h2>View Categories</h2>
          <CategoryTable
            categories={categories}
            editRow={editRow}
            deleteCategory={deleteCategory}
          />
        </div>
      </div>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <Fragment>
              <h2>Edit Category</h2>
              {
                <EditCategoryForm
                  editing={editing}
                  setEditing={setEditing}
                  currentCategory={currentCategory}
                  updateCategory={updateCategory}
                />
              }
            </Fragment>
          ) : (
            <Fragment>
              <h2>Add Category</h2>
              <AddCategoryForm addCategory={addCategory} />
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};
export default App;
