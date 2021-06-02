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
exports.extractRecipe = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const web_auto_extractor_1 = __importDefault(require("web-auto-extractor"));
function extractRecipe(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const html = yield node_fetch_1.default(url).then(x => x.text());
            const parsed = web_auto_extractor_1.default().parse(html);
            const result = search(parsed, (key, value) => {
                return key === "@type" && value === "Recipe";
            });
            let recipeElement = result[0];
            recipeElement.image = recipeElement.image.url ? recipeElement.image.url : (typeof (recipeElement.image) == "object" ? recipeElement.image[0] : recipeElement.image);
            let mainInstructions = search(parsed, (key, value) => {
                return key === "@type" && value === "HowToStep";
            }).map(x => x.text ? x.text : x);
            recipeElement.recipeInstructions = mainInstructions.length > 0 ? mainInstructions : recipeElement.recipeInstructions.map(x => x.text ? x.text : x);
            recipeElement.recipeIngredient = recipeElement.ingredients || recipeElement.recipeIngredient;
            const recipe = {
                cookTime: recipeElement.cookTime,
                description: recipeElement.description,
                image: recipeElement.image,
                name: recipeElement.name,
                prepTime: recipeElement.prepTime,
                recipeCuisine: typeof (recipeElement.recipeCuisine) == "object" ? recipeElement.recipeCuisine[0] : recipeElement.recipeCuisine,
                recipeIngredient: recipeElement.recipeIngredient,
                recipeInstructions: recipeElement.recipeInstructions,
                recipeYield: typeof (recipeElement.recipeYield) == "object" ? recipeElement.recipeYield[0] : recipeElement.recipeYield,
                url: url
            };
            return recipe;
        }
        catch (e) {
            return null;
        }
    });
}
exports.extractRecipe = extractRecipe;
function search(obj, predicate) {
    let result = [];
    for (let p in obj) {
        if (typeof (obj[p]) == 'object') {
            result = result.concat(search(obj[p], predicate));
        }
        else if (predicate(p, obj[p]))
            result.push(obj);
    }
    return result;
}
