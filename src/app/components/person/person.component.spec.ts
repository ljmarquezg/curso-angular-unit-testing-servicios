import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Person } from '../../models/person.model';

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
    component.person = new Person('Juan', 'Pérez', 25, 80, 1.75);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  /* it('should have a <p> with "Soy un párrafo" with nativeElement', () => {
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
  });*/

  it('should the name be "Juan"', () => {
    expect(component.person.name).toBe('Juan');
  });

  it ('should have <h3> with "Hola, {person.name}"', () => {
    //Arrange
    component.person = new Person('Valentina', 'Pérez', 25, 80, 1.75);
    const expectedMsg = `Hola, ${component.person.name}`;
    const personDebugElement: DebugElement = fixture.debugElement;
    const h3Debug: DebugElement = personDebugElement.query(By.css('h3'));
    const h3: HTMLElement = h3Debug.nativeElement;
    // Act
    fixture.detectChanges();
    // Assert
    expect(h3?.textContent).toBe(expectedMsg);
  });

  it ('should have <p> with "Mi altura es {person.height}"', () => {
    //Arrange
    component.person = new Person('Valentina', 'Pérez', 25, 80, 1.75);
    const expectedMsg = `Mi altura es: ${component.person.height}`;
    const personDebugElement: DebugElement = fixture.debugElement;
    const h3Debug: DebugElement = personDebugElement.query(By.css('p'));
    const h3: HTMLElement = h3Debug.nativeElement;
    // Act
    fixture.detectChanges();
    // Assert
    expect(h3?.textContent).toEqual(expectedMsg);
    expect(h3?.textContent).toContain(component.person.height);
  });
});
