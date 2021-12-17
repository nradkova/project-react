import { useState } from 'react';

import './index.css'

const Scroller = () => {
  const [isSelected, setIsSelected] = useState('');
  
  const onClickHandler = (e) => {
    window.scrollTo(0, 0)
  }
 
  window.addEventListener('scroll', () => {
    if (window.innerHeight + 30 >= window.scrollY) {
      setIsSelected('selected');
    }
  });

  return (
    <button className={`scroller-button ${isSelected}`} onClick={onClickHandler}><i className="fas fa-arrow-up"></i></button>
  )
}

export default Scroller;