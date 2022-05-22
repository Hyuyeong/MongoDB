const express = require('express');
const app = express();
const port = 5000;

const { User } = require('../server/models/User');
const Product = require('../server/models/Product');

const { auth } = require('../server/middleware/auth');
// const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('../server/config/key');

const catchAsync = require('./utils/catchAsync');

const Campground = require('../server/models/Campground');
const Review = require('./models/Review');
// const { createProxyMiddleware } = require('http-proxy-middleware');

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

mongoose
  .connect(config.mongoURI)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/hello', (req, res) => {
  res.send('안녕하세요');
});

// app.use(
//   '/api',
//   createProxyMiddleware({
//     target: 'http://localhost:3000',
//     changeOrigin: true,
//   })
// );
// app.listen(3000);

// const options = {
//   target: 'http://localhost:3000/api', // target host with the same base path
//   changeOrigin: true, // needed for virtual hosted sites
// };

// create the proxy
// const exampleProxy = createProxyMiddleware(options);

// // mount `exampleProxy` in web server
// app.use('/api', exampleProxy);
// app.listen(3000);

app.post('/api/users/register', (req, res) => {
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.post('/api/users/login', (req, res) => {
  //check requested email in DB
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: 'Not matched User Name',
      });
    }
    //check requested password and if it is correct
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: 'Wrong password' });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // Save Token
        res
          .cookie('x_auth', user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});
app.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

////////////////////////PRODUCTS///////////////////////
/////

app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.send(product);
});

app.post('/api/products/new', (req, res) => {
  const newProduct = new Product(req.body);
  newProduct.save();
  // res.redirect(`/api/products/${newProduct._id}`);
  console.log(newProduct._id);
});
////////////////////////////////////////
// app.get('/api/products/:id/edit', async (req, res) => {
//   const { id } = req.params;
//   const product = await Product.findById(id);
//   res.send(product);
// });

///////////////////////////////////////////////////
app.post('/api/products/:id/edit', (req, res) => {
  const { id } = req.params;
  Product.findById(id).exec((err, productInfo) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, productInfo });
  });
});

app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
  });
});

app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
});

//////////////  CAMPGROUND
///////////////////////////////////////////////

app.get('/api/campgrounds', async (req, res) => {
  const campgrounds = await Campground.find({});
  res.send(campgrounds);
});

// app.get(
//   '/api/campgrounds/:id',
//   catchAsync(async (req, res) => {
//     const { id } = req.params;
//     const campground = await Campground.findById(id);
//     res.send(campground);
//   })
// );

app.get(
  '/api/campgrounds/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate('reviews');
    console.log(campground);
    res.send(campground);
  })
);

app.post(
  '/api/campgrounds/new',
  catchAsync(async (req, res) => {
    const newCampground = await new Campground(req.body);
    newCampground.save();

    console.log(req.body);
  })
);

app.get(
  '/api/campgrounds/:id/edit',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.send(campground);
  })
);

app.put(
  '/api/campgrounds/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, req.body, {
      runValidators: true,
    });
  })
);

app.delete(
  '/api/campgrounds/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndDelete(id);
  })
);

app.post(
  '/api/campgrounds/:id/review',
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.reviews);
    // console.log(campground);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    console.log(review);
    // console.log(campground.reviews.push(review));
  })
);

////////////////////ERROR HANDLE//////////////////

app.all('*', (req, res, next) => {
  res.send('error');
});

app.use((err, req, res, next) => {
  res.send('error');
});
///////////////////////////////////////////////
//////////

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
