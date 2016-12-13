import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { LedAppComponent } from '../app/led.component';

beforeEachProviders(() => [LedAppComponent]);

describe('App: Led', () => {
  it('should create the app',
      inject([LedAppComponent], (app: LedAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'led works!\'',
      inject([LedAppComponent], (app: LedAppComponent) => {
    expect(app.title).toEqual('led works!');
  }));
});
