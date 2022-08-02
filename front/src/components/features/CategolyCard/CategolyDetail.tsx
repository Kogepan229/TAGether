// TAGether - Share self-made exam for classmates
// CategolyDetail.tsx
//
// CopyRight (c) 2020-2022 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT SUSHI-WARE License.
//
import css from './CategolyDetail.module.scss';
import Router from 'next/router';
import React from 'react';
import Button from '@/common/Button/Button';
import ButtonContainer from '@/common/Button/ButtonContainer';
import Modal from '@/common/Modal/Modal';
import {SelectButton} from '@/common/SelectBox';
import Toast from '@/common/Toast/Toast';
import Tag from '@/features/TagContainer/TagContainer';
import ButtonInfo from '@mytypes/ButtonInfo';
import Categoly from '@mytypes/Categoly';

interface Props {
  data: Categoly;
  close: () => void;
}

export default function CategolyDetail(props: Props): React.ReactElement {
  const [isToastOpen, SetIsToastOpen] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isExamShuffleEnabled, SetIsExamShuffleEnabled] = React.useState(false);
  const [isChoiceShuffleEnabled, SetIsChoiceShuffleEnabled] = React.useState(false);
  const [beginQuestion, SetBeginQuestion] = React.useState(0);
  const [endQuestion, SetEndQuestion] = React.useState(0);

  // スマホ対策
  const UpdateContainersHeight = (): void => {
    document.documentElement.style.setProperty('--container_height', (window.innerHeight / 100) * 90 + 'px');
  };
  UpdateContainersHeight();

  React.useEffect(() => {
    window.addEventListener('resize', UpdateContainersHeight);
    return () => window.removeEventListener('resize', UpdateContainersHeight);
  }, []);

  function Push(s: string): void {
    let url: string = '';
    switch (s) {
      case 'edit':
        url = `/edit?id=${props.data.id}`;
        break;
      case 'exam':
        url = `/exam?id=${props.data.id}`;
        if (isExamShuffleEnabled) {
          url += '&shuffle=true';
        }
        if (isChoiceShuffleEnabled) {
          url += '&choiceShuffle=true';
        }
        const begin = beginQuestion-1;
        const end = endQuestion-1;
        if (begin > 0 && end > 0) {
          // 範囲が正当かどうかのチェック
          // 同じ数字だった場合も1問だけにするので間違いにはならない
          if (begin <= end) {
            url += `&begin=${begin}&end=${end}`;
          } else {
            SetIsToastOpen(true);
          }
        } else {
          if (begin > 0) {
            url += `&begin=${begin}`;
          }
          if (end > 0) {
            url += `&end=${end}`;
          }
        }
        break;
      default:
        url = `/examtable?id=${props.data.id}`;
        break;
    }
    Router.push(url);
  }

  const Counter = (props: {text: string; value: number; setValue: (e: number) => void}) => (
    <div className={css.counter}>
      <span> {props.text} </span>
      <Button text='10' icon='fas fa-minus' onClick={() => props.setValue(props.value - 10)} type='material' />
      <Button text='1' icon='fas fa-minus' onClick={() => props.setValue(props.value - 1)} type='material' />
      <span className={css.value}> {props.value === 0 ? '-' : props.value} </span>
      <Button text='1' icon='fas fa-plus' onClick={() => props.setValue(props.value + 1)} type='material' />
      <Button text='10' icon='fas fa-plus' onClick={() => props.setValue(props.value + 10)} type='material' />
    </div>
  );

  // prettier-ignore
  const info: ButtonInfo[] = [
    {text: '閉じる',        icon: 'fas fa-times',      onClick: props.close,                type: 'material'},
    {text: '編集する',      icon: 'fas fa-pen',        onClick: () => Push('edit'),         type: 'material'},
    {text: '問題一覧',      icon: 'fas fa-list',       onClick: () => Push('table'),        type: 'material'},
    {text: '解答時の設定',  icon: 'fas fa-cog',        onClick: () => setIsModalOpen(true), type: 'material'},
    {text: 'この問題を解く',icon: 'fas fa-arrow-right',onClick: () => Push('exam'),         type: 'filled'},
  ];

  return (
    <>
      <div className={css.container}>
        <textarea disabled={true} value={props.data.title} id={css.title} />

        <div className={css.updated_at}>
          <span className='fas fa-clock' />
          <p>{props.data.updated_at?.slice(0, -5).replace('T', ' ')}</p>
        </div>

        <Tag tag={props.data.tag} />

        <textarea disabled={true} value={props.data.description} id={css.desc} />

        <ButtonContainer>
          {info.map(e => (
            <Button key={`categolydetail_${e.text}`} {...e} />
          ))}
        </ButtonContainer>
      </div>

      <Modal isOpen={isModalOpen} close={() => setIsModalOpen(false)}>
        <div className={css.modal}>
          <p>設定は閉じてからも保持され、ページを離れると破棄されます。</p>

          <span className={css.head}>問題範囲の制限</span>
          <Counter text='最初の問題番号' value={beginQuestion} setValue={e => SetBeginQuestion(Math.max(0, e))} />
          <Counter text='最後の問題番号' value={endQuestion} setValue={e => SetEndQuestion(Math.max(0, e))} />

          <span className={css.head}>シャッフル</span>
          <p>
            問題範囲を制限してからシャッフルが行われます。
            <br />
            （シャッフルされた問題から範囲制限を行うわけではありません）
          </p>
          <SelectButton
            type='single'
            status={isExamShuffleEnabled}
            desc='問題順をシャッフル'
            onChange={SetIsExamShuffleEnabled}
          />
          <SelectButton
            type='single'
            status={isChoiceShuffleEnabled}
            desc='選択問題の選択肢をシャッフル'
            onChange={SetIsChoiceShuffleEnabled}
          />

          <div className={css.button_container}>
            <Button text='閉じる' icon='fas fa-times' onClick={() => setIsModalOpen(false)} type='material'></Button>
            <Button text='この問題を解く' icon='fas fa-arrow-right' onClick={() => Push('exam')} type='filled' />
          </div>
        </div>
      </Modal>
      <Toast
        id='range_invalid_notice'
        isOpen={isToastOpen}
        close={() => SetIsToastOpen(false)}
        icon='fas fa-bell'
        text='範囲指定が不正です。最初の問題番号<=最後の問題番号になるように設定してください。'
      />
    </>
  );
}
