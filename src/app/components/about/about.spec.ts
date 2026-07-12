import { ComponentFixture, TestBed } from '@angular/core/testing';

import { About } from './about';
import { provideTranslateTesting } from '../../testing/translate-testing.providers';

describe('About', () => {
    let component: About;
    let fixture: ComponentFixture<About>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [About],
            providers: [provideTranslateTesting()],
        }).compileComponents();

        fixture = TestBed.createComponent(About);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
