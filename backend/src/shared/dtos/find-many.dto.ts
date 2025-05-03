import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export abstract class FindManyDTO {
  @ApiPropertyOptional({
    description: 'Number of elements that will appear in the list',
  })
  @IsOptional()
  @IsNumberString()
  public take?: number;

  @ApiPropertyOptional({ description: 'Pagination skip elements' })
  @IsOptional()
  @IsNumberString()
  public skip?: number;

  @ApiPropertyOptional({ description: 'Element key to sort by' })
  @IsString()
  @IsOptional()
  public orderBy?: string;

  @ApiPropertyOptional({ description: 'Meaning of ordination' })
  @IsString()
  @IsOptional()
  public ordering?: string;
}
