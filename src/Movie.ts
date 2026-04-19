export interface MovieProps {
  russianTitle: string;
  englishTitle: string;
  imax: boolean;
  year: number;
  country: string;
  slogan: string;
  genres: string[];
  durationMinutes: number;
  price: number;
  keyword?: string;
}

export class Movie {
  private readonly _russianTitle: string;
  private readonly _englishTitle: string;
  private readonly _imax: boolean;
  private readonly _year: number;
  private readonly _country: string;
  private readonly _slogan: string;
  private readonly _genres: string[];
  private readonly _durationMinutes: number;
  private readonly _price: number;
  private readonly _keyword?: string;

  constructor(props: MovieProps) {
    this._russianTitle = props.russianTitle;
    this._englishTitle = props.englishTitle;
    this._imax = props.imax;
    this._year = props.year;
    this._country = props.country;
    this._slogan = props.slogan;
    this._genres = [...props.genres];
    this._durationMinutes = props.durationMinutes;
    this._price = props.price;
    this._keyword = props.keyword;
  }

  get russianTitle(): string { return this._russianTitle; }
  get englishTitle(): string { return this._englishTitle; }
  get imax(): boolean { return this._imax; }
  get year(): number { return this._year; }
  get country(): string { return this._country; }
  get slogan(): string { return this._slogan; }
  get genres(): string[] { return [...this._genres]; }
  get durationMinutes(): number { return this._durationMinutes; }
  get price(): number { return this._price; }
  get keyword(): string | undefined { return this._keyword; }

  getFormattedDuration(): string {
    const hours = Math.floor(this._durationMinutes / 60);
    const minutes = this._durationMinutes % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  }

  getFullInfo(): string {
    const imaxStr = this._imax ? 'IMAX ' : '';
    const durationStr = this.getFormattedDuration();
    const genresStr = this._genres.join(', ');
    let info = `${imaxStr}«${this._russianTitle}» / ${this._englishTitle}\n`;
    info += `Год: ${this._year} | Страна: ${this._country}\n`;
    info += `Слоган: ${this._slogan}\n`;
    info += `Жанр: ${genresStr}\n`;
    info += `Длительность: ${this._durationMinutes} мин. (${durationStr})\n`;
    if (this._keyword) info += `Ключевое слово: ${this._keyword}\n`;
    info += `Цена: ${this._price} ₽`;
    return info;
  }
}
