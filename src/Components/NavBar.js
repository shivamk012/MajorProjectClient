import { Link } from "react-router-dom";

function NavBar(){
    return (
        // <nav className="navbar navbar-expand-lg navbar-light" style={{"backgroundColor": "#e3f2fd"}}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
            <Link to="/" className="navbar-brand" href="#">Home Page</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                <Link to="/currentLocation" className="nav-link" href="#">CurrentLocation</Link>
                <Link to="/route" className="nav-link" href="#">Route</Link>
            </div>
            </div>
        </div>
        </nav>
    )
}

export default NavBar;