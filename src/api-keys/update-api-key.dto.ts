import { IsBoolean } from 'class-validator';

export class UpdateApiKeyDto {
  @IsBoolean()
  active: boolean;
}
