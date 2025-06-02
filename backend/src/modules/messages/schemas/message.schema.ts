import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  ORDER_UPDATE = 'order_update',
  SYSTEM = 'system',
}

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  senderId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  recipientId: string;

  @Prop({ required: true, enum: MessageType, default: MessageType.TEXT })
  type: MessageType;

  @Prop({ required: true })
  content: string;

  @Prop({ type: Boolean, default: false })
  isRead: boolean;

  @Prop({ type: Date })
  readAt: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Order' })
  orderId: string;

  @Prop({ type: Object })
  metadata: Record<string, any>;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

// Add indexes for better query performance
MessageSchema.index({ senderId: 1, recipientId: 1 });
MessageSchema.index({ orderId: 1 });