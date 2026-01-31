
import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

import { MatSidenav } from '@angular/material/sidenav';
import { allMaterialModules } from '../../../shared/material-imports';
import { AssistantContentComponent } from './assistant-content/assistant-content.component';
import { AssistantSidenavComponent } from './assistant-sidenav/assistant-sidenav.component';
import { AssistantService } from '../../../shared/services/assistant.service';
import { ChatService } from './chat.service';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-assistant',
  imports: [...allMaterialModules, AssistantContentComponent, AssistantSidenavComponent, NgIf],
  templateUrl: './assistant.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './assistant.component.scss',
})
export class AssistantComponent implements OnInit, AfterViewInit, OnDestroy {
  isMobile;
  screenSizeWatcher: Subscription;
  isSidenavOpen = true;
  isChatboxOpen = false;
  @ViewChild(MatSidenav) public sideNav: MatSidenav;

  activeChatUser = {
    name: 'Gevorg Spartak',
    photo: 'assets/images/face-2.jpg',
    isOnline: true,
    lastMsg: 'Hello!'
  };
  user;


  constructor(
    private breakpointObserver: BreakpointObserver,
    public assistantService: AssistantService
  ) {
    // console.log(chatService.chats)
   // this.user = assistantService.user | 30;
  }
  ngAfterViewInit(): void {
    this.chatSideBarInit();
  }

  ngOnInit() {
   
  }
  ngOnDestroy() {
    if (this.screenSizeWatcher) {
      this.screenSizeWatcher.unsubscribe();
    }
  }
  changeActiveUser(user) {
    this.activeChatUser = user;
  }
  updateSidenav() { 
    var self = this;
    setTimeout(() => {
      self.isSidenavOpen = !self.isMobile;
      if (self.sideNav) {
        self.sideNav.mode = self.isMobile ? 'over' : 'side';
      }
    });
  }
  chatSideBarInit() {
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 959px)');
    this.updateSidenav();

    this.screenSizeWatcher = this.breakpointObserver.observe('(max-width: 959px)').subscribe(result => {
      this.isMobile = result.matches;
      this.updateSidenav();
    });
  }
  toggleChatBox(id: boolean) {
   this.isChatboxOpen = id;
  }
}

