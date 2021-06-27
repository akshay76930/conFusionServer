import { browser, by, element, logging } from 'protractor';
import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display message saying Ristorante Con Fusion', async () => {  
    page.navigateTo('/');
    expect(page.getParagraphText('app-root h1')).toContain('Ristorante Con Fusion');
  });
});