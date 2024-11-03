const _ = require('underscore');
const { Router } = require('express');
const router = Router();

// Import the JSON file containing phrases
const fraseDelDia = require('../routes/data.json');

// GET route to fetch a phrase by ID
router.get('/frase/:id', (req, res) => {
    const { id } = req.params;
    const frase = fraseDelDia.find(f => f.id == id); 

    if (frase) {
        res.json(frase);
    } else {
        res.status(404).json({ error: 'Frase no encontrada.' }); // 404 Not Found
    }
});

// ----------CRUD operations----------------------//

// POST route to add a new phrase
router.post('/frase', (req, res) => {
    const { Frase, Autor } = req.body;
    
    // Validate that both "Frase" and "Autor" fields are provided
    if (Frase && Autor) {
        const id = fraseDelDia.length + 1; // Generate a new ID based on array length
        const newFrase = { ...req.body, id }; // Create a new phrase object
        console.log(newFrase);
        fraseDelDia.push(newFrase); // Add the new phrase to the array
        res.status(201).json(newFrase); // Send the newly created phrase as the response with 201 Created
    } else {
        res.status(400).json({ error: 'Both "Frase" and "Autor" fields are required.' }); // 400 Bad Request
    }
});

// PUT route to update an existing phrase by ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { Frase, Autor } = req.body; // Destructure new data from request body
    
    // Find the index of the phrase by ID
    const index = _.findIndex(fraseDelDia, frase => frase.id == id);
    
    // Check if the phrase exists
    if (index !== -1) {
        // Update the phrase with the new data
        if (Frase) fraseDelDia[index].Frase = Frase; // Update Frase if provided
        if (Autor) fraseDelDia[index].Autor = Autor; // Update Autor if provided
        res.json(fraseDelDia[index]); // Send the updated phrase as the response
    } else {
        res.status(404).json({ error: 'Phrase not found.' }); // Send a 404 Not Found response
    }
});

// DELETE route to delete an existing phrase by ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = _.findIndex(fraseDelDia, frase => frase.id == id); // Find the index of the phrase by ID
    
    if (index !== -1) {
        fraseDelDia.splice(index, 1); // Remove the phrase from the array
        res.status(204).send(); // Respond with 204 No Content (successful deletion, no content to send back)
    } else {
        res.status(404).json({ error: 'Phrase not found.' }); // Send a 404 Not Found response
    }
});
module.exports = router;
