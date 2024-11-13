import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HighlightDirective } from './highlight.directive';

@Component({
  selector: 'app-others',
  standalone: true,
  imports: [
    HighlightDirective,
  ],
  template: `
    <h5 highlight class="title">Default</h5>
    <h5 highlight="yellow">yellow</h5>
    <p highlight="blue">parrafo</p>
    <p>otro parrafo</p>
  `,
})
class HostComponent {
}

describe('HighlightDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HostComponent, HighlightDirective]
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
    expect(highlightElements.length).toBe(3);
    expect(highlightWithoutElements.length).toBe(1);
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
});