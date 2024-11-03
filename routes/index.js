const { Router } = require('express');
const router = Router();
// Ruta de prueba
router.get('/test', (req, res) => {
    const data = {
        "message": "Hello, the test has been successful"
    };
    res.json(data);
});


module.exports = router;