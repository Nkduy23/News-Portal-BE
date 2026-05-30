import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../articles/article.entity';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(Article) private articleRepo: Repository<Article>,
  ) {}

  private fetchSection(categorySlug: string, limit: number) {
    return this.articleRepo.find({
      where: { categorySlug, status: 'published' },
      order: { publishedAt: 'DESC' },
      take: limit,
    });
  }

  async getHomeData() {
    const [
      hero,
      datNuocVaoXuan,
      benChenTraXuan,
      sacMauGiaiTri,
      tetMuonNoi,
      khatVongViet,
      camNangTet,
      tetAroundTown,
      chucXuan,
    ] = await Promise.all([
      // Hero: featured articles, newest first
      this.articleRepo.find({
        where: { isFeatured: true, status: 'published' },
        order: { publishedAt: 'DESC' },
        take: 5,
      }),
      this.fetchSection('dat-nuoc-vao-xuan', 6),
      this.fetchSection('ben-chen-tra-xuan', 4),
      this.fetchSection('sac-mau-giai-tri', 6),
      this.fetchSection('tet-muon-noi', 3),
      this.fetchSection('khat-vong-viet', 3),
      this.fetchSection('cam-nang-tet', 3),
      this.fetchSection('tet-around-town', 5),
      this.fetchSection('chuc-xuan', 5),
    ]);

    return {
      hero,
      sections: {
        datNuocVaoXuan,
        benChenTraXuan,
        sacMauGiaiTri,
        tetMuonNoi,
        khatVongViet,
        camNangTet,
        tetAroundTown,
        chucXuan,
      },
    };
  }
}
