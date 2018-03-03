import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ActionSheetController, AlertController, Platform, ActionSheetOptions } from 'ionic-angular';
import { ActionSheetButton } from 'ionic-angular/components/action-sheet/action-sheet-options';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';
import { BeaconService } from '../beacon/beacon.service';

import { I18nService } from '../i18n.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  navRoot: Component;
  subscription: any;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private translateService: TranslateService,
              private platform: Platform,
              private alertController: AlertController,
              public beaconService: BeaconService,
              private actionSheetController: ActionSheetController,
              private i18nService: I18nService) { }

  ngOnInit() {
    this.beaconService.start();

    this.updateNav(this.activatedRoute);

    // Bind Ionic navigation to Angular router events
    this.subscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.updateNav(this.activatedRoute));
    }

  get isWeb(): boolean {
    return !this.platform.is('cordova');
  }

  changeLanguage() {
    this.alertController
      .create({
        title: this.translateService.instant('Change language'),
        inputs: this.i18nService.supportedLanguages.map(language => ({
          type: 'radio',
          label: language,
          value: language,
          checked: language === this.i18nService.language
        })),
        buttons: [
          {
            text: this.translateService.instant('Cancel'),
            role: 'cancel'
          },
          {
            text: this.translateService.instant('Ok'),
            handler: language => {
              this.i18nService.language = language;
            }
          }
        ]
      })
      .present();
  }

  private updateNav(route: ActivatedRoute) {
    if (!route || !route.firstChild) {
      return;
    }
    // First component should always be IonicApp
    route = route.firstChild;
    if (route && route.component === ShellComponent && route.firstChild) {
      // Loop needed for lazy-loaded routes, see: https://github.com/angular/angular/issues/19420
      while (route.firstChild) {
        route = route.firstChild;
      }

      this.navRoot = <Component>route.component;
    }
  }

}
