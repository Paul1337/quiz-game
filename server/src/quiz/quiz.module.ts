import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Quiz, QuizSchema } from './schemas/quiz.schema';
import { QuestionsModule } from 'src/questions/questions.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Quiz.name,
                schema: QuizSchema,
            },
        ]),
        QuestionsModule,
    ],
    controllers: [QuizController],
    providers: [QuizService],
})
export class QuizModule {}
