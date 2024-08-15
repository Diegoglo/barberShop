import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { appConfig } from './app/app.config';

// if (environment.production) {
//   enableProdMode();
// }

platformBrowserDynamic()
  .bootstrapModule(AppModule, { providers: appConfig.providers })
  .catch(err => console.error(err));