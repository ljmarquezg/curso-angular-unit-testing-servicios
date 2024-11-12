import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpController: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        TokenService,
      ]
    });
    authService = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('login', () => {
    it('should return a token', (doneFn) => {

      //Arrange
      const email = 'test@test.com';
      const password = '12345678';
      const access_token = 'access token';
      const mockData: Auth = {
        access_token
      }
      //Act
      authService.login(email, password).subscribe((data)=> {
          //Assert
          expect(data).toEqual(mockData);
          doneFn();
        });

      // http config
      const url = `${environment.API_URL}/api/v1/auth/login`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
  });

    it('should call saveToken and return a token', (doneFn) => {

      //Arrange
      const email = 'test@test.com';
      const password = '12345678';
      const access_token = 'access token';
      const mockData: Auth = {
        access_token
      }
      spyOn(tokenService, 'saveToken').and.callThrough();
      //Act
      authService.login(email, password).subscribe((data)=> {
        //Assert
        expect(data).toEqual(mockData);
        expect(tokenService.saveToken).toHaveBeenCalledTimes(1);
        expect(tokenService.saveToken).toHaveBeenCalledOnceWith(data.access_token);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/auth/login`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });
  })
});