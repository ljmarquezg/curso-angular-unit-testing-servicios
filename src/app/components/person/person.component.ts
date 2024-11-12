import { Component, inject, Input } from '@angular/core';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [],
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss'
})
export class PersonComponent {
  @Input() person: Person = new Person('Juan', 'Perez', 30, 81, 1.72);

  constructor() {
   // this.person = new Person('John', 'Doe', 30, 81, 1.72);
  }
}
