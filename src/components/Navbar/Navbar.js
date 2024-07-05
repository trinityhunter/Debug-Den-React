import React, { useEffect } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
// import logo from '../../assets/logo.png'
import search from '../../assets/search-solid.svg'
import Avatar from '../Avatar/Avatar'
import { setCurrentUser } from '../../actions/currentUser';
import decode from 'jwt-decode'

const Navbar = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    var User = useSelector((state) => (state.currentUserReducer))
    

    const handleLogOut = () => {
        dispatch({ type: 'LOGOUT' })
        navigate('/')
        dispatch(setCurrentUser(null))
    }


    useEffect(() => {

        const token  = User?.token

        if(token){
            const decodedToken = decode(token)

            if(decodedToken.exp * 1000 < new Date().getTime()){
                handleLogOut()
            }
        }

        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        // eslint-disable-next-line
    }, [User?.token, dispatch])
    

  return (
    <nav className="main-nav">
        <div className="navbar">
            <Link to='/' className='nav-item nav-logo'>
                {/* <img src={logo} alt='logo'/> */}
                <h1 style={{fontWeight: "bold"}}>Debug-Den</h1>
            </Link>
            <Link to='/' className='nav-item nav-btn'>About</Link>
            <Link to='/' className='nav-item nav-btn'>Products</Link>
            <Link to='/' className='nav-item nav-btn'>For VIT</Link>
            <form>
                <input type="text" placeholder='Search...' />
                <img src={search} alt="search" width="18" className='search-icon'/>
            </form>
            {User === null ? 
                <Link to='/Auth' className='nav-item nav-links'>Log In</Link>
                :
                <>
                    {/* {console.log(User)} */}
                    <Avatar backgroundColor='#009bff' px='10px' py='7px' borderRadius='50%' color='white' ><Link to={`/Users/${User.user.email}`} style={{textDecoration: "none"}}>{User.user.name.charAt(0).toUpperCase()}</Link></Avatar>
                    <button className='nav-item nav-links' onClick={handleLogOut}>Log Out</button>
                </>
            }   
        </div>
    </nav>
  )
}

export default Navbar;