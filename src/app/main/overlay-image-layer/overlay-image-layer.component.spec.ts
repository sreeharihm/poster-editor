import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayImageLayerComponent } from './overlay-image-layer.component';

describe('OverlayImageLayerComponent', () => {
  let component: OverlayImageLayerComponent;
  let fixture: ComponentFixture<OverlayImageLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverlayImageLayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayImageLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
