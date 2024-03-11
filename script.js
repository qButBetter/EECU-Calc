// UTILS.JS
let utils = {}; //create a namespace for our utility functions

//get function to make an HTTP GET request
utils.get = (url) => {

    //start promise object
    return new Promise(function (resolve, reject) {

        //create a new XMLHttpRequest object
        let request = new XMLHttpRequest();

        //initialize the request
        request.open('GET', url);

        request.onload = function () {
            //resolve on success
            if (request.status == 200) { // HTTP: OK
                console.log('Response OK');
                resolve(request.response);
            }
            //reject on error
            else {
                reject(Error(`promise error with ${request.status}`))
            }
        };
        //handle network errors
        request.onerror = function (error) {
            reject(Error(`Network Error with ${url}: ${error}`))
        };
        //send the request
        request.send();
    }); //end Promise Object
}

//getJSON function to get JSON data from the server
utils.getJSON = async function (url) {
    let string = null;
    //get the JSON string from the server
    try {
        string = await utils.get(url);
    }
    catch (error) {
        console.log(error)
    }
    //parse the JSON string and return the data
    let data = JSON.parse(string);
    return data;
}

async function init() {
    //get the root element of the web page
    let root = document.querySelector('#root');

    //create a variable to hold the URL of the JSON data source
    let url = 'https://api-demo.cartwebapp.com/data/2024';

    //create a variable to hold the JSON data
    let occupations = null;

    //try to retrieve the JSON data from the server
    try {
        //retrieve the JSON data from the server
        occupations = await utils.getJSON(url);
    }
    //catch any errors and display them in the root element
    catch (error) {
        root.style.color = 'red';
        root.textContent = `error: ${error}`;
    }

    //show JSON data on the html page
    root.innerHTML = buildList(occupations);
    eventAdd();
}


function eventAdd() {
    let jobs = document.getElementsByClassName("jobItem");

    for (let i = 0; i < jobs.length; i++) {
        // Adds event listener to be allowed to grab the salary
        jobs[i].addEventListener("click", function () {
            document.getElementById("gross-income").value = this.dataset.salary;
        });
    }

}

function buildList(jobs) {
    //create an empty string to hold the HTML
    let html = '';

    //loop through the array of job objects retrieved from the JSON data
    for (let job of jobs) {

        //start an HTML section for each job
        html += `<section class="jobItem" data-salary="${job.salary}">`;

        /* An alternative way of looping through each item in the data, not as useful for this assignment but something to keep in mind for a story? ... */
        //loop through each entry and create a div for each key:value pair
        // for (let key in job) {
        //     html += `<div><strong>${key}</strong>: ${job[key]}</div > `;
        // }

        //create a div element for the job title
        html += `<div><strong>Occupation</strong>: ${job.occupation}</div>`;
        //create a div element for the salary and format it as currency
        html += `<div"><strong>Salary</strong>: $${job.salary.toLocaleString('en-US')}</div>`;
        //close the section
        html += '</section>';
    }

    //return the completed html
    return html;
}
//initialize the web page when the DOM is ready
document.addEventListener('DOMContentLoaded', init);

