import {
  Directive,
  OnInit,
  OnDestroy,
  HostBinding,
  Input,
  HostListener
} from "@angular/core";
// import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
// import { MatchMediaService } from "app/shared/services/match-media.service";
import { greatSidenavHelperService } from "./egret-sidenav-helper.service";
import { MatSidenav } from "@angular/material/sidenav";
// import { MediaObserver } from "@angular/flex-layout";

@Directive({
  selector: "[greatSidenavHelper]",
  standalone: false
})
export class greatSidenavHelperDirective implements OnInit, OnDestroy {
  @HostBinding("class.is-open")
  isOpen: boolean;

  @Input("greatSidenavHelper")
  id: string;

  @Input("isOpen")
  isOpenBreakpoint: string;

  private unsubscribeAll: Subject<any>;

  constructor(
    // private matchMediaService: MatchMediaService,
    private greatSidenavHelperService: greatSidenavHelperService,
    private matSidenav: MatSidenav,
    // private mediaObserver: MediaObserver
  ) {
    // Set the default value
    this.isOpen = true;

    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.greatSidenavHelperService.setSidenav(this.id, this.matSidenav);

    // if (this.mediaObserver.isActive(this.isOpenBreakpoint)) {
    //   this.isOpen = true;
    //   this.matSidenav.mode = "side";
    //   this.matSidenav.toggle(true);
    // } else {
    //   this.isOpen = false;
    //   this.matSidenav.mode = "over";
    //   this.matSidenav.toggle(false);
    // }

    // this.matchMediaService.onMediaChange
    //   .pipe(takeUntil(this.unsubscribeAll))
    //   .subscribe(() => {
    //     if (this.mediaObserver.isActive(this.isOpenBreakpoint)) {
    //       this.isOpen = true;
    //       this.matSidenav.mode = "side";
    //       this.matSidenav.toggle(true);
    //     } else {
    //       this.isOpen = false;
    //       this.matSidenav.mode = "over";
    //       this.matSidenav.toggle(false);
    //     }
    //   });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(1);
    this.unsubscribeAll.complete();
  }
}

@Directive({
  selector: "[greatSidenavToggler]",
  standalone: false
})
export class greatSidenavTogglerDirective {
  @Input("greatSidenavToggler")
  public id: any;

  constructor(private greatSidenavHelperService: greatSidenavHelperService) { }

  @HostListener("click")
  onClick() {
    // console.log(this.greatSidenavHelperService.getSidenav(this.id))
    this.greatSidenavHelperService.getSidenav(this.id).toggle();
  }
}
