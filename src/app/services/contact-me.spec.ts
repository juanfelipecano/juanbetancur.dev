import { TestBed } from '@angular/core/testing';

import { ContactMe } from './contact-me';

describe('ContactMe', () => {
    let service: ContactMe;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ContactMe);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
