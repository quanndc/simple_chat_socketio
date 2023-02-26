import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import {Server} from 'socket.io';
import { ChatService } from 'src/servcices/chat/chat.service';

@WebSocketGateway({cors: true})
export class ChatGateway {

  constructor(private chatService: ChatService) {}
  @WebSocketServer() server: Server;


  handleConnection(client: any, ...args: any[]) {
    console.log(`Client ${client.id} connected`);
  }

  handleDisonnect(client: any, ...args: any[]) {
    console.log(`Client ${client.id} disconnected`); 
  }


  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    const roomId = payload.roomId;
    // console.log('message', payload);
    this.chatService.createMessage(payload);
    this.server.emit('message - '+ roomId, payload);
    return 'Hello world!';
  }
}
