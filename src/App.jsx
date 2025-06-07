import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './Components/Home';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';

import Items from './Components/Items';
import ItemDetails from './Components/ItemDetails'; // Import for item detail view
import Trades from './Components/Trades';
import AddItem from './Components/AddItem';
import Adminpage from './Components/Adminpage';
import EditItem from './Components/EditItem';
import MyTrades from './Components/MyTrades';
import MyItems from './Components/MyItems';
import NewHome from './Components/NewHome';
import NewNavbar from './Components/NewNavBar';
import NewAbout from './Components/NewAbout';
import NewSignUp from './Components/NewSignup';
import NewLogin from './Components/NewLogin';
import ContactUs from './Components/ContactUs';
import FAQ from './Components/FAQ';
function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root path to signup */}
        <Route path="/" element={<Navigate to="/newhome" />} />

        {/* Authentication Routes */}

        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/newhome" element={<NewHome />} />
        <Route path="/newnavbar" element={<NewNavbar />} />
        <Route path="/newabout" element={<NewAbout />} />
        <Route path="/newsignup" element={<NewSignUp />} />
        <Route path="/newlogin" element={<NewLogin />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/faq" element={<FAQ />} />


        {/* Main App Routes */}
        <Route path="/home" element={<Home />} />

        <Route path="/items" element={<Items />} />
        <Route path='/my-items' element={<MyItems />} />
        <Route path="/item/:id" element={<ItemDetails />} /> {/* Item details route */}
        <Route path="/trade/:id" element={<Trades />} />
        <Route path="/trades" element={<MyTrades />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/edit-item/:id" element={<EditItem />} />


        {/* Admin Route */}
        <Route path="/admin" element={<Adminpage />} />
      </Routes>
    </Router>
  );
}

export default App;
