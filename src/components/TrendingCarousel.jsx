import React from 'react'

const TrendingCarousel = () => {
  return (
    <section id="trending">
    <div className="row__narrow">
<div className="carousel">
  <div className="carousel__track">
    <div className="group">
        <div className="card">1</div>
        <div className="card">2</div>
        <div className="card">3</div>
        <div className="card">4</div>
        <div className="card">5</div>
    </div>
    <div aria-hidden className="group">
        <div className="card">1</div>
        <div className="card">2</div>
        <div className="card">3</div>
        <div className="card">4</div>
        <div className="card">5</div>
    </div>
  </div>
</div>
    </div>
  </section>
  )
}

export default TrendingCarousel