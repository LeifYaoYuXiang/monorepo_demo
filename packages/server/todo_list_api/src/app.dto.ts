import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class TodoDTO {
  // Validates for a non-empty string
  @IsString()
  @IsNotEmpty()
  public content: string;
}
