let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');


// connect to our Contact Model
//let Coctact = require('../models/contact');
let contactController = require('../controllers/contact');

// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in 
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}
/* GET Route for the Contact List page - READ OPeration */
router.get('/', contactController.displayContactList);

/* GET Route for desplaying the Add page - creare operation */
router.get('/add', requireAuth, contactController.displayAddPage);
/* POST Route for processing the Add page - READ OPeration */
router.post('/add', requireAuth, contactController.processAddPage);
/* GET Route for processing the Edit page - update operation */
router.get('/edit/:id', requireAuth, contactController.displayEditPage);
/* POST Route for processing the Edit page - update operation */
router.post('/edit/:id', requireAuth, contactController.processEditPage);
/* GET to perform the deletion - delete operation */
router.get('/delete/:id', requireAuth, contactController.performDelete);

module.exports = router;