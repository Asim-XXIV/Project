import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MessagesService } from './messages.service';
import { WsJwtGuard } from './guards/ws-jwt.guard';
import { CreateMessageDto } from './dto/create-message.dto';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  },
})
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedClients: Map<string, string> = new Map();

  constructor(
    private messagesService: MessagesService,
    private jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token || 
                    client.handshake.headers.authorization?.split(' ')[1];
      
      if (!token) {
        client.disconnect();
        return;
      }
      
      const payload = this.jwtService.verify(token);
      const userId = payload.sub;
      
      this.connectedClients.set(client.id, userId);
      
      // Join a room specific to this user
      client.join(`user_${userId}`);
      
      console.log(`Client connected: ${client.id}, User: ${userId}`);
    } catch (error) {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.connectedClients.delete(client.id);
    console.log(`Client disconnected: ${client.id}`);
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('sendMessage')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() createMessageDto: CreateMessageDto,
  ) {
    const userId = this.connectedClients.get(client.id);
    
    if (!userId) {
      return { error: 'Unauthorized' };
    }
    
    try {
      const message = await this.messagesService.create({
        ...createMessageDto,
        senderId: userId,
      });
      
      // Emit to recipient's room
      this.server.to(`user_${createMessageDto.recipientId}`).emit('newMessage', message);
      
      return { success: true, message };
    } catch (error) {
      return { error: error.message };
    }
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('markAsRead')
  async handleMarkAsRead(
    @ConnectedSocket() client: Socket,
    @MessageBody() { messageId }: { messageId: string },
  ) {
    const userId = this.connectedClients.get(client.id);
    
    if (!userId) {
      return { error: 'Unauthorized' };
    }
    
    try {
      const message = await this.messagesService.markAsRead(messageId, userId);
      return { success: true, message };
    } catch (error) {
      return { error: error.message };
    }
  }
}