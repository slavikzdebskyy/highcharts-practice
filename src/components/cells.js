import React from 'react';

const Cells = ({valuesArray}) => (
  valuesArray.map((el, index)=> (
      <span key = {index}>{el}</span>
    )
  )  
)

export default Cells;