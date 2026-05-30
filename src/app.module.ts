import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ArticlesModule } from './articles/articles.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { Article } from './articles/article.entity';
import { Category } from './categories/category.entity';
import { SeedService } from './seed/seed.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'vov_news.db',
      entities: [Article, Category],
      synchronize: true,
      logging: false,
    }),

    TypeOrmModule.forFeature([Article, Category]),

    ArticlesModule,
    CategoriesModule,
    AuthModule,
    HomeModule,
  ],
  providers: [SeedService],
})
export class AppModule {}
