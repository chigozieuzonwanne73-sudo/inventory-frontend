import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';



@Component({
    selector: 'app-auth-layout',
    templateUrl: './auth-layout.component.html',
    standalone: true,
    imports: [CommonModule, RouterModule, TranslateModule],
})
export class AuthLayoutComponent implements OnInit {

  constructor(
    public translate: TranslateService,
  ) { 
    // Set default language
    this.translate.setDefaultLang('en');
    // Use the browser's language if available
    const browserLang = this.translate.getBrowserLang();
   // this.translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  ngOnInit() {
  }

}
