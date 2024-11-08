import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Calculator} from './calculator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-unit-test';

  ngOnInit() {
    const calculator = new Calculator();
    const respuesta = calculator.multiply(3, 3);
    console.log(respuesta === 9)
  }
}
