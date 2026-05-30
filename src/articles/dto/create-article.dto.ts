import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsIn,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class CreateArticleDto {
  @IsString() @MinLength(3) slug!: string;
  @IsString() @MinLength(3) title!: string;
  @IsString() categorySlug!: string;

  @IsOptional() @IsString() excerpt?: string;
  @IsOptional() @IsString() content?: string;
  @IsOptional() @IsUrl() thumbnail?: string;
  @IsOptional() @IsString() author?: string;
  @IsOptional() @IsString() articleType?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) tags?: string[];
  @IsOptional() @IsIn(['published', 'draft']) status?: 'published' | 'draft';
  @IsOptional() @IsBoolean() isFeatured?: boolean;
  @IsOptional() @IsDateString() publishedAt?: string;
}
