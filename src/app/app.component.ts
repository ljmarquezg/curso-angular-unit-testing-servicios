import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import {Calculator} from './calculator';
import { HighlightDirective } from './directives/highlight.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HighlightDirective, RouterModule],
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
