import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { StartQuizDto } from './dto/start-quiz.dto';
import { RequestExtended } from 'src/auth/lib/request-extension';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { AnswerQuizDto } from './dto/answer-quiz.dto';
import { EndQuizDto } from './dto/end-quiz.dto';
import { GetNextQuestionDto } from './dto/get-next-question.dto';

@Controller('quiz')
export class QuizController {
    constructor(private quizService: QuizService) {}

    @Post('start')
    @Roles(Role.Player)
    async startQuiz(@Req() request: RequestExtended, @Body() startQuizDto: StartQuizDto) {
        return this.quizService.startQuiz(startQuizDto, request.user.id);
    }

    @Post('answerQuestion')
    @Roles(Role.Player)
    async answerQuesiton(@Req() request: RequestExtended, @Body() answerQuizQuestion: AnswerQuizDto) {
        return this.quizService.answerQuizQuestion(answerQuizQuestion, request.user.id);
    }

    @Get('nextQuestion')
    @Roles(Role.Player)
    async getNextQuestion(
        @Req() request: RequestExtended,
        @Query() getNextQuestionDto: GetNextQuestionDto,
    ) {
        return this.quizService.getNextQuestion(getNextQuestionDto, request.user.id);
    }

    @Post('end')
    @Roles(Role.Player)
    async endQuiz(@Req() request: RequestExtended, @Body() endQuizDto: EndQuizDto) {
        return this.quizService.endQuiz(endQuizDto, request.user.id);
    }
}
