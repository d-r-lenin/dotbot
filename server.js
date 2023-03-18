const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' , time: new Date(), status: 200});
});


module.exports = {
    run: ()=>{
        app.listen(process.env.PORT || 3001, () => {
            console.log('Listening on port '+ (process.env.PORT || 3001));
        });
    }
}