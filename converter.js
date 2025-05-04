const quantities = [
    {name: ['Length', 'Volume', 'Mass', 'Speed', 'Time']},
    {
        innerName: [
            ['Meter', 'Centimetre', 'Millimetre', 'Kilometer', 'Mile', 'Foot', 'Inch'],
            ['Liter', 'Milliliter', 'Cubic Meter', 'Cubic Foot', 'Cubic Inch'],
            ['Gram', 'Kilogram', 'Milligram', 'Tonne', 'Pound', 'Ounce'],
            ['Mile per hour', 'Foot per second', 'Metre per second', 'Kilometre per hour'],
            ['Second', 'Millisecond', 'Minute', 'Hour', 'Day', 'Week', 'Month']
        ]
    },
    {
        calcValue: [
            [1, 100, 1000, 0.001, 0.000621371, 3.28084, 39.3701],
            [1, 1000, 0.001, 0.0353147, 61.0237],
            [1, 0.001, 1000, 0.000001, 0.00220462, 0.035274],
            [2.23694, 3.28084, 1, 3.6],
            [1, 1000, 0.0166667, 0.000277778, 0.000011574, 0.0000016534, 0.00000038052]
        ]
    }
]

// Formula : Divide 2nd Number to the 1st and Then , Multiply to Value


// Variables
let selectQuantity = document.querySelector('#select-qntt')
let selectFrom = document.querySelector('#from-select')
let selectTo = document.querySelector('#to-select')
let calculateBtn = document.querySelector('.btn')
let inputValue = document.querySelector('.input-value')
let resultFrom = document.querySelector('.result-from')
let resultTo = document.querySelector('.result-to')
let selectedQuantity

// EventListeners
selectQuantity.addEventListener('change', qnttSelection)
calculateBtn.addEventListener('click', calculateFunc)


// Functions
function qnttSelection(event) {

    // find index of quantity in order to show its inner names
    let findIndexOfItem = quantities[0].name.findIndex(function (item) {
        return item === event.target.value
    })
    selectedQuantity = findIndexOfItem

    // Clear Each selection before changing value
    selectFrom.innerHTML = '<option value="none" selected disabled>From</option>'
    selectTo.innerHTML = '<option value="none" selected disabled>To</option>'

    // add new values to select
    quantities[1].innerName[findIndexOfItem].forEach(function (item) {
        let optionMaker = `<option value='${item}'>${item}</option>`
        selectFrom.insertAdjacentHTML('beforeend', optionMaker)
        selectTo.insertAdjacentHTML('beforeend', optionMaker)
    })
}

function calculateFunc() {
    // Checks if all Selections and Value Have Been Chosen or filled
    if (selectQuantity.value === 'none' || selectFrom.value === 'none'
        || selectTo.value === 'none' || inputValue.value.length === 0 || inputValue.value < 0) {
        alert('Select all options and fill the value input. value can`t be lower than 0')
    } else {

        // find index of From-Quantity in order to Calculate
        let findIndexOfFrom = quantities[1].innerName[selectedQuantity].findIndex(function (item) {
            return item === selectFrom.value
        })

        // find index of To-Quantity in order to Calculate
        let findIndexOfTo = quantities[1].innerName[selectedQuantity].findIndex(function (item) {
            return item === selectTo.value
        })

        // By using the Formula above the file , Calculate the result
        let firstCalcValue = quantities[2].calcValue[selectedQuantity][findIndexOfFrom]
        let secondCalcValue = quantities[2].calcValue[selectedQuantity][findIndexOfTo]

        // Calculate the result and fix it to 5 fractionDigits
        let result = (secondCalcValue/firstCalcValue) * inputValue.value
        document.querySelector('.result').style.visibility = 'visible'
        resultFrom.innerHTML = `${inputValue.value} ${selectFrom.value}s`
        resultTo.innerHTML = `${Number(result.toFixed(5))} ${selectTo.value}s`
    }
}