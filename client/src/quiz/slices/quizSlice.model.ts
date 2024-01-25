export interface QuestionScheme {
    text: string;
    options: string[];
    id: string;
}

export interface StatScheme {
    points: number;
    stage: number;
    mistakesCount: number;
}

export interface QuizConfig {
    questionTime: number;
    roundDifficulty: number;
    length: number;
    roundSpecific?: any;
}

export enum AnswerStatus {
    NotGiven = 'notGiven',
    IsRight = 'isRight',
    IsWrong = 'isWrong',
}

export enum EndQuizReason {
    Timedout = 'timedout',
    AllAnswered = 'allAnswered',
    NoQuestion = 'noQuestion',
    RoundFailure = 'roundFailure',
    Error = 'error',
}

export interface QuizSliceScheme {
    currentQuestion: QuestionScheme | null;
    stat: StatScheme;
    isLoadingQuestion: boolean;
    isFinished: boolean;
    isStarted: boolean;
    quizId: string;
    quizConfig: QuizConfig | null;
    answerStatus: AnswerStatus;
    endReason: EndQuizReason | null;
}
