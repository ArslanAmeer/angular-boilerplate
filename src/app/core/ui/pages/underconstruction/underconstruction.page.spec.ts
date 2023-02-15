import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderconstructionPage } from './underconstruction.page';

describe('UnderconstructionPage', () => {
  let component: UnderconstructionPage;
  let fixture: ComponentFixture<UnderconstructionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnderconstructionPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnderconstructionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
