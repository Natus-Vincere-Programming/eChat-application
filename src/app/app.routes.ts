import {Routes} from '@angular/router';
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {RegistrationPageComponent} from "./pages/registration-page/registration-page.component";
import {MessageComponent} from "./message/message.component";
import {ChatComponentComponent} from "./pages/chat-component/chat-component.component";

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'register',
    component: RegistrationPageComponent
  },
  {
    path: 'chat',
    component: ChatComponentComponent
  }
];
