import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { RequestExtended } from 'src/auth/lib/request-extension';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionsService } from './questions.service';
import { GetQuestionDto } from './dto/get-question-dto';

@Controller('questions')
export class QuestionsController {
    constructor(private readonly questionsService: QuestionsService) {}

    @Post('create')
    @Roles(Role.Admin)
    async createQuestion(@Req() req: RequestExtended, @Body() createQuestionDto: CreateQuestionDto) {
        return this.questionsService.createQuestion(createQuestionDto, req.user.id);
    }

    @Get()
    @Roles(Role.Player)
    async getQuestion(@Req() req: RequestExtended, @Query() getQuestionDto: GetQuestionDto) {
        return this.questionsService.getQuestion(getQuestionDto, req.user.id);
    }
}
