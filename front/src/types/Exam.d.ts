// TAGether - Share self-made exam for classmates
// Exam.ts
//
// CopyRight (c) 2020-2021 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT SUSHI-WARE License.
//

import ExamType from './ExamType';

interface Exam {
  type?:    ExamType
  question: string
  answer:   string[]
  comment?: string
}

export default Exam;
