import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

/**
 * Chat class which holds the code for chat page components
 */
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  // Received message variable
  newMessage: string = '';
  // List of messages array
  messageList: string[] = [];
  // List of users array
  users: string[] = [];

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    let userName = localStorage.getItem('fullName') ?? '';
    // Subscriber for chat service message listener 
    this.chatService.getNewMessage().subscribe((message: string) => {
      var messageToSend = ''
      if (message === "") {
        messageToSend = userName + ' joined the chat room'
      } else {
        messageToSend = message
      }
      this.addUser(message);
      this.messageList.push(messageToSend);
    });
  }

  /**
   * addUser Function which handles new added users to the chat room
   * @param message 
   */
  private addUser(message: string) {
    const words = message.split(': ');
    let user = words[0];
    if (!this.users.includes(user) && user.length > 0) {
      this.users.push(user);
    }
  }

  /**
   * getTextColor Function which choose random color depends on the user naem for the chat 
   * @returns chat color
   */
  getTextColor = () => {
    let userName = this.messageList[this.messageList.length - 1].split(': ')[0];
    const COLORS = [
      '#e21400', '#91580f', '#f8a700', '#f78b00',
      '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
      '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
    ];
    // Compute hash code
    let hash = 7;
    for (let i = 0; i < userName.length; i++) {
      hash = userName.charCodeAt(i) + (hash << 5) - hash;
    }
    // Calculate color
    const index = Math.abs(hash % COLORS.length);
    return COLORS[index];
  }

  /**
   * sendMessage Function which emit the user message to the service
   */
  sendMessage() {
    let userName = localStorage.getItem('fullName') ?? '';
    let final = userName + ': ' + this.newMessage
    this.chatService.sendMessage(final);
    this.newMessage = '';
  }
}
