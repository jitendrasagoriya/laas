import { Exception } from './exception';
export class Application {
    id: string;
    appName: string;
    accessToken: string;
    description: string;
    access: string;
    onBoardTime: string;
    email: string;
    password: string;
    exception: Exception;
}
