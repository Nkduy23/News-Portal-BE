import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { QueryArticleDto } from './dto/query-article.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly svc: ArticlesService) {}

  // ── Public ────────────────────────────────────────────────────
  @Get()
  findAll(@Query() query: QueryArticleDto) {
    return this.svc.findAll(query);
  }

  @Get('featured')
  findFeatured() {
    return this.svc.findFeatured();
  }

  @Get('by-id/:id')
  findById(@Param('id') id: string) {
    return this.svc.findById(id);
  }

  // ── Dashboard ─────────────────────────────────────────────────
  @UseGuards(JwtAuthGuard)
  @Get('admin/stats')
  stats() {
    return this.svc.getDashboardStats();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.svc.findBySlug(slug);
  }

  @Get(':slug/related')
  findRelated(@Param('slug') slug: string, @Query('limit') limit?: number) {
    return this.svc.findRelated(slug, limit ? +limit : 4);
  }

  // ── Admin ─────────────────────────────────────────────────────
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateArticleDto) {
    return this.svc.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Partial<CreateArticleDto>) {
    return this.svc.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/featured')
  setFeatured(@Param('id') id: string, @Body('isFeatured') val: boolean) {
    return this.svc.setFeatured(id, val);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.svc.remove(id);
  }
}
