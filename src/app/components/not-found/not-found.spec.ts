import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { NotFound } from './not-found';
import { provideTranslateTesting } from '../../testing/translate-testing.providers';

describe('NotFound', () => {
    let component: NotFound;
    let fixture: ComponentFixture<NotFound>;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NotFound],
            providers: [provideRouter([]), provideTranslateTesting()],
        }).compileComponents();

        fixture = TestBed.createComponent(NotFound);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should navigate to the home route when going home', () => {
        const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);

        component.goToHome();

        expect(navigateSpy).toHaveBeenCalledWith(['/'], { replaceUrl: true });
    });
});
