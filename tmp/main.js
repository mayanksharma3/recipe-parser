"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const cors_1 = __importDefault(require("cors"));
const recipe_1 = require("./utils/recipe");
const bodyParser = require('body-parser');
const app = express_1.default();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors_1.default());
app.use(express_1.default.static("views"));
app.engine('handlebars', express_handlebars_1.default({
    defaultLayout: 'main',
    extname: '.handlebars'
}));
app.set('view engine', 'handlebars');
app.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.query.q) {
        let recipeElement = yield recipe_1.extractRecipe(req.query.q);
        if (recipeElement) {
            if (req.get('Content-Type') === "application/json") {
                res.json(recipeElement);
            }
            else {
                res.render('recipe', { recipe: recipeElement });
            }
        }
        else {
            if (req.get('Content-Type') === "application/json") {
                res.status(404).send("Recipe not found");
            }
            else {
                res.render('error');
            }
        }
    }
    else {
        res.render('home');
    }
}));
app.listen(process.env.PORT || 4000, () => {
    console.log("Started Server");
});
module.exports = app;
