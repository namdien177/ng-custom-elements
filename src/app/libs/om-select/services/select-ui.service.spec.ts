import { TestBed } from '@angular/core/testing';

import { SelectUiService } from './select-ui.service';

describe('SelectUiService', () => {
  let service: SelectUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
