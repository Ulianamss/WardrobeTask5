import profile from '../assets/profile.png';
import wardrobe from '../assets/wardrobe.png';
import looks from '../assets/looks.png';
import inspo from '../assets/inspo.png';    

import './navbar.css'  

// export const Navbar = (props)=>{
export const Navbar = ()=>{
    return(
        <div className="App-header">
            <div className='profilePage'>
                <a href='/userId'><img src={profile} className="App-logo" alt="profile" /></a>
            </div>

             <div className='wardrobePage'>
                <a href='/userId/wardrobePage'><img src={wardrobe} className="App-logo" alt="wardrobe" /></a>
            </div>

             <div className='looksPage'>
                <a href='/userId/looksPage'><img src={looks} className="App-logo" alt="looks" /></a>
            </div>

             <div className='inspoPage'>
                <a href='/userId/inspoPage'><img src={inspo} className="App-logo" alt="inspo" /></a>
            </div>
        </div>
    )
}