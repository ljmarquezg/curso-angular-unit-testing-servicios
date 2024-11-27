import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { mockObservable } from '../../testing';
import { fakeActivatedRouteSnapshot, fakeParamMaps, fakeRouterStateSnapshot } from '../../testing/snapshot';
import { generateOneUser } from '../models/user.mock';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { AuthGuard } from './auth.guard';

describe('Test for AuthGuard', () => {
  let guard: AuthGuard;
  let tokenService: jasmine.SpyObj<TokenService>;
  let authService: jasmine.SpyObj<AuthService>;
  let routerStub: jasmine.SpyObj<Router>;

  beforeEach((): void => {
    const tokenServiceSpy = jasmine.createSpyObj('TokenService', ['getToken']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getUser']);
    const routerSSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: AuthService,
          useValue: tokenServiceSpy
        },
        {
          provide: AuthService,
          useValue: authServiceSpy
        },
        {
          provide: Router,
          useValue: routerSSpy
        }
      ]
    });
    guard = TestBed.inject(AuthGuard);
    tokenService = TestBed.inject(TokenService) as jasmine.SpyObj<TokenService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerStub = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create the guard', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if user is logged in', (doneFn) => {
    const activatedRouteSnapshot = fakeActivatedRouteSnapshot({
      paramMap: fakeParamMaps({ idProduct: '1' })
    });
    const routerStateSnapshot = fakeRouterStateSnapshot({});
    const mockUser = generateOneUser();

    authService.getUser.and.returnValue(mockObservable(mockUser));

    guard.canActivate(activatedRouteSnapshot, routerStateSnapshot).subscribe((res) => {
      expect(res).toBeTrue();
      doneFn();
    });
  });

  it('should return false if user is not logged in', (doneFn) => {
    const activatedRouteSnapshot = fakeActivatedRouteSnapshot({
        paramMap: fakeParamMaps({ idProduct: '1' })
      }
    );
    const routerStateSnapshot = fakeRouterStateSnapshot({});

    authService.getUser.and.returnValue(mockObservable(null));

    guard.canActivate(activatedRouteSnapshot, routerStateSnapshot).subscribe((res) => {
      expect(res).toBeFalse();
      expect(routerStub.navigate).toHaveBeenCalledWith(['/home']);
      doneFn();
    });
  });

  it('should return false if user is not logged in and includes paramMap', (doneFn) => {
    const activatedRouteSnapshot = fakeActivatedRouteSnapshot({
        paramMap: fakeParamMaps({ idProduct: '1' })
      }
    );
    const routerStateSnapshot = fakeRouterStateSnapshot({});

    authService.getUser.and.returnValue(mockObservable(null));

    guard.canActivate(activatedRouteSnapshot, routerStateSnapshot).subscribe((res) => {
      expect(res).toBeFalse();
      expect(routerStub.navigate).toHaveBeenCalledWith(['/home']);
      doneFn();
    });
  });
});
