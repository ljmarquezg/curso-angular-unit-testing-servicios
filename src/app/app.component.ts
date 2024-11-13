import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {Calculator} from './calculator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-unit-test';

  ngOnInit() {
    const calculator = new Calculator();
    const respuesta = calculator.multiply(3, 3);
  }
}
