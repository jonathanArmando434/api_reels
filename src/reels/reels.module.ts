import { Module } from '@nestjs/common';
import { ReelsController } from './reels.controller';
import { ReelsService } from './reels.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // Diretório para armazenar vídeos
    }),
  ],
  controllers: [ReelsController],
  providers: [ReelsService],
})
export class ReelsModule {}