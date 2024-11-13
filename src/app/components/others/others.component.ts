import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HighlightDirective } from '../../directives/highlight.directive';
import { ReversePipe } from '../../pipes/reverse.pipe';

@Component({
  selector: 'app-others',
  standalone: true,
  imports: [
    HighlightDirective,
    FormsModule,
    ReversePipe,
  ],
  templateUrl: './others.component.html',
  styleUrl: './others.component.scss'
})
export class OthersComponent {
  color = 'blue';
  text = 'hello';
}
