import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OnEvent } from '@nestjs/event-emitter';
import { Events, SocketEvents } from '../common/constants';
import {
  ITransactionFinalizedEvent,
  ITransactionInitiatedEvent,
} from '../interfaces/events';

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
    const clientData = Object.entries(this.clientProjectHashMap).find(
      ([_clientId, projectId]) => projectId === payload.projectId,
    );

    if (clientData) {
      const [clientId] = clientData;

      this.server.to(clientId).emit(SocketEvents.TRANSACTION_INITIATED, {
        amount: payload.amount,
        id: payload.id,
      });
    }
  }

  @OnEvent(Events.TRANSACTION_FINALIZED)
  public handleTransactionFinalizedEvent(
    payload: ITransactionFinalizedEvent,
  ): void {
    const clientData = Object.entries(this.clientProjectHashMap).find(
      ([_clientId, projectId]) => projectId === payload.projectId,
    );

    if (clientData) {
      const [clientId] = clientData;

      this.server.to(clientId).emit(SocketEvents.TRANSACTION_FINALIZED, {
        id: payload.id,
        transactionSignature: payload.transactionSignature,
      });
    }
  }
}
