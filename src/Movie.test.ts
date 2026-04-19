import { Movie } from './Movie';

describe('Movie class', () => {
  const validProps = {
    russianTitle: 'Мстители',
    englishTitle: 'The Avengers',
    imax: true,
    year: 2012,
    country: 'США',
    slogan: 'Avengers Assemble!',
    genres: ['фантастика', 'боевик'],
    durationMinutes: 137,
    price: 350,
    keyword: 'время',
  };

  let movie: Movie;

  beforeEach(() => {
    movie = new Movie(validProps);
  });

  test('constructor sets properties correctly', () => {
    expect(movie.russianTitle).toBe('Мстители');
    expect(movie.englishTitle).toBe('The Avengers');
    expect(movie.imax).toBe(true);
    expect(movie.year).toBe(2012);
    expect(movie.country).toBe('США');
    expect(movie.slogan).toBe('Avengers Assemble!');
    expect(movie.genres).toEqual(['фантастика', 'боевик']);
    expect(movie.durationMinutes).toBe(137);
    expect(movie.price).toBe(350);
    expect(movie.keyword).toBe('время');
  });

  test('getFormattedDuration returns correct format', () => {
    expect(movie.getFormattedDuration()).toBe('2:17');
    const shortMovie = new Movie({ ...validProps, durationMinutes: 45 });
    expect(shortMovie.getFormattedDuration()).toBe('0:45');
  });

  test('getFullInfo returns correctly formatted string', () => {
    const info = movie.getFullInfo();
    expect(info).toContain('IMAX «Мстители» / The Avengers');
    expect(info).toContain('Год: 2012 | Страна: США');
    expect(info).toContain('Слоган: Avengers Assemble!');
    expect(info).toContain('Жанр: фантастика, боевик');
    expect(info).toContain('Длительность: 137 мин. (2:17)');
    expect(info).toContain('Ключевое слово: время');
    expect(info).toContain('Цена: 350 ₽');
  });

  test('getFullInfo works without keyword', () => {
    const noKeyword = new Movie({ ...validProps, keyword: undefined });
    const info = noKeyword.getFullInfo();
    expect(info).not.toContain('Ключевое слово');
    expect(info).toContain('«Мстители» / The Avengers');
  });

  test('genres getter returns a copy', () => {
    const genres = movie.genres;
    genres.push('триллер');
    expect(movie.genres).toEqual(['фантастика', 'боевик']);
  });

  test('getFullInfo works correctly when IMAX is false', () => {
    const noImaxMovie = new Movie({ ...validProps, imax: false });
    const info = noImaxMovie.getFullInfo();
    expect(info).not.toContain('IMAX');
    expect(info).toContain('«Мстители» / The Avengers');
  });
});
