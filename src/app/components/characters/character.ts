export class Character {
  private _char_id!: number;
  private _name!: string;
  private _birthday!: string;
  private _occupation!: string[];
  private _img!: string;
  private _status!: string;
  private _nickname!: string;
  private _appearance!: string[];
  private _portrayed!: string;
  private _category!: string[];
  private _better_call_saul_appearance!: string[];
  private _loaded!: boolean;
  private _death!: DeathInfo;
  private _kills!: KillInfo;
  private _quotes!: Quote[];

  get char_id(): number {
    return this._char_id;
  }

  get name(): string {
    return this._name;
  }

  get birthday(): string {
    return this._birthday;
  }

  get occupation(): string[] {
    return this._occupation;
  }

  get img(): string {
    return this._img;
  }

  get status(): string {
    return this._status;
  }

  get nickname(): string {
    return this._nickname;
  }

  get appearance(): string[] {
    return this._appearance;
  }

  get portrayed(): string {
    return this._portrayed;
  }

  get category(): string[] {
    return this._category;
  }

  get better_call_saul_appearance(): string[] {
    return this._better_call_saul_appearance;
  }

  get loaded(): boolean {
    return this._loaded;
  }

  get death(): DeathInfo {
    return this._death;
  }

  get kills(): KillInfo {
    return this._kills;
  }

  get quotes(): Quote[] {
    return this._quotes;
  }


  set char_id(value: number) {
    this._char_id = value;
  }

  set name(value: string) {
    this._name = value;
  }

  set birthday(value: string) {
    this._birthday = value;
  }

  set occupation(value: string[]) {
    this._occupation = value;
  }

  set img(value: string) {
    this._img = value;
  }

  set status(value: string) {
    this._status = value;
  }

  set nickname(value: string) {
    this._nickname = value;
  }

  set appearance(value: string[]) {
    this._appearance = value;
  }

  set portrayed(value: string) {
    this._portrayed = value;
  }

  set category(value: string[]) {
    this._category = value;
  }

  set better_call_saul_appearance(value: string[]) {
    this._better_call_saul_appearance = value;
  }

  set loaded(value: boolean) {
    this._loaded = value;
  }

  set death(value: DeathInfo) {
    this._death = value;
  }

  set kills(value: KillInfo) {
    this._kills = value;
  }

  set quotes(value: Quote[]) {
    this._quotes = value;
  }
}

export interface DeathInfo {
  cause: string;
  responsible: string
  last_words: string;
  season: number;
  episode: number;
  number_of_deaths: number;
}

export interface KillInfo {
  deathCount: number;
}


export interface Quote {
  quote: string;
}
