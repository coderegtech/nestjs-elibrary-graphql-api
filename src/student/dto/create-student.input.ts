import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateStudentInput {
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
