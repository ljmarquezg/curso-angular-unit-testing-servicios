import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { query, queryAll } from '../../../testing';
import { Person } from '../../models/person.model';
import { PeopleComponent } from './people.component';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [PeopleComponent]
      })
      .compileComponents();

    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of app-person', () => {
    // Arange
    component.people = [
      new Person('Juana', 'Gimenez', 20, 66, 1.50),
      new Person('Pedro', 'Chapapote', 35, 88, 1.92),
      new Person('Valentina', 'Pérez', 25, 80, 1.75)
    ];
    // Act
    fixture.detectChanges();
    const debugElement = fixture.debugElement.queryAll(By.css('app-person'));
    // Assert
    expect(debugElement.length).toBe(3);
  });

  it('should selected person', () => {
    // Arrange
    component.people = [
      new Person('Juana', 'Gimenez', 20, 66, 1.50),
      new Person('Pedro', 'Chapapote', 35, 88, 1.92),
      new Person('Valentina', 'Pérez', 25, 80, 1.75)
    ];
    // Act
    fixture.detectChanges();
    const chooseButtonDebug = query(fixture, 'app-person .btn-choose');
    chooseButtonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    // Assert
    expect(component.selectedPerson).toEqual(component.people[0]);
  });

  it('should show selected person', () => {
    // Arrange
    component.people = [
      new Person('Juana', 'Gimenez', 20, 66, 1.50),
      new Person('Pedro', 'Chapapote', 35, 88, 1.92),
      new Person('Valentina', 'Pérez', 25, 80, 1.75)
    ];
    fixture.detectChanges();
    const chooseButtonDebug = query(fixture, 'app-person .btn-choose');
    chooseButtonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    const selectedPersonDebugLi = queryAll(fixture, 'li');
    // Act
    const nameSelectedPerson = selectedPersonDebugLi[0];
    const ageSelectedPerson = selectedPersonDebugLi[1];
    // Assert
    expect(nameSelectedPerson.nativeElement?.textContent).toContain(component.selectedPerson?.name);
    expect(ageSelectedPerson.nativeElement?.textContent).toContain(component.selectedPerson?.age);
  });
});
