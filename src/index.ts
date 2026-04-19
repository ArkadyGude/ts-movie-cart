import { Movie } from './Movie';
import { Cart } from './Cart';

const avengers = new Movie({
  russianTitle: 'Мстители',
  englishTitle: 'The Avengers',
  imax: true,
  year: 2012,
  country: 'США',
  slogan: 'Avengers Assemble!',
  genres: ['фантастика', 'боевик', 'фэнтези', 'приключения'],
  durationMinutes: 137,
  price: 350,
  keyword: 'время'
});

const cart = new Cart();
cart.addItem(avengers);

console.log(cart.getTotal());
console.log(avengers.getFullInfo());
