import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { AppUpdateService } from '@core/services';
import { SocketIoService } from '@core/socket-io';

/** Avoids opening a real socket connection during tests. */
class MockSocketIoService {
  connect() {}
  disconnect() {}
}

/** Avoids pulling in the service worker and toast stack during tests. */
class MockAppUpdateService {
  subscribeForUpdates() {}
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([]), provideTranslateService(), { provide: SocketIoService, useClass: MockSocketIoService }, { provide: AppUpdateService, useClass: MockAppUpdateService }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'angular-boilerplate' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-boilerplate');
  });

  it('should render the router outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
