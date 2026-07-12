import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Header } from '../header/header';
import { About, Contact, Projects, Summary } from '../../components';
import { Footer } from '../footer/footer';

@Component({
    selector: 'jb-home',
    imports: [
        Header,
        Summary,
        Projects,
        About,
        Contact,
        Footer,
        TranslatePipe
    ],
    templateUrl: './home.html',
    styleUrl: './home.scss',
})
export class Home {}
