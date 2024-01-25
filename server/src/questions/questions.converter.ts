import { Injectable } from '@nestjs/common';
import { QuestionDocument } from './schemas/question.schema';
import { QuestionResponse } from './responses/question.response';
import { LibService } from 'src/lib/lib.service';

@Injectable()
export class QuestionsConverter {
    constructor(private libService: LibService) {}

    mapQuestionDocumentToResponse(question: QuestionDocument): QuestionResponse {
        const options = question.options.concat(question.rightAnswer);
        this.libService.mixArray(options);

        return {
            _id: question._id.toString(),
            difficulty: question.difficulty,
            options,
            text: question.text,
        };
    }
}
