import { InputData } from '../../../shared/ui/FormComponents/Form/Form';
import { FormInputVariant } from '../../../shared/ui/FormComponents/FormInput/FormInput';

export const FormInputs: InputData[] = [
    {
        key: 'text',
        as: FormInputVariant.Textarea,
        label: 'текст вопроса',
    },
    {
        key: 'rightAnswer',
        label: 'правильный ответ',
    },
    {
        key: 'opt1',
        label: 'другой вариант 1',
    },
    {
        key: 'opt2',
        label: 'другой вариант 2',
    },
    {
        key: 'opt3',
        label: 'другой вариант 3',
    },
    {
        key: 'difficulty',
        type: 'number',
        label: 'сложность (1 - 10)',
    },
];
