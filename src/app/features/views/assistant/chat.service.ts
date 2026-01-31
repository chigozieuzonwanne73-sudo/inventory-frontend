import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject, of, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Chat, ChatCollection, ChatHistory, User } from '../../../shared/models/chat.model';
import { ChatDB } from '../../../shared/inmemory-db/chat-db';


// tslint:disable-next-line: max-classes-per-file
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public contacts: User[];
  public chats: ChatCollection[];
  public chatHistory: ChatCollection[];
  public user: User;
  public collectionLoading: boolean;

  onContactSelected = new BehaviorSubject<any>(null);
  onUserUpdated = new Subject<User>();

  onChatSelected = new BehaviorSubject<any>(null);
  onChatsUpdated = new Subject<any>();

  constructor(private http: HttpClient) {
    // console.log('from service');
    // this.loadChatData()
  }

  loadChatData(): Observable<any> {
    return combineLatest(this.getAllContacts(), this.getAllChats(), this.getCurrentUser(), (contacts, chats, user) => {
      this.contacts = contacts;
      this.chats = chats;
      this.user = user;
      // console.log('next.willCall', user)
      this.onUserUpdated.next(user);
      // console.log('next.called')
      // console.log(
      //   "contacts:",
      //   contacts,
      //   "\n chats:",
      //   chats,
      //   "\n currUser:",
      //   user
      // );
    });
  }
  public getChatByContact(contactId): Observable<ChatCollection> {
    const chatInfo = this.user.chatInfo.find((chat) => chat.contactId === contactId);
    this.collectionLoading = true;

    if (!chatInfo) {
      return this.createChatCollection(contactId)
      .pipe(switchMap((chatColl) => {
        return this.getChatByContact(contactId);
      }));
    }

    return this.getAllChats().pipe(
      switchMap((chats) => {
        const chatCollection = chats.find((chat) => chat.id === chatInfo.chatId);
        const contact = this.contacts.find(
          // tslint:disable-next-line: no-shadowed-variable
          (contact) => contact.id === contactId
        );
        // console.log(chatCollection)
        this.onChatSelected.next({
          chatCollection,
          contact,
        });
        this.collectionLoading = false;
        return of(chatCollection);
      })
    );
  }

  createChatCollection(contactId) {
    // tslint:disable-next-line: no-shadowed-variable
    const contact = this.contacts.find((contact) => contact.id === contactId);
    const chatId = (Math.random() * 1000000000).toString();

    const chatCollection: ChatCollection = {
      id: chatId,
      chats: [],
      lastMessage: null
    };

    const chatInfo = {
      chatId,
      lastChatTime: new Date(),
      contactId: contact.id,
      contactName: contact.name,
      unread: null,
    };

    // return this.http.post('api/chat-collections', { ...chatCollection })
    ChatDB.chatCollection.push(chatCollection);
    return of(ChatDB.chatCollection)
    .pipe(switchMap((updatedChatCollection) => {
      this.user.chatInfo.push(chatInfo);
      return this.updateUser(this.user).pipe(
        switchMap((res) => {
          return this.getCurrentUser().pipe(
            map((user) => {
              this.user = user;
              // console.log(user)
              this.onUserUpdated.next(user);
            })
          );
        })
      );
    }));
  }

  getAllContacts(): Observable<User[]> {
    return of(ChatDB.contacts);
    // return this.http.get<User[]>('api/contacts');
  }
  getSenderById(contactId: string): Observable<String> {
    if(contactId === "7863a6802ez0e277a0f98534")
      return of("You");
    const contact = ChatDB.contacts.find(contact => contact.id === contactId);
    if(contact) {
      return of(contact.name);
    } else {
      return of("Unknown");
    }
  }
  getChatById(chatId: string): Observable<ChatCollection> {
    return this.getAllChats().pipe(
      switchMap((chats) => {
        const chatCollection = chats.find((chat) => chat.id === chatId);
        const contact = this.contacts.find(
          // tslint:disable-next-line: no-shadowed-variable
          (contact) => contact.id === '323sa680b3249760ea21rt47'
        );
        // console.log(chatCollection)
        this.onChatSelected.next({
          chatCollection,
          contact
        });
        this.collectionLoading = false;
        return of(chatCollection);
      })
    );
    // return this.http.get<ChatCollection>(`api/chat-collections/${chatId}`);
  }

  getAllChats(): Observable<ChatCollection[]> {
    return of(ChatDB.chatCollection)
    // return this.http.get<ChatCollection[]>('api/chat-collections');
  }
  getChatHistory(): Observable<ChatHistory> {
    return of(ChatDB.chatHistory)
    // return this.http.get<ChatCollection[]>('api/chat-collections');
  }
  getCurrentUser(): Observable<User> {
    return of(ChatDB.user[0]);
    // return this.http.get<User>('api/chat-user').pipe(map((res) => res[0]));
  }
  updateUser(user: User): Observable<User> {
    return of(ChatDB.user[0]);
    // return this.http.put<User>(`api/chat-user/${user.id}`, { ...user });
  }
  updateChats(chatId: string, chats: Chat[], lastMessage: Chat): Observable<ChatCollection> {
    const chatCollection: ChatCollection = {
      id: chatId,
      chats,
      lastMessage
    };
    ChatDB.chatCollection.map((coll) => {
      if(coll.id == chatId) {
        coll.chats = [...chats]
      }
      return coll;
    });

    return of(ChatDB.chatCollection.find(coll => coll.id == chatId));
    // return this.http.put<ChatCollection>('api/chat-collections', chatCollection);
  }

  autoReply(chat) {
    setTimeout(() => {
      this.onChatsUpdated.next(chat);
    }, 1500);
  }
}
