import { ChatModel } from './../models/chat.model';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  apiURL = 'http://localhost:3000/chat/';
  constructor(private socket: Socket, private http: HttpClient) {}


  getPrevMessagesByRoomId(roomId: string){
    return this.http.get(`${this.apiURL}getAll/${roomId}`);
    // const channel = `message - ${roomId}`;
    // return this.socket.fromEvent(channel);
  }


  getMessageByRoomId(roomId: string){
    const channel = `message - ${roomId}`;
    this.http.get(`${this.apiURL}/getOne/${roomId}`)
    return this.socket.fromEvent(channel);
  }


  sendMessageByRoom(message: ChatModel,id: string){
      this.socket.emit('message', message);
      return this.http.post(`${this.apiURL}send`, message);
  }
}
