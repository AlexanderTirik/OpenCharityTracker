import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OnEvent } from '@nestjs/event-emitter';
import { Events, SocketEvents } from '../common/constants';
import { ITransactionInitiatedEvent } from '../interfaces/events';

@WebSocketGateway({ cors: true })
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;
  private clientProjectHashMap: Record<string, string> = {};

  public handleConnection(client: Socket): any {
    try {
      const projectId = client.handshake.query.projectId as string;
      const clientId = client.id;
      this.clientProjectHashMap[clientId] = projectId;
    } catch (e) {
      console.error('handling connection failed', e);
    }
  }

  public handleDisconnect(client: any): any {
    delete this.clientProjectHashMap[client.id];
  }

  @OnEvent(Events.TRANSACTION_INITIATED)
  public handleTransactionInitiatedEvent(
    payload: ITransactionInitiatedEvent,
  ): void {
    console.log(payload);
    const clientData = Object.entries(this.clientProjectHashMap).find(
      ([clientId, projectId]) => projectId === payload.projectId,
    );

    console.log(clientData);

    if (clientData) {
      const [clientId] = clientData;

      this.server
        .to(clientId)
        .emit(SocketEvents.TRANSACTION_INITIATED, payload.amount);
    }
  }
}
