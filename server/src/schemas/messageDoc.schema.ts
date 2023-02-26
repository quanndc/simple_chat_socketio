import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop()
  roomId: string;

  @Prop()
  data: string;

  @Prop()
  date: string;

  @Prop()
  from: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
