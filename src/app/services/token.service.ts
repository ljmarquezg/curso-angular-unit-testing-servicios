import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string) {
    if(localStorage !== undefined) {
      localStorage?.setItem('token', token);
    }
  }

  getToken() {
    if(localStorage !== undefined) {
      const token = localStorage?.getItem('token');
      return token;
    }
    return 'token'
  }

  removeToken() {
    if(localStorage !== undefined) {
      localStorage?.removeItem('token');
    }
  }
}