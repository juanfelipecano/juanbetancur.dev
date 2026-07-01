import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { About, Contact, Projects, Summary } from './components';
import { Footer, Header } from './layout';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        Header,
        Summary,
        Projects,
        About,
        Contact,
        Footer
    ],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App {
    protected readonly title = signal('juanbetancur.dev');
}
