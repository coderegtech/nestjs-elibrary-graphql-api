import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Colleges } from 'src/borrow/entities/borrow.entity';

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

  @Field(() => [Colleges], { nullable: true })
  course: Colleges

}

