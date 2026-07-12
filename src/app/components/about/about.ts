import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'jb-about',
    imports: [ TranslatePipe ],
    templateUrl: './about.html',
    styleUrl: './about.scss',
})
export class About {
    protected readonly stack = [
        'Javascript',
        'Html',
        'CSS',
        'Angular',
        'RxJs',
        'React',
        'TypeScript',
        'Jest',
        'Vitest',
        'Playwright'
    ];

    protected readonly learning = [
        'Web Accessibility a11y',
        'GitHub Actions'
    ];
}
