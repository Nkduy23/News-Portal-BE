import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { QueryArticleDto } from './dto/query-article.dto';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article) private repo: Repository<Article>,
    private categoriesService: CategoriesService,
  ) {}

  async findAll(query: QueryArticleDto) {
    const { category, search, status, featured, page = 1, limit = 20 } = query;
    const qb = this.repo
      .createQueryBuilder('a')
      .orderBy('a.publishedAt', 'DESC');

    if (category) qb.andWhere('a.categorySlug = :category', { category });
    if (status) qb.andWhere('a.status = :status', { status });
    if (featured !== undefined)
      qb.andWhere('a.isFeatured = :featured', { featured });
    if (search) {
      qb.andWhere('(a.title LIKE :q OR a.excerpt LIKE :q OR a.tags LIKE :q)', {
        q: `%${search}%`,
      });
    }

    const [articles, total] = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data: articles,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findFeatured() {
    return this.repo.find({
      where: { isFeatured: true, status: 'published' },
      order: { publishedAt: 'DESC' },
      take: 5,
    });
  }

  async findById(id: string) {
    const article = await this.repo.findOne({ where: { id } });
    if (!article) throw new NotFoundException(`Article "${id}" not found`);
    return article;
  }

  async findBySlug(slug: string) {
    const article = await this.repo.findOne({ where: { slug } });
    if (!article) throw new NotFoundException(`Article "${slug}" not found`);
    return article;
  }

  async findRelated(slug: string, limit = 4) {
    const article = await this.findBySlug(slug);
    return this.repo
      .find({
        where: { categorySlug: article.categorySlug, status: 'published' },
        order: { publishedAt: 'DESC' },
        take: limit + 1,
      })
      .then((list) => list.filter((a) => a.slug !== slug).slice(0, limit));
  }

  async create(dto: CreateArticleDto) {
    const cat = await this.categoriesService.findBySlug(dto.categorySlug);
    const article = this.repo.create({
      ...dto,
      categoryName: cat.nameVi,
      publishedAt: dto.publishedAt ? new Date(dto.publishedAt) : new Date(),
    });
    return this.repo.save(article);
  }

  async update(id: string, dto: Partial<CreateArticleDto>) {
    const article = await this.repo.findOneByOrFail({ id });
    if (dto.categorySlug && dto.categorySlug !== article.categorySlug) {
      const cat = await this.categoriesService.findBySlug(dto.categorySlug);
      (dto as any).categoryName = cat.nameVi;
    }
    Object.assign(article, dto);
    return this.repo.save(article);
  }

  async setFeatured(id: string, isFeatured: boolean) {
    await this.repo.update(id, { isFeatured });
    return this.repo.findOneByOrFail({ id });
  }

  async remove(id: string) {
    const article = await this.repo.findOneByOrFail({ id });
    return this.repo.remove(article);
  }

  async getDashboardStats() {
    const total = await this.repo.count();
    const published = await this.repo.count({ where: { status: 'published' } });
    const draft = await this.repo.count({ where: { status: 'draft' } });
    const featured = await this.repo.count({ where: { isFeatured: true } });
    return { total, published, draft, featured };
  }
}