// SCRIPT.JS
document.addEventListener("DOMContentLoaded", function () {

    let vars = {
        income: 0,
        saving: 0,
        expenses: 0,
        wants: 0,
    };

    var incomeSum = 0;
    var savingSum = 0;
    var wantsSum = 0;
    var expenseSum = 0;

    var netIncome = 0;

    // Computes $ for input-form1
    document.getElementById("input-form1").addEventListener('submit', function (input) {
        input.preventDefault();

        var inputArray = [];

        var annualIncome = parseFloat(document.getElementById("gross-income").value);
        inputArray.push(parseFloat(annualIncome));

        var otherIncome = parseFloat(document.getElementById("other").value);
        inputArray.push(parseFloat(otherIncome));

        var annualGifts = parseFloat(document.getElementById("annual-gifts").value);
        inputArray.push(parseFloat(annualGifts));

        var annualRefund = parseFloat(document.getElementById("tax-refund").value);
        inputArray.push(parseFloat(annualRefund));

        // Iterates thru made up array
        incomeSum = 0;
        for (i = 0; i < inputArray.length; i++) {
            if (!isNaN(inputArray[i])) {
                console.log(inputArray[i]);
                incomeSum += inputArray[i];
            }
        }

        // Sets object property to the sum
        vars.income = incomeSum;
        console.log("INCOME SUM: " + vars.income);

    });

    document.getElementById("input-form2").addEventListener('submit', function (input) {
        input.preventDefault();

        var inputArray = [];

        var emergencyFund = parseFloat(document.getElementById("emergency-fund").value);
        inputArray.push(parseFloat(emergencyFund));

        var investmentsFund = parseFloat(document.getElementById("investments").value);
        inputArray.push(parseFloat(investmentsFund));

        var retirementFund = parseFloat(document.getElementById("retirement-fund").value);
        inputArray.push(parseFloat(retirementFund));

        // Iterates thru made up array
        savingSum = 0;
        for (i = 0; i < inputArray.length; i++) {
            if (!isNaN(inputArray[i])) {
                console.log(inputArray[i]);
                savingSum += inputArray[i];
            }
        }

        // Sets object property to the sum
        vars.saving = savingSum;
        console.log("SAVING SUM: " + vars.saving);

    });

    document.getElementById("input-form3").addEventListener('submit', function (input) {
        input.preventDefault();

        var inputArray = [];

        var tuitionFund = parseFloat(document.getElementById("tuitions").value);
        inputArray.push(parseFloat(tuitionFund));

        var vacationFund = parseFloat(document.getElementById("vacations").value);
        inputArray.push(parseFloat(vacationFund));

        var usingMoney = parseFloat(document.getElementById("using-money").value);
        inputArray.push(parseFloat(usingMoney));

        // Iterates thru made up array
        wantsSum = 0;
        for (i = 0; i < inputArray.length; i++) {
            if (!isNaN(inputArray[i])) {
                console.log(inputArray[i]);
                wantsSum += inputArray[i];
            }
        }

        // Sets object property to the sum
        vars.wants = wantsSum;
        console.log("WANTS SUM: " + vars.wants);

    });

    document.getElementById("input-form4").addEventListener('submit', function (input) {
        input.preventDefault();

        var inputArray = [];

        var groceriesFund = parseFloat(document.getElementById("groceries").value);
        inputArray.push(parseFloat(groceriesFund));

        var clothingFund = parseFloat(document.getElementById("clothing").value);
        inputArray.push(parseFloat(clothingFund));

        var householdFund = parseFloat(document.getElementById("household").value);
        inputArray.push(parseFloat(householdFund));

        var loansFund = parseFloat(document.getElementById("loans").value);
        inputArray.push(parseFloat(loansFund));

        var transportationFund = parseFloat(document.getElementById("transportation").value);
        inputArray.push(parseFloat(transportationFund));

        var childSupportFund = parseFloat(document.getElementById("child-support").value);
        inputArray.push(parseFloat(childSupportFund));

        var healthFund = parseFloat(document.getElementById("health").value);
        inputArray.push(parseFloat(healthFund));

        // Iterates thru made up array
        expenseSum = 0;
        for (i = 0; i < inputArray.length; i++) {
            if (!isNaN(inputArray[i])) {
                console.log(inputArray[i]);
                expenseSum += inputArray[i];
            }
        }

        // Sets object property to the sum
        vars.expenses = expenseSum;
        console.log("EXPENSES SUM: " + vars.expenses);

        netIncome = Math.floor(parseFloat((vars.income / 12) * 0.67));

        // Computes everything at the end & displays it
        numDisplay();
    });

    function numDisplay() {
        let incomeElement = document.getElementById("be4-num");
        incomeElement.innerText = "~ $" + Math.floor(parseFloat((vars.income / 12)));

        let netElement = document.getElementById("net-income");
        netElement.innerText = "~ $" + netIncome;

        let taxElement = document.getElementById("fed-tax");
        taxElement.innerText = "~ -$" + Math.floor(parseFloat(((vars.income / 12) * .12)));

        let stateElement = document.getElementById("state-tax");
        stateElement.innerText = "~ -$" + Math.floor(parseFloat(((vars.income / 12) * .07)));

        let socialElement = document.getElementById("social-num");
        socialElement.innerText = "~ $" + Math.floor(parseFloat(((vars.income / 12) * .062)));

        let medicareElement = document.getElementById("medicare-num");
        medicareElement.innerText = "~ -$" + Math.floor(parseFloat(((vars.income / 12) * .0145)));

        let disabilityElement = document.getElementById("disability-num");
        disabilityElement.innerText = "~ -$" + Math.floor(parseFloat(((vars.income / 12) * .01)));

        let expenseElement = document.getElementById("total-expenses");
        expenseElement.innerText = "~ -$" + Math.floor(parseFloat((vars.saving + vars.expenses + vars.wants) + (((vars.income / 12) * 0.2765) + 180)));

        let differenceElement = document.getElementById("diff-num");
        differenceElement.innerText = "~ $" + Math.floor(parseFloat(((vars.income / 12)) - ((vars.saving + vars.expenses + vars.wants) + ((vars.income / 12) * .2765) + 180)));

        // Adds to pie chart
        addData(pieChart_1, "Federal Taxes", parseInt(((vars.income / 12) * .12)));
        addData(pieChart_1, "State Taxes", parseInt(((vars.income / 12) * .07)));
        addData(pieChart_1, "Medicare", parseInt(((vars.income / 12) * .0145)));
        addData(pieChart_1, "State Disability", parseInt(((vars.income / 12) * .01)));
        addData(pieChart_1, "Medical Insurance", 180);
        addData(pieChart_1, "Inputted Deductions", parseInt((vars.saving + vars.expenses + vars.wants)));
    }
});

// Make parameters to hide current page and show next page
function hide1() {
    document.getElementById("form1").style.display = "none";
    document.getElementById("form2").style.display = "flex";
}
function hide2() {
    document.getElementById("form2").style.display = "none";
    document.getElementById("form3").style.display = "flex";
}
function hide3() {
    document.getElementById("form3").style.display = "none";
    document.getElementById("form4").style.display = "flex";
}

// PIE.JS
// function addData(chart, label, newData) {
//     chart.data.labels.push(label);
//     chart.data.datasets.forEach((dataset) => {
//         dataset.data.push(newData);
//     });
//     chart.update();
// }

// document.addEventListener("DOMContentLoaded", () => {
//     init();

//     const ctx = document.getElementById('pieChart_1');

//     new Chart(ctx, {
//         type: 'doughnut',
//         data: {
//             labels: ['Savings', 'Wants', 'Expenses', 'Taxes', 'State Deductions', 'Medical Insurance'],
//             datasets: [{
//                 label: 'All Expenses',
//                 data: [10, 19, 3, 5, 2, 3],
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             plugins: {
//                 customCanvasBackgroundColor: {
//                     color: "red",
//                 },

//                 legend: {
//                     labels: {
//                         font: {
//                             size: 12,
//                         }
//                     }
//                 },
//             },
//         }
//     });

// });