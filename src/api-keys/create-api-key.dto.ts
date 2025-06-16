import { IsOptional, IsISO8601 } from 'class-validator';
import { NameDto } from 'src/common/name.dto';

export class CreateApiKeyDto extends NameDto {
  @IsOptional()
  @IsISO8601()
  expiresAt?: string;
}
