import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatService } from './servcices/chat/chat.service';
import { ChatController } from './controllers/chat/chat.controller';
import { Message, MessageSchema } from './schemas/messageDoc.schema';

@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://admin:admin@cluster0.mmzuuoo.mongodb.net/chat"),
  MongooseModule.forFeature([{name: Message.name, schema: MessageSchema}])],
  controllers: [AppController, ChatController],
  providers: [AppService, ChatGateway, ChatService],
})
export class AppModule {}


