let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');


/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);


/* GET Projects page. */
router.get('/projects', indexController.displayProjectsPage);


/* GET Services page. */
router.get('/services', indexController.displayServicesPage);


/* GET Contact us page. */
router.get('/contact', indexController.displayContactPage);


/* GET About Me page. */
router.get('/about', indexController.displayAboutPage);

// setup the router for User Login 
/* GET Route for desplaying the Login page */
router.get('/login', indexController.displayLoginPage);

/* POST Route for processing the Login page */
router.post('/login', indexController.processLoginPage);

/* GET Route for desplaying the Register page */
router.get('/register', indexController.displayrRegisterPage);

/* POST Route for processing the Register page */
router.post('/register', indexController.processRegisterPage);

/* GET to perform the UserLogout */
router.get('/logout', indexController.performLogout);

module.exports = router;
