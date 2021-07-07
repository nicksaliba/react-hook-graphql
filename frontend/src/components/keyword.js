import React from 'react'

const Keyword = (props) => {
    return props.keywordList.map((keyword)=>{
        return (
            <div key = {keyword} className="column">{keyword}</div> 
        );
    })
};
export default Keyword;