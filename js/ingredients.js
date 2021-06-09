"use strict"
// Wednesday Goals 
// 1. With the data, append a paragraph for each item.
// 2. Grab innerText to equal food name value
// 3. Get images to print above the text
// 4. Make a Pull Request !!!
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

// Returns a URL based on the user's choices
let generateURL = function () {
    const apiKey = '1ecbb5b3db9148858c8180143e866ba8'

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

    // Adds the string to the URL via TEMPLATE STRING
    // Uses JOIN to turn the array into string data
    return `https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${stringResults.join()}&apiKey=${apiKey}`
}

// Creates paragraphs and prints TITLE + IMAGE SRC from data
let createParagrahs = function (data) {
    const resultsSection = document.querySelector('#resultsSection')
    resultsSection.innerText = ''

    data.results.forEach(function (recipe) {
        const recipeText = document.createElement('p')
        const recipeImage = document.createElement('img')
        recipeImage.src = recipe.image
        recipeText.innerText = recipe.title

        resultsSection.append(recipeImage)
        resultsSection.append(recipeText)
    })
}

// Fetches API data; The URL is grabbed from generateURL
let fetchData = function (url) {
    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            createParagrahs(data)
        })
        .catch(function (error) {
            console.error("ERROR: ", error)
            return error
        })
}

// Button Click --> Information is generated inside of the CONSOLE via FETCH --> .then (2)
const submitButton = document.querySelector('#submission')
submitButton.addEventListener('click', function () {
    fetchData(generateURL())
})


// JS:PROG (POGGERS!!!)

// 1. Create checkboxes in HTML
// 2. Make sure the checkboxes are selectable
// 3. Create a Submit Button
// 4. Use FILTER to check through each input with isChecked
// 5. Use MAP to loop through each value and print checked NAME values
// 6. Use JOIN to turn an array into string data
// 7. Apply stringResults to URL using a template string
// 8. Created a Fetch and a Promise to gather food data

// Completed code-cleaning and wrote comments for Monday and Tuesday's progress. //

// 7. Create p elements for each item
// 8. Grab innerText to equal food name value
// 9. Get images to print above the text
// 10. Make a Pull Request !!!