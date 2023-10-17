// import { Exclude, Expose } from 'class-transformer';
// import {
//   IsEnum,
//   IsNotEmpty,
//   IsNumber,
//   IsOptional,
//   IsPositive,
//   IsString,
// } from 'class-validator';
// import { ReportType } from 'src/mock/data';

// export class CreateReportDto {
//   @IsNumber()
//   @IsPositive()
//   amount: number;

//   @IsString()
//   @IsNotEmpty()
//   source: string;

//   @IsOptional()
//   @IsEnum(ReportType)
//   type: ReportType;
// }

// export class UpdateReportDto {
//   @IsOptional()
//   @IsNumber()
//   @IsPositive()
//   amount: number;

//   @IsOptional()
//   @IsString()
//   @IsNotEmpty()
//   source: string;
//   @IsOptional()
//   @IsEnum(ReportType)
//   type: ReportType;
// }

// export class ReportResponseDto {
//   id: string;
//   source: string;
//   amount: number;
//   created_at: Date;

//   @Exclude()
//   updated_at: Date;
//   type: ReportType;

//   @Expose({ name: 'createdAt' })
//   transformCreatedAt() {
//     return `${this.amount} ${this.source}`
//   }

//   constructor(partial: Partial<ReportResponseDto>) {
//     Object.assign(this, partial);
//   }
// }
