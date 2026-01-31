import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { ChatService } from "../chat.service";
import { Subscription } from "rxjs";
import { ChatCollection, ChatHistory, User } from "../../../../shared/models/chat.model";
import { PerfectScrollbarModule } from "../../../../shared/components/perfect-scrollbar";
import { allMaterialModules } from "../../../../shared/material-imports";
import { GetValueByKeyPipe } from "../../../../shared/pipes/get-value-by-key.pipe";
import { SharedPipesModule } from "../../../../shared/pipes/shared-pipes.module";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-assistant-sidenav',
  imports: [PerfectScrollbarModule,...allMaterialModules, SharedPipesModule, DatePipe],
  templateUrl: './assistant-sidenav.component.html',
  styleUrl: './assistant-sidenav.component.scss'
})
export class AssistantSidenavComponent implements OnInit {
  userUpdateSub: Subscription;
  loadDataSub: Subscription;
  
  isSidenavOpen = true;

  currentUser: User = new User();
  chatHistory: ChatCollection[];
  sender: string;
  constructor(
    private chatService: ChatService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // this.chatService.onChatsUpdated
    //   .subscribe(updatedChats => {
    //     this.chats = updatedChats;
    //   });

    this.userUpdateSub = this.chatService.onUserUpdated
      .subscribe(updatedUser => {
        this.currentUser = updatedUser;
      });

    this.loadDataSub = this.chatService.loadChatData()
      .subscribe(res => {
        this.currentUser = this.chatService.user;
        // this.chats = this.chatService.chats;
        this.chatHistory = this.chatService.chats;
        // this.chatService.onUserUpdated.next(this.chatService.user)
        this.cdr.markForCheck();
      });
  }
  ngOnDestroy() {
    if( this.userUpdateSub ) this.userUpdateSub.unsubscribe();
    if( this.loadDataSub ) this.loadDataSub.unsubscribe();
  }
  getMessageSender(contactId: string) {
    const contact = this.currentUser.chatInfo.find(chat => chat.contactId === contactId);
    return contact ? contact.contactName : '';
  }

  getChatByContact(contactId) { 
    this.chatService.getChatByContact(contactId)
      .subscribe(res => {
        // console.log('from sub',res);
      }, err => {
        console.log(err)
      })
  }
  getChatById(chatId: string) {
    this.chatService.getChatById(chatId)
      .subscribe(res => {
        // console.log('from sub',res);
      }, err => {
        console.log(err)
      })
  }
}
