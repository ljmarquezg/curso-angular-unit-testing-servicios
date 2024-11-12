import { Component } from '@angular/core';
import { Person } from '../../models/person.model';
import { PersonComponent } from '../person/person.component';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [
    PersonComponent
  ],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss'
})
export class PeopleComponent {
  person: Person = new Person('Valentina', 'Pérez', 25, 80, 1.75);
  selectedPerson: Person | undefined;
  people: Person[] = [
    new Person('Juana', 'Gimenez', 20, 66, 1.50),
    new Person('Pedro', 'Chapapote', 35, 88, 1.92),
    ];

  choose(person: Person) {
    this.selectedPerson = person;
  }
}
