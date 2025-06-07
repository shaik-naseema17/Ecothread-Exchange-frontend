import './NewNavBar.css';
import { Link } from 'react-router-dom';
function NewNavbar() {
  return (
    <nav className="newnavbar-container">
      <div className="newnavbar-logo">EcoThread Exchange</div>
      <ul className="newnavbar-links">
      <nav>
      <Link to="/">Home</Link>
        <Link to="/newabout">About</Link>
        <Link to="/newsignup">Sign Up</Link>
        <Link to="/newlogin">Sign In</Link>
        <Link to="/contactus">Contact Us</Link>
      </nav>
        
      </ul>
    </nav>
  );
}

export default NewNavbar;
