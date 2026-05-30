import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Article } from '../articles/article.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'text',
    unique: true,
  })
  slug!: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'text' })
  nameVi!: string;

  @Column({
    type: 'text',
    default: '#E8435A',
  })
  color!: string;

  @OneToMany(() => Article, (a) => a.category)
  articles!: Article[];
}
