import { useState } from 'react';

import './index.css'

const Scroller = () => {
  const [isSelected, setIsSelected] = useState('');

  const onClickHandler = (e) => {
    window.scrollTo(0, 0)
  }

  const setVisible = () => {
    if (window.innerHeight + 30 >= window.scrollY) {
      setIsSelected('selected');
    }
  }
  window.addEventListener('scroll', setVisible);

  window.addEventListener('scroll', () => {
    if (window.innerHeight + 50 >= window.scrollY) {
      window.removeEventListener('scroll', setVisible);
    }
  })

  return (
    <button className={`scroller-button ${isSelected}`} onClick={onClickHandler}><i className="fas fa-arrow-up"></i></button>
  )
}

export default Scroller;