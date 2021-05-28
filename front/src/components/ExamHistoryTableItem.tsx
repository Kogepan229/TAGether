// TAGether - Share self-made exam for classmates
// ExamHistoryTableItem.tsx
//
// CopyRight (c) 2020-2021 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT SUSHI-WARE License.
//

import css from '../style/ExamHistoryTableItem.module.scss';
import React from 'react';
import Modal from '../components/Modal';
import Detail from '../components/CategolyDetail';
import Categoly from '../types/Categoly';
import ModalData from '../types/ModalData';
import ExamHistory from '../types/ExamHistory';

interface Props {
  categoly: Categoly,
  item: ExamHistory
}

export default function ExamHistoryTableItem(props: Props) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  // Modalに渡す用のデータ
  const modalData: ModalData = {
    body: <Detail {...{ data: props.categoly, close: () => setIsModalOpen(false) }} />,
    isOpen: isModalOpen,
    close: () => setIsModalOpen(false),
  };
  const rate = Math.round((props.item.correct_count / props.item.total_question) * 10000) / 100;
  return (
    <tr>
      <td>{props.item.date}</td>
      <p className={css.categoly_link} onClick={() => { console.log('categoly is', props.categoly); setIsModalOpen(true) }}>
        {props.categoly.title}
      </p>
      <td>{props.item.total_question}問中{props.item.correct_count}問正解</td>
      <td>{isNaN(rate) ? 0 : rate}%</td>
      <Modal {...modalData} />
    </tr>
  );
}