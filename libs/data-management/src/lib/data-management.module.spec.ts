import { async, TestBed } from '@angular/core/testing';
import { DataManagementModule } from './data-management.module';

describe('DataManagementModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DataManagementModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DataManagementModule).toBeDefined();
  });
});
