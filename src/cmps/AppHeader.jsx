import { NavLink } from "react-router-dom";
import { LoginSignup } from "./LoginSignup";
import { useSelector } from "react-redux";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { logout } from "../store/actions/user.actions";



export function AppHeader() {

    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    function onLogout() {
        logout()
            .then(() => {
                showSuccessMsg('logout successfully');
            })
            .catch(err => {
                showErrorMsg('OOPs try again');
            });
    }


    return <header className="app-header">
        <section className="header-container">
            <h1>lolly toys</h1>   
            {user ? (
                <section className="login-container">
                    <span to={`/user/${user._id}`}>
                        Hello {user.fullname}
                    </span>
                    {/* <progress value={howMuchDone()} max={todos.length}></progress> */}
                    <button className="btn" onClick={onLogout}>Logout</button>
                </section>
            ) : (
                <section className="login-container">
                    <LoginSignup />
                </section>
            )}
            <nav className="app-nav">
                <NavLink to="/" >Home</NavLink>
                {/* <NavLink to="/about" >About</NavLink> */}
                <NavLink to="/toy" >Toys</NavLink>
            </nav>
         
        </section>
    </header >

}