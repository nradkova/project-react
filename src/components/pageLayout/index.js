import React from 'react'
import Header from '../header'
import Footer from '../footer'
import './index.css'
import Scroller from '../scroller'

const PageLayout = (props) => {
  return (
    <div className="page-wrapper">
      <Header />
      <div className="page-wrapper-inner">
          {props.children}
      </div>
      <Scroller/>
      <Footer />
    </div>
  )
}

export default PageLayout