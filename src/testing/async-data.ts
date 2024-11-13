import { defer, Observable, of } from 'rxjs';

export function asyncData<T>(data: T): Observable<T> {
  return defer(() => Promise.resolve(data));
}

export function asyncError(error: unknown): Observable<never>{
  return defer(() => Promise.reject(error));
}

export function mockObservable<T>(data: T): Observable<T> {
  return of(data);
}

export function mockPromise<T>(data: T): Promise<T> {
  return Promise.resolve(data);
}