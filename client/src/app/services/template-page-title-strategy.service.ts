import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TemplatePageTitleStrategyService extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    console.log('router'  , routerState);

    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`Space 360 | ${title}`);
    }
  }
}
