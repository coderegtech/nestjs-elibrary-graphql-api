import { BadRequestException, Injectable } from '@nestjs/common';
import { Student } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async addStudent(student: CreateStudentInput): Promise<Student> {
    try {
      return await this.prisma.student.create({
        data: {
          sid: student.sid,
          student_name: student.student_name,
          corporate_email: student.corporate_email,
          college_id: student.college_id,
          address: student.address,
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async getAllStudent(): Promise<Student[]> {
    try {
      const results = await this.prisma.student.findMany({
        include: {
          colleges: true,
        },
      });
      console.log(results);

      return results;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async searchStudent(name: string): Promise<Student[]> {
    try {
      const results = await this.prisma.student.findMany({
        where: {
          student_name: {
            contains: name,
          },
        },
        include: {
          colleges: true,
        },
      });

      console.log(results);

      return results;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async updateOneStudent(
    id: number,
    updateStudentInput: UpdateStudentInput,
  ): Promise<Student> {
    try {
      return await this.prisma.student.update({
        where: { sid: id },
        data: { ...updateStudentInput },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async remove(id: number): Promise<Student> {
    try {
      return await this.prisma.student.delete({ where: { sid: id } });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
