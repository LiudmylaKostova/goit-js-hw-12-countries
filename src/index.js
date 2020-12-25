import './styles.css';
import fetchCountries from './js/fetch-countries';
import country from './templates/country.hbs';
import countries from './templates/countries.hbs';
import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import debounce from 'lodash.debounce';


const refs = {
    searchCountry: document.querySelector('.search-country'),
    listCountries: document.querySelector('.list-countries'),
    cards: document.querySelector('.cards'),
};

function markupCountry(data) {
    clearArea();
     if (data.length === 1) {
    const markup = country(data);
    refs.cards.insertAdjacentHTML('afterbegin', markup);
  }        
  if (data.length > 1 && data.length <= 10) {
    const markup = countries(data);
    refs.listCountries.insertAdjacentHTML('afterbegin', markup);
  }
    if (data.length > 10) {
    console.log('Too many');
      error('Too many matches found. Please enter a more specific query!');    
  } 
 }

function clearArea() {
  refs.cards.innerHTML = '';
  refs.listCountries.innerHTML = '';
}

let countryName = '';
refs.searchCountry.addEventListener(
  'input',
  debounce(() => {
    countryName = refs.searchCountry.value;
    if (countryName !== '') {
      fetchCountries(countryName).then(markupCountry);
    }
  }, 500),
);

