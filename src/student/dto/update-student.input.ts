import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateStudentInput } from './create-student.input';

@InputType()
export class UpdateStudentInput extends PartialType(CreateStudentInput) {
  @Field(() => Int)
  sid: number

  @Field()
  student_name: string

  @Field()
  corporate_email: string

  @Field(() => Int)
  college_id: number

  @Field()
  address: string
}
