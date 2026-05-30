import { Controller, Get } from '@nestjs/common';
import { HomeService } from './home.service';

@Controller('home')
export class HomeController {
  constructor(private readonly svc: HomeService) {}

  @Get()
  getHomeData() {
    return this.svc.getHomeData();
  }
}
