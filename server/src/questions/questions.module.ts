import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsService } from './questions.service';
import { Question, QuestionSchema } from './schemas/question.schema';
import { UserQuestions, UserQuestionsSchema } from './schemas/userQuestions.schema';
import { QuestionsConverter } from './questions.converter';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Question.name,
                schema: QuestionSchema,
            },
            {
                name: UserQuestions.name,
                schema: UserQuestionsSchema,
            },
        ]),
    ],
    controllers: [QuestionsController],
    providers: [QuestionsService, QuestionsConverter],
    exports: [QuestionsService, QuestionsConverter],
})
export class QuestionsModule {}
