import { async, TestBed } from '@angular/core/testing';
import { TransactionModule } from './transaction.module';

describe('TransactionModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TransactionModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(TransactionModule).toBeDefined();
  });
});
