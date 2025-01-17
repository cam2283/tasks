import { Question, QuestionType } from "./interfaces/question";

/**
 * Create a new blank question with the given `id`, `name`, and `type`. The `body` and
 * `expected` should be empty strings, the `options` should be an empty list, the `points`
 * should default to 1, and `published` should default to false.
 */
export function makeBlankQuestion(
    id: number,
    name: string,
    type: QuestionType
): Question {
    return {
        id,
        name,
        type,
        body: "",
        expected: "",
        options: [],
        points: 1,
        published: false
    };
}

/**
 * Consumes a question and a potential answer, returning true if the answer is correct.
 * The answer is considered correct if it matches the expected answer, ignoring case and whitespace.
 */
export function isCorrect(question: Question, answer: string): boolean {
    return question.expected.trim().toLowerCase() === answer.trim().toLowerCase();
}

/**
 * Validates the answer based on the question type.
 */
export function isValid(question: Question, answer: string): boolean {
   if (question.type === "short_answer_question") {
        return true;
    } else if (question.type === "multiple_choice_question") {
        return question.options.includes(answer);
    }
    return false;
}

/**
 * Returns a short form of the question combining the `id` and the first 10 characters of the `name`.
 */
export function toShortForm(question: Question): string {
    return `${question.id}: ${question.name.substring(0, 10)}`;
}

/**
 * Returns a formatted string representation of the question.
 */
export function toMarkdown(question: Question): string {
        let markdown = `# ${question.name}\n${question.body}`;
    if (question.type === "multiple_choice_question") {
        markdown += "\n" + question.options.map(option => `- ${option}`).join("\n");
    }
    return markdown;
}

/**
 * Returns a new question with the updated name.
 */
export function renameQuestion(question: Question, newName: string): Question {
    return { ...question, name: newName };
}

/**
 * Toggles the `published` status of the question.
 */
export function publishQuestion(question: Question): Question {
        return { ...question, published: !question.published };
}

/**
 * Creates a copy of the question with a new name and reset the `published` status.
 */
export function duplicateQuestion(id: number, oldQuestion: Question): Question {
    return {
        ...oldQuestion,
        id,
        name: `Copy of ${oldQuestion.name}`,
        published: false
    };
}

/**
 * Adds a new option to the question's options list.
 */
export function addOption(question: Question, newOption: string): Question {
    return {
        ...question,
        options: [...question.options, newOption]
    };
}

/**
 * Creates a new question using fields from two different questions.
 */
export function mergeQuestion(
    id: number,
    name: string,
    contentQuestion: Question,
    { points }: { points: number }
): Question {
       return {
        ...contentQuestion,
        id,
        name,
        points,
        published: false
    };
}