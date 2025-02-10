import { Controller, Post, Get, UploadedFile, UseInterceptors, Res, StreamableFile, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { ReelsService } from './reels.service';

@Controller('reels')
export class ReelsController {
  constructor(private readonly reelsService: ReelsService) {}

  // Rota para carregar um vídeo
  @Post('upload')
  @UseInterceptors(FileInterceptor('video'))
  async uploadVideo(@UploadedFile() file: Express.Multer.File) {
    return this.reelsService.uploadVideo(file);
  }

  // Rota para obter todos os vídeos
  @Get('feed')
  async getFeed() {
    return this.reelsService.getFeed();
  }

  // Rota para reproduzir um vídeo específico
  @Get('videos/:filename')
  async serveVideo(@Res() res, @Param('filename') filename: string) {
    const videoPath = join(process.cwd(), 'uploads', filename);
    const fileStream = createReadStream(videoPath);

    res.set({
      'Content-Type': 'video/mp4',
      'Content-Disposition': `inline; filename="${filename}"`,
    });

    fileStream.pipe(res);
  }
}