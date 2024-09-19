const express = require('express');  
const bodyParser = require('body-parser');  
const cors = require('cors');  

const app = express();  
const port = 3000;  

app.use(cors());  
app.use(bodyParser.json());  

// In-memory storage for class data  
const classData = {};  

// Endpoint to receive class data  
app.post('/attendance', (req, res) => {  
    const { classNumber, expected, actual, reasons } = req.body;  
    classData[classNumber] = { expected, actual, reasons };  
    res.status(200).send({ message: 'Data received' });  
});  

// Endpoint to get all class data  
app.get('/attendance', (req, res) => {  
    const data = Object.keys(classData).map(classNumber => ({  
        classNumber,  
        ...classData[classNumber]  
    }));  
    res.status(200).json(data);  
});  

app.listen(port, () => {  
    console.log(`Server running at http://localhost:${port}`);  
});