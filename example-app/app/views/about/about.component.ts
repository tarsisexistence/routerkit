import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <h1>RouterKit</h1>

    <img class="image" src="/assets/logo/routeshub.svg" alt="routeshub logo" />

    <h4>
      A minimal unit is made to simplify developers routes business
    </h4>
  `,
  styles: [
    `
      :host {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .image {
        margin-top: 10px;
        margin-bottom: 40px;
      }
    `
  ]
})
export class AboutComponent {}
