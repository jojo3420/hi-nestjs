import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getHome(): string {
    return 'this is nest Movie Api.';
  }

}
