export class AppUser{
  constructor(
    public name: string,
    public id: string,
    public role: string,
    public _token: string,
    private _tokenExpirationDate: Date,
  ){}

  get token(){
    console.log(this._tokenExpirationDate);
    console.log(new Date(this._tokenExpirationDate));
    if(!this._tokenExpirationDate || new Date()>new Date(this._tokenExpirationDate)){
      console.log('expire');
      return null;
    }
    console.log('not expire');
    return this._token;
  }
}
