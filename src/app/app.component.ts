import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ConfirmationService]
})
export class AppComponent implements OnDestroy {
    
  subscription: Subscription;

  constructor(public translate: TranslateService, public primeNGConfig: PrimeNGConfig, private confirmationService: ConfirmationService) {
      translate.setDefaultLang('es');
      this.translate.use('es');

      this.subscription = this.translate.stream('primeng').subscribe(data => {
          this.primeNGConfig.setTranslation(data);
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
        this.subscription.unsubscribe();
    }
  }
}

// export class AppComponent implements OnInit {

//   constructor(private config: PrimeNGConfig, private translateService: TranslateService) {}

//     ngOnInit() {
//         this.translateService.setDefaultLang('en');
//     }

//     translate(lang: string) {
//         this.translateService.use(lang);
//         this.translateService.get('primeng').subscribe(res => this.config.setTranslation(res));
//     }

    
// }
