import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSelectComponent } from './image-select.component';

describe('ImageSelectComponent', () => {
  let component: ImageSelectComponent;
  let fixture: ComponentFixture<ImageSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
