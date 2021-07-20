import {Quiz, QuestionType} from '../Type/quiz_type'

//shuffle Quiz
const shuffleArray = (array: any[])=>
    [...array].sort (()=>Math.random() - 0.5)

export const quizDetail = async(totalQuestions: number, level: string): Promise<QuestionType[]> => {
    const response = await fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&difficulty=${level}&type=multiple`)
    let {results} = await response.json();
    // return results;

    const quiz: QuestionType[] = results.map((questionObj: Quiz)=>{
        return {
            questions: questionObj.question,
            answer: questionObj.correct_answer,
            correct_answer: questionObj.correct_answer, 
            option: shuffleArray (questionObj.incorrect_answers.concat(questionObj.correct_answer))
        }
    })

    return quiz;
}