"use strict";


const inputDay = document.getElementById('input-day');
const inputMonth = document.getElementById('input-month');
const inputYears = document.getElementById('input-years');
const viewerDate = document.querySelector('.submit');

const ValueDay = document.getElementById('date-value-days');
const ValueMonth = document.getElementById('date-value-months');
const ValueYears = document.getElementById('date-value-years');
const spanErrorEmptyField = document.querySelectorAll('.alert-erro-empty-field');
const spanErrorDate = document.querySelectorAll('.alert-erro-date');


const labels = document.querySelectorAll('label');
const inputs = document.querySelectorAll('input');


function calcDate() {

    const inputDate = new Date(`${inputYears.value}-${inputMonth.value}-${inputDay.value}`);
    const today = new Date();

    const diffTime = Math.abs(today.getTime() - inputDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));


    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    const days = (diffDays % 365) % 30;

    ValueYears.textContent = years;
    ValueMonth.textContent = months;
    ValueDay.textContent = days;

}

function addClassErro() {
    for (let i = 0; i < labels.length; i++) labels[i].classList.add('erro');

    for (let j = 0; j < inputs.length; j++) inputs[j].classList.add('input-erro');
}

function exibirErro() {
    spanErrorEmptyField.forEach(spanErro => spanErro.style.display = 'block');
    addClassErro();
}

function limparErros() {
    for (let i = 0; i < labels.length; i++) labels[i].classList.remove('erro');

    for (let j = 0; j < inputs.length; j++) inputs[j].classList.remove('input-erro');

    spanErrorEmptyField.forEach(spanErro => spanErro.style.display = 'none');
}

const monthsWith30Days = [4, 6, 9, 11];

function validarData() {

    addClassErro();

    spanErrorDate.forEach((span, index) => {
        if (inputDay.value > 31 && index === 0) span.style.display = 'block';

        if (inputMonth.value > 12 && index === 1) span.style.display = 'block';

        if (inputYears.value > new Date().getFullYear() && index === 2) span.style.display = 'block';

        if (monthsWith30Days.includes(Number(inputMonth.value)) && inputDay.value > 30 && index === 0) span.style.display = 'block';

    });

}

inputs.forEach(input => {
    input.addEventListener('input', () => {
        const fieldName = input.name;
        const label = document.querySelector(`label[for="${fieldName}"]`);
        const spanError = input.nextElementSibling;
        const spanErrorDate = input.nextElementSibling.nextElementSibling;

        if (input.value !== '') {
            spanError.style.display = 'none';
            input.classList.remove('input-erro');
            label.classList.remove('erro');
        }

        if (input.value !== '') spanErrorDate.style.display = 'none';


    });
});

viewerDate.addEventListener('click', () => {

    if (inputDay.value === '' || inputMonth.value === '' || inputYears.value === '') exibirErro();

    else if (inputDay.value > 31 || inputMonth.value > 12 || inputYears.value > new Date().getFullYear() || (monthsWith30Days.includes(Number(inputMonth.value)) && inputDay.value > 30)) {
        validarData();

        ValueYears.textContent = '--';
        ValueMonth.textContent = '--';
        ValueDay.textContent = '--';

    }
    else {
        calcDate();
        limparErros();

        inputDay.value = '';
        inputMonth.value = '';
        inputYears.value = '';
        inputDay.focus();
    };

});

