
const { constants } = require('buffer');
const { response } = require('express');
const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

var contactList = [];


app.get('/', function (req, res) {

    Contact.find({}, function (err, contacts) {
        if (err) {
            console.log('error in fetching contacts from db');
            return;
        }

        return res.render('home', {
            title: "my website",
            contact_list: contacts
        });

    });

});


// create a contact 
app.post('/create-contact', function (req, res) {

    Contact.create({
        name: req.body.name,
        phone: req.body.phone

    }, function (err, newContact) {
        if (err) {
            console.log('error in creating a contact');
            return;
        }
        return res.redirect('back');
    });

});


// delete
app.get('/delete-contact/', function (req, res) {
    let id = req.query.id;

    Contact.findByIdAndDelete(id, function (err) {
        if (err) {
            console.log('error in deleting an object from db');
            return;
        }
        return res.redirect('back');
    });

});


app.listen(port, function (err) {
    if (err) {
        console.log('err on port: ', err);
    }
    console.log(`server running on port: ${port}`);
});