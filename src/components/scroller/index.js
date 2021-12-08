import './index.css'

const Scroller = () => {

  const onClickHandler = (e) => {
    window.scrollTo(0, 0)
  }

  return (
    <button className="scroller-button" onClick={onClickHandler}><i className="fas fa-arrow-up"></i></button>
  )
}

export default Scroller;