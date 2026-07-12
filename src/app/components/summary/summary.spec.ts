import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Summary } from './summary';
import { provideTranslateTesting } from '../../testing/translate-testing.providers';

describe('Summary', () => {
    let component: Summary;
    let fixture: ComponentFixture<Summary>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Summary],
            providers: [provideTranslateTesting()],
        }).compileComponents();

        fixture = TestBed.createComponent(Summary);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
