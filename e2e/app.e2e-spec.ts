import { StarwarsNgPage } from './app.po';

describe('starwars-ng App', function() {
  let page: StarwarsNgPage;

  beforeEach(() => {
    page = new StarwarsNgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
