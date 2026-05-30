import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class QueryArticleDto {
  @IsOptional() @IsString() category?: string; // categorySlug
  @IsOptional() @IsString() search?: string;
  @IsOptional() @IsIn(['published', 'draft']) status?: string;
  @IsOptional() @Transform(({ value }) => value === 'true') featured?: boolean;

  @IsOptional() @Type(() => Number) @IsInt() @Min(1) page?: number = 1;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(100) limit?: number =
    20;
}
