import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HighlightDirective } from '../../directivess/highlight.directive';

@Component({
  selector: 'app-others',
  standalone: true,
  imports: [
    HighlightDirective,
    FormsModule,
  ],
  templateUrl: './others.component.html',
  styleUrl: './others.component.scss'
})
export class OthersComponent {
  color = 'blue';
}
