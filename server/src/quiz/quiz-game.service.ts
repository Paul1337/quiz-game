import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { QuestionsService } from 'src/questions/questions.service';
import { QuestionResponse } from 'src/questions/responses/question.response';
import {
    GLOBAL_DIFFICULTY_K,
    QuestionsDifficulties,
    QuizConfigs,
    SERVER_LATENCY_ERROR_MS,
} from './config/quiz.config';
import { AnswerQuizDto } from './dto/answer-quiz.dto';
import { EndQuizDto } from './dto/end-quiz.dto';
import { GetNextQuestionDto } from './dto/get-next-question.dto';
import { StartQuizDto } from './dto/start-quiz.dto';
import { QuizDifficulty } from './enums/quiz-difficulty.enum';
import { EndQuizReason } from './enums/quiz-end-reason.enum';
import { QuizType } from './enums/quiz-type.enum';
import { Quiz } from './schemas/quiz.schema';
import { AnswerQuizQuestionResponse } from './responses/answer-quiz-question.response';
import { GetNextQuestionResponse } from './responses/get-next-question.response';
import { StartQuizResponse } from './responses/start-quiz.response';
import { Question, QuestionDocument } from 'src/questions/schemas/question.schema';
import { QuestionsConverter } from 'src/questions/questions.converter';

@Injectable()
export class QuizGameService {
    constructor(
        private questionsService: QuestionsService,
        private questionsConverter: QuestionsConverter,
    ) {}

    async startQuiz(startQuizDto: StartQuizDto, userId: string): Promise<StartQuizResponse> {
        const firstQuestion = await this.getQuestionForQuiz(startQuizDto.difficulty, userId);
        const quizConfig = QuizConfigs[startQuizDto.type];
        const newQuiz = new this.quizModel({
            stage: 1,
            points: 0,
            length: quizConfig.length,
            type: startQuizDto.type,
            difficulty: startQuizDto.difficulty,
            userId: new Types.ObjectId(userId),
            currentQuestion: firstQuestion._id,
            questionDifficulty: firstQuestion.difficulty,
            roundDifficulty: quizConfig.roundDifficulty,
            isFinished: false,
            questionWasAnswered: false,
        });
        await newQuiz.save();

        return {
            quizId: newQuiz._id.toString(),
            quizConfig,
        };
    }

    async endQuiz(endQuizDto: EndQuizDto, userId: string) {
        await this.quizModel.updateOne(
            {
                _id: new Types.ObjectId(endQuizDto.quizId),
                userId: new Types.ObjectId(userId),
            },
            {
                isFinished: true,
                endReason: endQuizDto.reason,
            },
        );
    }

    async answerQuizQuestion(
        answerQuizDto: AnswerQuizDto,
        userId: string,
    ): Promise<AnswerQuizQuestionResponse> {
        const quiz = await this.quizModel.findOne({
            _id: new Types.ObjectId(answerQuizDto.quizId),
            userId: new Types.ObjectId(userId),
        });
        if (!quiz) throw new BadRequestException('No quiz found');
        if (quiz.stage === quiz.length || quiz.isFinished)
            throw new ForbiddenException('Quiz was finished!');

        if (quiz.questionWasAnswered)
            throw new ForbiddenException('Attempt to answer the same question second time!');

        const timeDelta = Date.now() - (quiz.questionRequestedAt?.getTime() ?? 0);
        const answerTime = QuizConfigs[quiz.type].questionTime * 1000;
        if (timeDelta > answerTime + SERVER_LATENCY_ERROR_MS)
            throw new ForbiddenException('Question answer timeout');

        const questionId = quiz.currentQuestion as Types.ObjectId;
        const { isRight } = await this.questionsService.checkQuestionAnswer(
            {
                answer: answerQuizDto.answer,
                questionId: questionId.toString(),
            },
            userId,
        );

        let endReason: EndQuizReason | null = null;

        if (quiz.stage + 1 === quiz.length) {
            endReason = EndQuizReason.AllAnswered;
        } else if (quiz.type === QuizType.FirstMistake && !isRight) {
            endReason = EndQuizReason.RoundFailure;
        }

        let isFinished = endReason !== null;

        let nextQuestion: null | QuestionResponse = null;
        if (!isFinished) {
            try {
                nextQuestion = await this.getQuestionForQuiz(quiz.difficulty, userId);
            } catch (err) {
                isFinished = true;
                endReason = EndQuizReason.NoQuestion;
            }
        }

        if (isFinished) {
            // учесть заработанные баллы в данные игрока
            // учесть статистику игры в данные игрока
        }

        const scoreAward = isRight
            ? Math.floor(quiz.roundDifficulty * quiz.questionDifficulty * GLOBAL_DIFFICULTY_K * 10) / 10
            : 0;
        await quiz.updateOne({
            $inc: {
                stage: 1,
                points: scoreAward,
                roundDifficulty:
                    quiz.type === QuizType.FirstMistake
                        ? QuizConfigs[quiz.type].roundSpecific.roundDifficultyImproves
                        : 0,
            },
            currentQuestion: isFinished ? '' : nextQuestion?._id,
            questionDifficulty: nextQuestion?.difficulty,
            isFinished,
            endReason,
            questionWasAnswered: true,
        });

        return {
            isFinished,
            isRight,
            scoreAward,
        };
    }

    async getNextQuestion(
        getNextQuestionDto: GetNextQuestionDto,
        userId: string,
    ): Promise<GetNextQuestionResponse> {
        const quiz = await this.quizModel
            .findOne({
                _id: new Types.ObjectId(getNextQuestionDto.quizId),
                userId: new Types.ObjectId(userId),
            })
            .populate('currentQuestion');

        if (quiz.isFinished || !quiz.currentQuestion)
            throw new BadRequestException('Quiz does not have next question!');

        // const question = await this.questionsService.findOne({
        //     _id: quiz.currentQuestion,
        // });

        await quiz.updateOne({
            questionRequestedAt: new Date(),
            questionWasAnswered: false,
        });

        return {
            question: this.questionsConverter.mapQuestionDocumentToResponse(
                quiz.currentQuestion as QuestionDocument,
            ),
        };
    }

    async getQuestionForQuiz(difficulty: QuizDifficulty, userId: string) {
        const difficultyRange = QuestionsDifficulties[difficulty];
        return this.questionsService.getQuestion(
            {
                minDifficulty: difficultyRange[0],
                maxDifficulty: difficultyRange[1],
            },
            userId,
        );
    }
}
