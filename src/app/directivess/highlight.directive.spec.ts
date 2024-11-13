import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { HighlightDirective } from './highlight.directive';

@Component({
  selector: 'app-others',
  standalone: true,
  imports: [
    HighlightDirective,
    FormsModule,
  ],
  template: `
    <h5 highlight class="title">Default</h5>
    <h5 highlight="yellow">yellow</h5>
    <p highlight="blue">parrafo</p>
    <p>otro parrafo</p>
    <input
      type="text"
      [(ngModel)]="color"
      [highlight]="color"
    />
  `,
})
class HostComponent {
  color = 'pink';
}

describe('HighlightDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HostComponent, HighlightDirective, FormsModule]
      })
      .compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have three highlight elements', () => {
    // Arrange
    const debugElement = fixture.debugElement;
    const highlightElements = debugElement.queryAll(By.directive(HighlightDirective));
    const highlightWithoutElements = debugElement.queryAll(By.css('*:not([highlight])'));
    //Act
    // Assert
    expect(highlightElements.length).toBe(4);
    expect(highlightWithoutElements.length).toBe(2);
  });

  it('should the elements match background bgColor', () => {
    // Arrange
    const debugElement = fixture.debugElement;
    const highlightElements = debugElement.queryAll(By.directive(HighlightDirective));
    // Assert
    expect(highlightElements[0].nativeElement.style.backgroundColor).toBe('gray');
    expect(highlightElements[1].nativeElement.style.backgroundColor).toBe('yellow');
    expect(highlightElements[2].nativeElement.style.backgroundColor).toBe('blue');
  });

  it('should the h5 be defaultColor', () => {
    // Arrange
    const debugElement = fixture.debugElement;
    const highlightElements = debugElement.query(By.css('.title'));
    const directive = highlightElements.injector.get(HighlightDirective);
    // Assert
    expect(highlightElements.nativeElement.style.backgroundColor).toBe(directive.defaultColor);
  });

  it('should binding <input> and change bgColor', () => {
    // Arrange
    const debugElement = fixture.debugElement;
    const highlightElements = debugElement.query(By.css('input'));
    const inputElement: HTMLInputElement = highlightElements.nativeElement;
    // Assert
    expect(inputElement.style.backgroundColor).toBe(component.color);

    inputElement.value = 'red';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(inputElement.style.backgroundColor).toBe('red');
    expect(component.color).toBe('red');
  });
});