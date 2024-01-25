import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from './schemas/question.schema';
import { Model, Types } from 'mongoose';
import { GetQuestionDto } from './dto/get-question-dto';
import { UserQuestions } from './schemas/userQuestions.schema';
import { AnswerQuestionDto } from './dto/answer-question-dto';
import { QuestionResponse } from './responses/question.response';
import { QuestionsConverter } from './questions.converter';
import { CheckQuestionAnswerResponse } from './responses/check-question-answer.response';
import { Errors } from './constants/error.constants';

@Injectable()
export class QuestionsService {
    constructor(
        @InjectModel(Question.name) private questionModel: Model<Question>,
        @InjectModel(UserQuestions.name) private userQuestionsModel: Model<UserQuestions>,
        private questionsConverter: QuestionsConverter,
    ) {}

    async findOne(findOneDto: Record<string, any>): Promise<QuestionResponse> {
        const questionDocument = await this.questionModel.findOne(findOneDto);
        return this.questionsConverter.mapQuestionDocumentToResponse(questionDocument);
    }

    async createQuestion(createQuestionDto: CreateQuestionDto, userId: string) {
        const newQuestion = new this.questionModel({
            author: new Types.ObjectId(userId),
            difficulty: createQuestionDto.difficulty,
            options: createQuestionDto.options,
            rightAnswer: createQuestionDto.rightAnswer,
            text: createQuestionDto.text,
        });
        await newQuestion.save();
        return newQuestion;
    }

    async getQuestion(getQuestionDto: GetQuestionDto, userId: string): Promise<QuestionResponse> {
        const userQuestions = await this.userQuestionsModel.findOne({
            userId: new Types.ObjectId(userId),
        });
        const questions = await this.questionModel.find({
            _id: {
                $nin: userQuestions?.questionsIds ?? [],
            },
            difficulty: {
                $gte: getQuestionDto.minDifficulty,
                $lte: getQuestionDto.maxDifficulty,
            },
        });

        if (questions.length === 0) {
            if (getQuestionDto.minDifficulty === 1 && getQuestionDto.maxDifficulty === 10) {
                throw new InternalServerErrorException(Errors.NoQuestion);
            } else {
                console.log('Could not find any, fallbacking to any difficulty');
                return this.getQuestion(
                    {
                        minDifficulty: 1,
                        maxDifficulty: 10,
                    },
                    userId,
                );
            }
        }

        const randomQuestionInd = Math.floor(Math.random() * questions.length);
        const randomQuestion = questions[randomQuestionInd];

        await this.userQuestionsModel.updateOne(
            {
                userId: new Types.ObjectId(userId),
            },
            {
                $push: {
                    questionsIds: randomQuestion._id,
                },
            },
            {
                upsert: true,
            },
        );

        return this.questionsConverter.mapQuestionDocumentToResponse(randomQuestion);
    }

    async checkQuestionAnswer(
        answerQuestionDto: AnswerQuestionDto,
        userId: string,
    ): Promise<CheckQuestionAnswerResponse> {
        const userQuestions = await this.userQuestionsModel.findOne({
            userId: new Types.ObjectId(userId),
        });

        const questionOid = new Types.ObjectId(answerQuestionDto.questionId);
        if (!(userQuestions?.questionsIds ?? []).includes(questionOid)) {
            throw new ForbiddenException('Attempt to answer not user question');
        }

        const question = await this.questionModel.findOne(questionOid);
        return {
            isRight: question.rightAnswer === answerQuestionDto.answer,
        };
    }
}
