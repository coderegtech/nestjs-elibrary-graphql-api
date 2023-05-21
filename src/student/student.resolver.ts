import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { Student } from './entities/student.entity';
import { StudentService } from './student.service';

@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) { }

  @Mutation(() => Student)
  createStudent(@Args('createStudentInput') createStudentInput: CreateStudentInput) {
    return this.studentService.addStudent(createStudentInput);
  }

  @Query(() => [Student], { name: 'students' })
  findAll() {
    return this.studentService.getAllStudent()
  }

  @Query(() => [Student], { name: 'searchStudent' })
  findOne(@Args('name', { type: () => String }) name: string) {
    return this.studentService.searchStudent(name);
  }

  @Mutation(() => Student)
  updateStudent(@Args('updateStudentInput') updateStudentInput: UpdateStudentInput) {
    return this.studentService.updateOneStudent(updateStudentInput.sid, updateStudentInput);
  }

  @Mutation(() => Student)
  removeStudent(@Args('id', { type: () => Int }) id: number) {
    return this.studentService.remove(id);
  }
}
