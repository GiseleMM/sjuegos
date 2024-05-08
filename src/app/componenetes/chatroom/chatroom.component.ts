import { Component } from '@angular/core';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-chatroom',
  standalone: true,
  imports: [ChatComponent],
  templateUrl: './chatroom.component.html',
  styleUrl: './chatroom.component.css'
})
export class ChatroomComponent {

}
