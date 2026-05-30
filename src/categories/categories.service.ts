import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private repo: Repository<Category>) {}

  findAll() {
    return this.repo.find({ order: { name: 'ASC' } });
  }

  async findBySlug(slug: string) {
    const cat = await this.repo.findOne({ where: { slug } });
    if (!cat) throw new NotFoundException(`Category "${slug}" not found`);
    return cat;
  }

  create(dto: CreateCategoryDto) {
    const cat = this.repo.create(dto);
    return this.repo.save(cat);
  }

  async update(id: string, dto: Partial<CreateCategoryDto>) {
    await this.repo.update(id, dto);
    return this.repo.findOneByOrFail({ id });
  }

  async remove(id: string) {
    const cat = await this.repo.findOneByOrFail({ id });
    return this.repo.remove(cat);
  }
}
