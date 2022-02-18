const currencyOne = document.getElementById('currency-one');
const amountCurrencyOne = document.getElementById('amount-one');

const currencyTwo = document.getElementById('currency-two');
const amountCurrencyTwo = document.getElementById('amount-two');


const rateEl = document.getElementById('rateEl');
const swap = document.getElementById('swap');


// Fetch exchange rates and update the DOM
function calculate() {
    const currency_one = currencyOne.value;
    const currency_two = currencyTwo.value;

    fetch(`https://v6.exchangerate-api.com/v6/d8c9764a6055ab8feed6c9ad/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
        const rate = data.conversion_rates[currency_two];

        rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

        amountCurrencyTwo.value = (amountCurrencyOne.value * rate).toFixed(2);
    })
   
}


// Event listeners
currencyOne.addEventListener('change', calculate); // so when it changes we call the function calculate
amountCurrencyOne.addEventListener('input', calculate);
currencyTwo.addEventListener('change', calculate);
amountCurrencyTwo.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = temp;
    calculate();
})

calculate();