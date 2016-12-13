export class LedPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('led-app h1')).getText();
  }
}
