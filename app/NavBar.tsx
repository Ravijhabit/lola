import {navBarItems} from './component/constant'
import { CgProfile } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import Link from 'next/link';

function LoggedIn(){
    return(
        <main className='d-flex'>
            <CgProfile/>
            <Link href='/create' className="btn btn-light">Sell/Trade</Link>
            <CiSettings/>
        </main>
    )
} 

export default function NavBar () {
    // variable handling login status -> switch to actual one
    const loggedIn = true
    return(
        <main className='d-flex'>
            <div className="d-flex">
                {navBarItems.map(item => <h5 style= {{padding:'0 30px'}}>{item}</h5>)}
            </div>
            {loggedIn ? <LoggedIn/> : <button type="button" className="btn btn-primary">Log In</button> }
        </main>
    )
}