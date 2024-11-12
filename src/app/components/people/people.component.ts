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
}
