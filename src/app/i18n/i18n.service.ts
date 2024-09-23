import { Injectable } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import deDE from '../../translations/de-De.json';
import enUS from '../../translations/en-US.json';
import esES from '../../translations/es-ES.json';
import frFR from '../../translations/fr-FR.json';
import itIT from '../../translations/it-IT.json';
import { Logger } from '@app/@core/services';
import { environment } from '@env/environment';

const log = new Logger('I18nService');
const languageKey = 'language';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  defaultLanguage!: string;
  supportedLanguages!: string[];

  private _langChangeSubscription!: Subscription;
  private readonly _languageSubject: BehaviorSubject<string>;

  constructor(private readonly _translateService: TranslateService) {
    // Initialize the BehaviorSubject with an initial value
    this._languageSubject = new BehaviorSubject<string>(localStorage.getItem(languageKey) || environment.defaultLanguage || this._translateService.getBrowserCultureLang() || '');

    // Embed languages to avoid extra HTTP requests
    _translateService.setTranslation('de-DE', deDE);
    _translateService.setTranslation('en-US', enUS);
    _translateService.setTranslation('es-ES', esES);
    _translateService.setTranslation('fr-FR', frFR);
    _translateService.setTranslation('it-IT', itIT);
  }

  /**
   * Returns the current language as an observable.
   * @return Observable of the current language.
   */
  get languageObservable(): Observable<string> {
    return this._languageSubject.asObservable();
  }

  /**
   * Gets the current language.
   * @return The current language code.
   */
  get language(): string {
    return this._translateService.currentLang;
  }

  /**
   * Sets the current language.
   * Note: The current language is saved to the local storage.
   * If no parameter is specified, the language is loaded from local storage (if present).
   * @param language The IETF language code to set.
   */
  set language(language: string) {
    let newLanguage = language || localStorage.getItem(languageKey) || environment.defaultLanguage || this._translateService.getBrowserCultureLang() || '';
    let isSupportedLanguage = this.supportedLanguages.includes(newLanguage);

    if (language !== this._languageSubject.value) {
      this._languageSubject.next(newLanguage);
    }

    // If no exact match is found, search without the region
    if (newLanguage && !isSupportedLanguage) {
      newLanguage = newLanguage.split('-')[0];
      newLanguage = this.supportedLanguages.find((supportedLanguage) => supportedLanguage.startsWith(newLanguage)) || '';
      isSupportedLanguage = Boolean(newLanguage);
    }

    // Fallback if language is not supported
    if (!newLanguage || !isSupportedLanguage) {
      newLanguage = this.defaultLanguage;
    }

    language = newLanguage;

    log.debug(`Language set to ${language}`);
    this._translateService.use(language);
  }

  /**
   * Initializes i18n for the application.
   * Loads language from local storage if present, or sets default language.
   * @param defaultLanguage The default language to use.
   * @param supportedLanguages The list of supported languages.
   */
  init(defaultLanguage: string, supportedLanguages: string[]) {
    this.defaultLanguage = defaultLanguage;
    this.supportedLanguages = supportedLanguages;
    log.debug(`Initializing with default language: ${defaultLanguage}`);
    this.language = '';

    // Warning: this subscription will always be alive for the app's lifetime
    this._langChangeSubscription = this._translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      localStorage.setItem(languageKey, event.lang);
    });
  }

  /**
   * Cleans up language change subscription.
   */
  destroy() {
    if (this._langChangeSubscription) {
      this._langChangeSubscription.unsubscribe();
    }
  }
}
