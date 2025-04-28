import { Component, HostListener } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-programs',
  imports: [TranslateModule],
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.scss',
})
export class ProgramsComponent {
  currentPanel = 0;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const panels = document.querySelectorAll('.panel');
    panels.forEach((panel, index) => {
      const rect = panel.getBoundingClientRect();
      if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
        this.currentPanel = index;
        this.animatePanel(panel);
      }
    });
  }

  private animatePanel(panel: Element) {
    // Add your animation logic here
    panel.classList.add('active');
  }
}
