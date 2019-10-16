const express = require('express')
const addRouter = express.Router()
const jsonParser = express.json()
const AllRecipeService = require('../services/all-recipe-service')

addRouter
    .route('/add')
    .post(jsonParser, (req, res, next) => {
        const { title, minutes, ingredient, instructions } = req.body
        const newRecipe = { title, minutes, instructions}
        console.log(newRecipe)

        AllRecipeService.inserNewRecipe(req.app.get('db'), newRecipe)
            .then(recipe => {
                console.log(recipe)
                const recipe_id = recipe[0].id
                let ingredientArray = ingredient.split(',')

                ingredientArray = ingredientArray.map(ingredient => {
                    return {
                        name: ingredient.trim(),
                        recipe_id: recipe_id
                    }
                })
                console.log(ingredientArray)

               AllRecipeService.inserNewIngredients(req.app.get('db'), ingredientArray, next)

                return {...recipe, ...ingredientArray}
            })
            .then(result => res.json(result))


        
    })

module.exports = addRouter