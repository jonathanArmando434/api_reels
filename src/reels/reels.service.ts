import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import fs from 'fs';

@Injectable()
export class ReelsService {
  private uploadDir = join(process.cwd(), 'uploads');

  constructor() {
    if (!existsSync(this.uploadDir)) mkdirSync(this.uploadDir);
  }

  // Método para carregar um vídeo
  uploadVideo(file: Express.Multer.File): { message: string; videoUrl: string } {
    return {
      message: 'Vídeo carregado com sucesso!',
      videoUrl: `/api/reels/videos/${file.filename}`,
    };
  }

  // Método para obter todos os vídeos
  getFeed(): string[] {
    const videos: string[] = []; // Declara explicitamente o tipo do array
    for (const file of fs.readdirSync(this.uploadDir)) {
      videos.push(`/api/reels/videos/${file}`);
    }
    return videos;
  }
}