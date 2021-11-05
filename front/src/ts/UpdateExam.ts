// TAGether - Share self-made exam for classmates
// UpdateExam.ts
//
// CopyRight (c) 2020-2021 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT SUSHI-WARE License.
//

import Exam from '../types/Exam';
import ExamType from '../types/ExamType';
import ExamOperateFunctionsType from '../types/ExamOperateFunctionsType';

export default function UpdateExam(updater: (e: Exam[]) => void, exam: Exam[]): ExamOperateFunctionsType {
  const exam_template: Exam = { type: 'Text', question: '', answer: [''], comment: '' };
  return {
    Exam: {
      Update: () => updater(exam),
      Insert: (at: number) => {
        exam.splice((at === -1) ? exam.length : at, 0, exam_template);
        updater(exam);
      },
      Remove: (i: number) => {
        if (exam.length === 1) return;
        exam.splice(i, 1);
        updater(exam);
      },
      Swap: (from: number, to: number) => {
        const tmp = exam[from];
        exam[from] = exam[to];
        exam[to] = tmp;
        updater(exam);
      },
    },
    Type: {
      Update: (i: number, value: ExamType) => {
        exam[i].type = value;
        updater(exam);
      }
    },
    Question: {
      Update: (i: number, value: string) => {
        exam[i].question = value;
        updater(exam);
      }
    },
    Comment: {
      Update: (i: number, value: string) => {
        exam[i].comment = value;
        updater(exam);
      }
    },
    Answer: {
      // i: Examのインデックス j: Answerのインデックス
      Update: (i: number, j: number, value: string) => {
        exam[i].answer[j] = value;
        updater(exam);
      },
      Remove: (i: number, j: number) => {
        exam[i].answer.splice(j, 1);
        updater(exam);
      },
      Insert: (i: number, at: number) => {
        exam[i].answer.splice((at === -1) ? exam[i].answer.length : at, 0, '');
        updater(exam);
      },
    },
  };
}
