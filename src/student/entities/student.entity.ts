import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Student {
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

  @Field()
  date_add: Date
}
