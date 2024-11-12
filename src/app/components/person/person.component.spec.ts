import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PersonComponent } from './person.component';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a <p> with "Soy un párrafo" with nativeElement', () => {
    const personElement: HTMLElement = fixture.nativeElement;
    const p = personElement.querySelector('p');
    expect(p?.textContent).toEqual('Soy un párrafo');
  });

  it('should have a <p> with "Soy un párrafo" with debutElement', () => {
    const personDebugElement: DebugElement = fixture.debugElement;
    const personElement: HTMLElement = personDebugElement.nativeElement;
    const p = personElement.querySelector('p');
    expect(p?.textContent).toEqual('Soy un párrafo');
  });

  it('should have a <h3> with "Person Component" with debutElement query', () => {
    const personDebugElement: DebugElement = fixture.debugElement;
    const pDebug: DebugElement = personDebugElement.query(By.css('h3'));
    const personElement: HTMLElement = pDebug.nativeElement;
    expect(personElement?.textContent).toEqual('Person Component');
  });
});
