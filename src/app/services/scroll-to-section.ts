import { Service } from '@angular/core';

@Service()
export class ScrollToSection {

    public perform(id: string): void {
        const element = document.getElementById(id);

        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}
