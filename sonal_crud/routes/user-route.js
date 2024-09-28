const express = require('express');
const router = express.Router();
const connection = require('../config/database'); 

// Route
router.get('/add', (req, res) => {
    res.render('form', { customer: null });
});
router.get('/edit/:id', (req, res) => {
    const userId = req.params.id;
    connection.query('SELECT * FROM customer WHERE id = ?', [userId], (err, rows) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Database error');
        }
        if (rows.length > 0) {
            res.render('form', { customer: rows[0] });
        } else {
            res.status(404).send('User not found');
        }
    });
});
router.post('/create', (req, res) => {
    const { name, address, email, phone } = req.body;
    connection.query('INSERT INTO customer (name, address, email, phone) VALUES (?, ?, ?, ?)', 
        [name, address, email, phone], 
        (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Database error');
            }
            res.redirect('/users');
        }
    );
});
router.post('/update/:id', (req, res) => {
    const userId = req.params.id;
    const { name, address, email, phone } = req.body;
    connection.query('UPDATE customer SET name = ?, address = ?, email = ?, phone = ? WHERE id = ?', 
        [name, address, email, phone, userId], 
        (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Database error');
            }
            res.redirect('/users');
        }
    );
});
router.post('/delete/:id', (req, res) => {
    const userId = req.params.id;
    connection.query('DELETE FROM customer WHERE id = ?', [userId], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Database error');
        }
        res.redirect('/users');
    });
});
router.get('/', (req, res) => {
    connection.query('SELECT * FROM customer', (err, rows) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Database error');
        }
        res.render('table', { users: rows });
    });
});
module.exports = router; 
