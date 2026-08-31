import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import { App } from './app/app';
import { environment } from './environment';

console.log(environment);

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
