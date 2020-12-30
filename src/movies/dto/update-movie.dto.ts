import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateMovieDto {

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsNumber()
  @IsOptional()
  year?: number;

  @IsNumber()
  @IsOptional()
  rating?: number;

  @IsOptional()
  @IsString({ each: true })
  genre?: string[];

}


import { PartialType } from '@nestjs/mapped-types'
import { CreateMovieDto } from './create-movie.dto';


/*
일반적으로 동일한 엔터티 유형에 대해 CreateDTO 및 UpdateDto 모두 빌드해야하는 실제 예제를 상상해 보겠습니다 .
CreateDTO 에는 모든 필드가 필요할 수 있지만 UpdateDto는 모든 필드를 "선택 사항"으로 만들 수 있습니다 .
말할 것도없이,이 두 유형은 엔티티 유형의 변형 일 수도 있습니다 (어느 정도까지).
그것은 많은 중복 코드입니다!
따라서 NestJS는 이제 유형 변환을 수행하는 여러 유틸리티 함수를 제공하여 이를 방지하고 삶을 조금 더 쉽게 만들 수 있습니다.
사용 가능한 매핑 유형 :
PartialType -입력 유형의 모든 속성이 "선택 사항"으로 설정된 유형 (클래스)을 반환합니다 (요구 사항 : 각 속성에 적어도 하나의 유효성 검사 데코레이터가 적용됨).
PickType -입력 유형에서 속성 집합을 선택하여 새로운 유형 (클래스)을 생성합니다.
OmitType -입력 유형에서 모든 속성을 선택한 다음 특정 키 세트를 제거하여 유형을 구성합니다.
IntersectionType -두 가지 유형을 하나의 새로운 유형 (클래스)으로 결합
이 기사 에서 더 많은 것을 읽으십시오 .
 */
// export class UpdateMovieDto extends PartialType(CreateMovieDto) {}


