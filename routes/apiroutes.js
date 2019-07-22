// Requirements
const express = require('express');

// "Router" is method coming back from express object
const router = express.Router();

const Contact = require('./../models/contact');

// Root get request
router.get('/', async(req, res) => {
    try {
        const allContacts = await Contact.find();
        res.send(allContacts);
    } catch (error) {
        console.error(error);
    }
});

// Get single contact
router.get('/:id', getContactById, (req, res) => {
    res.send(res.contact);
});

// Post request
router.post('/', async(req, res) => {
    const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });
    try {
        const newContact = await contact.save();
        res.status(201).json(newContact);
    } catch (error) {
        console.error(error);
    }
});

// Delete request
router.delete('/:id', getContactById, async(req, res) => {
    try {
        await res.contact.remove();
        res.json({ message: "Contact removed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Patch (update) request
router.patch('/:id', getContactById, async(req, res) => {
    if (req.body.name != null) {
        res.contact.name = req.body.name;
    };
    if (req.body.email != null) {
        res.contact.email = req.body.email;
    };
    if (req.body.message != null) {
        res.contact.message = req.body.message;
    };
    try {
        const updatedContact = await res.contact.save();
        res.status(201).json(updatedContact);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


async function getContactById(req, res, next) { // "next" is indicative of middleware
    let contact;
    try {
        contact = await Contact.findById(req.params.id);
        if (contact == null) {
            return res.status(404).json('Contact not found');
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.contact = contact;
    next();
};


// Export router
module.exports = router;