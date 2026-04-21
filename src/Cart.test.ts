import { Cart } from './Cart';
import { Movie } from './Movie';
import { PurchasableItem } from './Cart';

class MockItem implements PurchasableItem {
  constructor(public price: number, public name: string) { }
  getFullInfo(): string {
    return `Mock: ${this.name}`;
  }
}

describe('Cart class', () => {
  let cart: Cart;
  let movie1: Movie;
  let movie2: Movie;

  beforeEach(() => {
    cart = new Cart();
    movie1 = new Movie({
      russianTitle: 'Фильм 1',
      englishTitle: 'Movie 1',
      imax: false,
      year: 2020,
      country: 'Россия',
      slogan: 'Slogan 1',
      genres: ['драма'],
      durationMinutes: 90,
      price: 100
    });
    movie2 = new Movie({
      russianTitle: 'Фильм 2',
      englishTitle: 'Movie 2',
      imax: true,
      year: 2021,
      country: 'США',
      slogan: 'Slogan 2',
      genres: ['комедия'],
      durationMinutes: 110,
      price: 200
    });
  });

  test('addItem increases item count and total price', () => {
    expect(cart.getCount()).toBe(0);
    cart.addItem(movie1);
    expect(cart.getCount()).toBe(1);
    expect(cart.getTotal()).toBe(100);
    cart.addItem(movie2);
    expect(cart.getCount()).toBe(2);
    expect(cart.getTotal()).toBe(300);
  });

  test('removeItem removes existing item', () => {
    cart.addItem(movie1);
    cart.addItem(movie2);
    cart.removeItem(movie1);
    expect(cart.getItems()).toHaveLength(1);
    expect(cart.getItems()[0]).toBe(movie2);
    expect(cart.getTotal()).toBe(200);
  });

  test('removeItem does nothing for non-existing item', () => {
    const nonExisting = new MockItem(999, 'ghost');
    cart.addItem(movie1);
    cart.removeItem(nonExisting);
    expect(cart.getCount()).toBe(1);
    expect(cart.getTotal()).toBe(100);
    expect(cart.getItems()).toEqual([movie1]);
  });

  test('clear removes all items', () => {
    cart.addItem(movie1);
    cart.addItem(movie2);
    cart.clear();
    expect(cart.getCount()).toBe(0);
    expect(cart.getTotal()).toBe(0);
    expect(cart.getItems()).toEqual([]);
  });

  test('getItems returns a readonly copy', () => {
    cart.addItem(movie1);
    const items = cart.getItems();
    expect(items).toEqual([movie1]);
    const mutableCopy = [...items];
    mutableCopy.pop();
    expect(cart.getCount()).toBe(1);
    expect(cart.getItems()).toEqual([movie1]);
  });

  test('works with any PurchasableItem', () => {
    const mock = new MockItem(50, 'book');
    cart.addItem(mock);
    expect(cart.getTotal()).toBe(50);
    expect(cart.getItems()[0]).toBe(mock);
  });
});
