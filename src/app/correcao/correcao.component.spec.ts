import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CorrecaoComponent } from './correcao.component';

describe('CorrecaoComponent', () => {
  let component: CorrecaoComponent;
  let fixture: ComponentFixture<CorrecaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorrecaoComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorrecaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
