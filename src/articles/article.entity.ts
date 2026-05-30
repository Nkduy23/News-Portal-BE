import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../categories/category.entity';

export type ArticleStatus = 'published' | 'draft';

@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  slug!: string;

  @Column()
  title!: string;

  @Column({ type: 'text', nullable: true })
  excerpt!: string | null;

  @Column({ type: 'text', nullable: true })
  content!: string | null;

  @Column({ type: 'text', nullable: true })
  thumbnail!: string | null;

  @Column({ type: 'text', nullable: true })
  author!: string | null;

  @Column({ type: 'text', nullable: true })
  articleType!: string | null;

  @Column({ type: 'simple-array', nullable: true })
  tags!: string[];

  @Column({
    type: 'text',
    default: 'published',
  })
  status!: ArticleStatus;

  @Column({ default: false })
  isFeatured!: boolean;

  @Column({ type: 'datetime' })
  publishedAt!: Date;

  // Denormalized for fast queries
  @Column()
  categorySlug!: string;

  @Column()
  categoryName!: string;

  @ManyToOne(() => Category, (c) => c.articles, {
    onDelete: 'CASCADE',
  })
  category!: Category;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
