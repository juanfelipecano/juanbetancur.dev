import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home } from './home';
import { provideTranslateTesting } from '../../testing/translate-testing.providers';

describe('Home', () => {
    let component: Home;
    let fixture: ComponentFixture<Home>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Home],
            providers: [provideTranslateTesting()],
        }).compileComponents();

        fixture = TestBed.createComponent(Home);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
