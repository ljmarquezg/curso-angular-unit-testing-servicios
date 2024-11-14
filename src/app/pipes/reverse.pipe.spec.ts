import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { getText, query, queryById } from '../../testing';
import { HighlightDirective } from '../directives/highlight.directive';
import { ReversePipe } from './reverse.pipe';

describe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('should reverse the string roma to amor', () => {
    const pipe = new ReversePipe();
    const result = pipe.transform('roma');
    expect(result).toBe('amor');
  });

  it('should reverse the string 123456 to 654321', () => {
    const pipe = new ReversePipe();
    const result = pipe.transform('123456');
    expect(result).toBe('654321');
  });
});

@Component({
  selector: 'app-others',
  standalone: true,
  imports: [
    HighlightDirective,
    FormsModule,
    ReversePipe
  ],
  template: `
    <h5 data-testid="amor">{{ 'amor' | reverse }}</h5>
    <input
      data-testid="input"
      type="text"
      [(ngModel)]="text"
    />
    <p data-testid="text">{{ text | reverse }}</p>
  `,
})
class HostComponent {
  text = '';
}

describe('Reverse pipe from Host Component', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HostComponent, ReversePipe, FormsModule]
      })
      .compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reverse h5 content', () => {
    //const h5Element = fixture.debugElement.query(By.css('h5'));
    //expect(h5Element.nativeElement.textContent).toBe('roma');
    expect(getText(fixture, 'amor')).toBe('roma');
  });

  it('should reverse input value', () => {
    // Arrange
    //const debugElement = fixture.debugElement;
    //const inputElement: HTMLInputElement = debugElement.query(By.css('input')).nativeElement;
    //const paragraphElement: HTMLElement = debugElement.query(By.css('p')).nativeElement;
    const inputElement: HTMLInputElement = queryById(fixture, 'input').nativeElement;
    const paragraphElement: HTMLElement = queryById(fixture, 'text').nativeElement;
    expect(getText(fixture, 'input')).toBe('');
    // Act
    inputElement.value = 'roma';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    // Asert
    expect(inputElement.value).toBe('roma');
    expect(getText(fixture, 'text')).toBe('amor');
  });

});