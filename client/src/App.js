import { Routes, Route } from 'react-router-dom';
// import LandingPage from './components/LandingPage';
// import LoginPage from './components/LoginPage';
// import NavBar from './components/NavBar';
// import ProductEdit from './components/ProductEdit';
// import ProductNew from './components/ProductNew';
// import Products from './components/Products';
// import ProductShow from './components/ProductShow';
// import RegisterPage from './components/RegisterPage';
// import Auth from './hoc/auth';

import { Container } from 'react-bootstrap';

import Home from './Campground/Home';
import Show from './Campground/Show';
import New from './Campground/New';
import Edit from './Campground/Edit';
import NavBar from './Campground/NavBar';
function App() {
  return (
    <div>
      {/* <NavBar /> */}
      <NavBar />
      <Container className="mt-5">
        <Routes>
          {/* <Route path="/" element={Auth(LandingPage, null)}></Route>
        <Route path="/login" element={Auth(LoginPage, false)}></Route>
        <Route path="/register" element={Auth(RegisterPage, false)}></Route>
        <Route exact path="/products" element={<Products />}></Route>
        <Route exact path="/products/:id" element={<ProductShow />}></Route>
        <Route exact path="/products/new" element={<ProductNew />}></Route>
        <Route
          exact
          path="/products/:id/edit"
          element={<ProductEdit />}
        ></Route> */}
          <Route exact path="/campgrounds" element={<Home />}></Route>
          <Route exact path="/campgrounds/:id" element={<Show />}></Route>
          <Route exact path="/campgrounds/new" element={<New />}></Route>
          <Route exact path="/campgrounds/:id/edit" element={<Edit />}></Route>
        </Routes>
      </Container>

      {/* <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} /> */}
    </div>
  );
}

export default App;
