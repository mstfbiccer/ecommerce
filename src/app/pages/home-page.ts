import { Component } from "@angular/core";

@Component({
  standalone: true,
  imports: [],
  templateUrl: './home-page.html',
  styles: [`
    /* Custom styles for Beymen-inspired design */
    section {
      scroll-snap-align: start;
    }
    
    .tracking-wide {
      letter-spacing: 0.1em;
    }
    
    .tracking-widest {
      letter-spacing: 0.25em;
    }
    
    /* Smooth scrolling for full-page sections */
    html {
      scroll-behavior: smooth;
    }
    
    /* Custom hover effects */
    .group:hover .group-hover\\:scale-105 {
      transform: scale(1.05);
    }
    
    /* Typography enhancements */
    h1, h2, h3 {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    
    /* Gradient text effects */
    .gradient-text {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  `]
})
export class HomePage {}