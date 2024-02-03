import {navBarItems} from './component/constant'
import { CgProfile } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";

function LoggedIn(){
    return(
        <main className='d-flex'>
            <CgProfile/>
            <button type="button" className="btn btn-light">Sell/Trade</button>
            <CiSettings/>
        </main>
    )
} 

export default function NavBar () {
    const loggedIn = true
    return(
        <main className='d-flex'>
            <div className="d-flex">
                {navBarItems.map(item => <h5 style= {{'padding':'0 30px'}}>{item}</h5>)}
            </div>
            {loggedIn ? <LoggedIn/> : <button type="button" className="btn btn-primary">Log In</button> }
        </main>
    )
}