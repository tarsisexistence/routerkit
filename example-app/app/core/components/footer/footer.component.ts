import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer">RouterKit</footer>
  `,
  styles: [
    `
      :host {
        position: absolute;
        bottom: 20px;
        left: 47%;
      }

      .footer {
        display: block;
        margin: 0 auto;
        width: 30px;
      }
    `
  ]
})
export class FooterComponent {}
