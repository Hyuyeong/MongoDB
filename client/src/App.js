import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import NavBar from './components/NavBar';
import ProductEdit from './components/ProductEdit';
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
        <Route exact path="/products" element={<Products />}></Route>
        <Route exact path="/products/:id" element={<ProductShow />}></Route>
        <Route exact path="/products/new" element={<ProductNew />}></Route>
        <Route
          exact
          path="/products/:id/edit"
          element={<ProductEdit />}
        ></Route>
      </Routes>

      {/* <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} /> */}
    </div>
  );
}

export default App;
