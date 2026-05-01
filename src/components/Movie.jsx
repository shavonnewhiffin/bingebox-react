import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const Movie = () => {
const navigate = useNavigate();
const [isVisible, setIsVisible] = useState(false);

useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
}, [])

  return (
    <div className={`modal__container ${isVisible ? "modal__container--active" : ""}`}>
        <div className="modal">Modal Content</div>
        <div className="close" onClick={() => navigate(-1)}><FontAwesomeIcon icon={faXmark}/></div>
    </div>
  )
}

export default Movie