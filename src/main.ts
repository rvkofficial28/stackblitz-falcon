import 'ag-grid-enterprise'; 
import { LicenseManager } from "ag-grid-enterprise";

LicenseManager.setLicenseKey("KEY HERE");
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));