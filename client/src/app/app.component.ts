import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatModel } from './models/chat.model';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';


  chat$!:  Observable<any>;
  prevChat$!: Observable<any>;
  prevMessages: ChatModel[] = [];
  messages: ChatModel[] = [];
  roomId:string = '';
  newMessage: string = '';
  username: string = '';

  @ViewChild('send') send!: ElementRef;

  constructor(private chatService: ChatService){}



  joinRoom(roomId: string){
    if(roomId || this.username){
      console.log(`Already join in: ${roomId}`);
      this.prevChat$ = this.chatService.getPrevMessagesByRoomId(roomId);
      this.prevChat$.subscribe((message: any) => { this.prevMessages = message});
      console.log(this.prevMessages);
      this.chat$ = this.chatService.getMessageByRoomId(roomId);
      this.chat$.subscribe((message: any) => { this.messages.push(message) });
    }else{
      window.alert('Please enter a room id and username');
    }
  }

  sendMessage(){
    let newMessageData: ChatModel = {
      roomId: this.roomId,
      data: this.send.nativeElement.value,
      date: Date.now(),
      from: this.username
    }
    if(newMessageData.data != ''){
      this.chatService.sendMessageByRoom(newMessageData,this.roomId);
      this.send.nativeElement.value = '';
      return;
    }
    return;
  }
}
