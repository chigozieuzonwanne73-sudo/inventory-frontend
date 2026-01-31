import { Directive, ElementRef, Attribute, HostListener } from '@angular/core';

@Directive({
  selector: '[scrollTo]',
  standalone: true
})
export class ScrollToDirective {
  constructor(@Attribute('scrollTo') public elmID: string, private el: ElementRef) {}

  @HostListener('click')
  onClick() {
    if (!this.elmID) return;

    const target = document.getElementById(this.elmID);
    if (!target) {
      console.warn(`Element with ID '${this.elmID}' not found.`);
      return;
    }

    this.smoothScrollToElement(target);
  }

  private smoothScrollToElement(target: HTMLElement) {
    const targetY = this.getElementY(target);
    const startY = window.scrollY || window.pageYOffset;
    const distance = targetY - startY;
    const duration = 500; // milliseconds
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeInOut = this.easeInOutQuad(progress);

      window.scrollTo(0, startY + distance * easeInOut);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }

  private getElementY(elm: HTMLElement): number {
    let y = elm.offsetTop;
    let node: any = elm;

    while (node.offsetParent && node.offsetParent !== document.body) {
      node = node.offsetParent;
      y += node.offsetTop;
    }

    return y;
  }

  private easeInOutQuad(t: number): number {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }
}
