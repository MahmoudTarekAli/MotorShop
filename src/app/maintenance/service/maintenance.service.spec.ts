import { TestBed } from '@angular/core/testing';

import { SalesInvoiceService } from './product.service';

describe('CategoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalesInvoiceService = TestBed.get(SalesInvoiceService);
    expect(service).toBeTruthy();
  });
});
