// TAGether - Share self-made exam for classmates
// TagContainer.tsx
//
// CopyRight (c) 2020-2021 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT SUSHI-WARE License.
//
import css from '../style/TagContainer.module.scss';
import React from 'react';

interface TagData { tag: string }

export default function Tag(props: TagData): React.ReactElement {
  const tags: React.ReactElement[] = [];
  props.tag.split(',').forEach((e, i) => {
    tags.push(
      <div key={`tagitem_${i}`} className={css.tag} onClick={e => e.stopPropagation()}>
        <span>{e}</span>
      </div>);
  });
  return (
    <div className={css.tag_container}> {tags} </div>
  );
}
