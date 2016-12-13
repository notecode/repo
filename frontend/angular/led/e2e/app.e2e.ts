import { LedPage } from './app.po';

describe('led App', function() {
  let page: LedPage;

  beforeEach(() => {
    page = new LedPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('led works!');
  });
});
