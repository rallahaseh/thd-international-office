import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from "socket.io-client";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  // Message variable takes the user input
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  // Socket interface
  private socket = io(environment.SOCKET_ENDPOINT, {
    auth: {
      token: environment.SOCKET_TOKEN
    }
  });

  /**
   * sendMessage Function which used to emit users input through socket connection
   * @param message 
   */
  public sendMessage(message: any) {
    this.socket.emit('message', message);
  }

  /**
   * getNewMessage Function which used to receive users input through socket connection
   * @param message 
   */
  public getNewMessage = () => {
    this.socket.on('message', (message) => {
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };
}
