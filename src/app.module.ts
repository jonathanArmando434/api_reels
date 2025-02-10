import { Module } from '@nestjs/common';
import { ReelsModule } from './reels/reels.module';

@Module({
  imports: [ReelsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
