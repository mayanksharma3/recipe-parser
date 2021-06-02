import express from 'express';
import exphbs from "express-handlebars";
import cors from "cors";
import {extractRecipe} from "./utils/recipe";
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(express.static("views"))

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    extname: '.handlebars'
}));

app.set('view engine', 'handlebars');

app.post('/', async (req, res) => {

});

app.get('/', async (req, res) => {
    if(req.query.q) {
        let recipeElement = await extractRecipe(req.query.q as string);
        if (recipeElement) {
            if (req.get('Content-Type') === "application/json") {
                res.json(recipeElement)
            } else {
                res.render('recipe', {recipe: recipeElement});
            }
        } else {
            if (req.get('Content-Type') === "application/json") {
                res.status(404).send("Recipe not found")
            } else {
                res.render('error');
            }
        }
    } else {
        res.render('home');
    }
});

app.listen(process.env.PORT || 4000, () => {
    console.log("Started Server")
})

module.exports = app;
