import React from 'react'
import logo from "../assets/bingeboxlogo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars, faXmark} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const NavBar = () => {

// Sandwich Menu
function openMenu() {
    document.body.classList += " menu--open";
  }
  
  function closeMenu() {
    document.body.classList.remove("menu--open");
  }

  return (
    <nav>
    <div className="nav__content">
            <figure className="nav__logo--wrapper">
              <Link to="/"><img src={logo} alt="bingebox logo" className="nav__logo"/></Link>
             </figure>
             <div className="nav__links">
               <Link to="/" className="nav__link link__hover-effect"><b> Home</b></Link>
                 <Link to="/browse" className="nav__link link__hover-effect"><b>Browse</b></Link>
                 <Link to="#" className="nav__link link__hover-effect"><b>Trending</b></Link>
                 <Link to="/" className="nav__link link__hover-effect"><b>Contact</b></Link>
                 <button className="btn__menu" onClick={openMenu}><FontAwesomeIcon icon={faBars}/></button>
                 <div className="menu__backdrop">
                     <button className="btn__menu btn__menu--close" onClick={closeMenu}><FontAwesomeIcon icon={faXmark}/>
                     </button>
                     <div className="menu__lists">
                     <ul>
                         <li className="menu__list"> 
                            <Link><p className="menu__link" onClick={closeMenu}>Home</p></Link>
                         </li>
                         <li className="menu__list"> 
                             <Link><p className="menu__link" onClick={closeMenu}>Browse</p></Link>
                         </li>
                         <li className="menu__list"> 
                             <Link><p className="menu__link no-click" onClick={closeMenu}>Trending</p></Link>
                         </li>
                         <li className="menu__list menu__list--primary-link"> 
                             <Link><p className="menu__list--primary">Contact</p></Link>
                         </li>
                     </ul>
                 </div>
                 </div> 
             </div>
     </div>
</nav>
  )
}

export default NavBar