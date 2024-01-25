import { QuestionResponse } from 'src/questions/responses/question.response';

export interface GetNextQuestionResponse {
    question: QuestionResponse | null;
}
