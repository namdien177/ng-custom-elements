import { TestBed } from '@angular/core/testing';

import { SelectContainerService } from './select-container.service';

describe('SelectContainerService', () => {
  let service: SelectContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
