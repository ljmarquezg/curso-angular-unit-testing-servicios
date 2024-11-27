import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterLink, RouterLinkWithHref, RouterModule } from '@angular/router';
import { queryAllByDirective } from '../testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterModule.forRoot([]),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('it should have 6 routerLinks', () => {
    const links = queryAllByDirective(fixture, RouterLinkWithHref);
    fixture.detectChanges();
    expect(links.length).toBe(6);
  });

  it('should have 6 routerLinks with the correct paths', () => {
    const linkDebugElements: DebugElement[] = queryAllByDirective(fixture, RouterLinkWithHref);

    expect(linkDebugElements.length).toBe(6);

    const routerLinks = linkDebugElements.map(
      (de) => de.injector.get(RouterLinkWithHref)
    );
    expect(TestBed.inject(Router).url).toEqual('/');
    expect(routerLinks[0].href).toBe('/');
    expect(routerLinks[1].href).toBe('/register');
    expect(routerLinks[2].href).toBe('/products');
    expect(routerLinks[3].href).toBe('/pico-preview');
    expect(routerLinks[4].href).toBe('/people');
    expect(routerLinks[5].href).toBe('/others');
  });

  it('should navigate to the correct link when clicked', async () => {
    const linkDebugElements: DebugElement[] = queryAllByDirective(fixture, RouterLinkWithHref);
    expect(linkDebugElements.length).toBe(6);
    const homeLink = linkDebugElements[0].injector.get(RouterLink);
    linkDebugElements[0].nativeElement.click();
    fixture.detectChanges();
    expect(homeLink.href).toBe('/');
  });

});
