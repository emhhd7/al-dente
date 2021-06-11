"use strict"

let foodData = {}

// Returns a URL based on the user's choices
let generateURL = function () {
    const apiKey = '9ef2dac2980d4763a3c8b11385e8e7fc'

    // Checks for checked boxes with FILTER
    const isChecked = function (input) {
        return input.checked === true
    }
    // Grabs the NAME value from checkedInputs with MAP
    const getItems = function (input) {
        return input.name
    }
    // Converts DOM information to an ARRAY to a STRING
    const inputs = Object.values(document.querySelectorAll("input"))
    let checkedInputs = inputs.filter(isChecked)
    let stringResults = checkedInputs.map(getItems)

    if (stringResults == 'vegetarian') {

        return `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=100&fillIngredients=true&diet=${stringResults}`
    } else {
        return `https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${stringResults.join()}&apiKey=${apiKey}&number=100&fillIngredients=true`
    }

    // Adds the string to the URL via TEMPLATE STRING
    // Uses JOIN to turn the array into string data

}

// Creates paragraphs and prints TITLE + IMAGE SRC from data; Adds clickability
let createParagrahs = function (data) {
    const resultsSection = document.querySelector('#resultsSection')
    resultsSection.innerText = ''

    let randomizeData = shuffleArray(data.results)

    randomizeData.forEach(function (recipe) {
        // Creates elements + div FOR EACH item
        const divCard = document.createElement('div')
        const recipeText = document.createElement('h3')
        const recipeImage = document.createElement('img')
        const ingredientsList = document.createElement('ul')
        divCard.className = "cards"

        foodData[recipe.title] = recipe

        // Changes the text values of created elements
        recipeImage.src = recipe.image
        recipeText.innerText = recipe.title

        divCard.append(recipeImage)
        divCard.append(recipeText)

        let number = 1


        const noneButton = document.createElement('button')
        noneButton.addEventListener('click', function () {
            number = 1
        })
        noneButton.innerHTML = 'Original'
        noneButton.value = 1
        divCard.append(noneButton)

        const doubleButton = document.createElement('button')
        doubleButton.addEventListener('click', function () {
            number = 2
        })
        doubleButton.innerHTML = 'Double'
        doubleButton.value = 2
        divCard.append(doubleButton)

        const tripleButton = document.createElement('button')
        tripleButton.addEventListener('click', function () {
            number = 3
        })
        tripleButton.innerHTML = 'Triple'
        tripleButton.value = 3
        divCard.append(tripleButton)


        // recipeIngredients is an object.
        // Goes through EACH individual ingredient and create a LIST
        resultsSection.append(divCard)

        // When user clicks a recipe, drops down an ingredients list. 
        divCard.addEventListener('click', function () {
            let definedIngredients = generateIngredients(recipe.title, number)
            ingredientsList.innerText = ''
            definedIngredients.forEach(function (individualItem) {
                const recipeIngredients = document.createElement('li')
                recipeIngredients.innerText = `${individualItem.amount} ${individualItem.unit} ${individualItem.name}`
                ingredientsList.append(recipeIngredients)
            })
        })
        divCard.append(ingredientsList)
    })
}

// Grabs the amount, unit and name OBJECT
let generateIngredients = function (foodName, multiplier) {
    // FoodName is the full name of the item (above ^)
    let missedArray = foodData[foodName].missedIngredients
    let usedArray = foodData[foodName].usedIngredients
    // Combines the ingredient arrays
    let combinedArray = usedArray.concat(missedArray)

    // Maps through EACH array item and searches for the NAME, AMOUNT and UNIT
    let getArrayItems = combinedArray.map(function (ingredient) {
        return {
            name: ingredient.name,
            amount: ingredient.amount * multiplier,
            unit: ingredient.unit
        }
    })
    // Returns this object for use
    return getArrayItems
}

// Fetches API data; The URL is grabbed from generateURL
let fetchData = function (url) {
    console.log(url)
    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            createParagrahs(data)
        })
        .catch(function (error) {
            console.error("ERROR: ", error)
            alert('The apiKey broke again.')
            return error
        })
}

// Randomize arrays for random results
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return (array)
}

// Button Click --> Information is generated inside of the CONSOLE via FETCH --> .then (2)
const submitButton = document.querySelector('#submission')
submitButton.addEventListener('click', function () {
    fetchData(generateURL())
})
