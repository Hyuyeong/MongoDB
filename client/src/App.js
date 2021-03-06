import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import NavBar from './components/NavBar';
import ProductNew from './components/ProductNew';
import Products from './components/Products';
import ProductShow from './components/ProductShow';
import RegisterPage from './components/RegisterPage';
import Auth from './hoc/auth';

function App() {
  return (
    <div>
      <NavBar />

      <Routes>
        <Route path="/" element={Auth(LandingPage, null)}></Route>
        <Route path="/login" element={Auth(LoginPage, false)}></Route>
        <Route path="/register" element={Auth(RegisterPage, false)}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/products/:id" element={<ProductShow />}></Route>
        <Route path="/products/new" element={<ProductNew />}></Route>
      </Routes>

      {/* <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} /> */}
    </div>
  );
}

export default App;
