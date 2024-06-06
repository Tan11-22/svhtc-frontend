import React from 'react'
import "./Pagination.css"
function Pagination({ max, select, onPageChange}) {

    const numbers = [];
    const start = Math.max(2, select);
    const end = Math.min(max-1, select+2);

    numbers.push(1);
    if(start > 2) {
        numbers.push(" ...");
    }
    for (let i = start; i <=end; i++) {
        numbers.push(i);
      }
    if(end < max-1) {
        numbers.push("... ")
    }
    if (max>1){
      numbers.push(max);
    }

    // console.log(numbers);
    // if (max ===0) {
    //   return (<div></div>);
    // }

  return (
      <div className="line-pagination">
              <div className="pagination">
                <a href="#" 
                className={select ===0? "btn-disable-page":""}
                onClick={()=>onPageChange(select-1)}>&laquo;</a>
                {numbers.map(number=> 
                    (<a href="#" key={number} 
                    className={select+ 1 === number ? "active":""}
                    onClick={() => onPageChange(number-1)}>{number}
                    </a>)
                )}
                <a href="#"
                className={select ===max-1? "btn-disable-page":""}
                onClick={()=>onPageChange(select+1)}>&raquo;</a>
              </div>
            </div>
  )
}

export default Pagination
