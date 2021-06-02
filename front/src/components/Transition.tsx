// TAGether - Share self-made exam for classmates
// Transition.tsx
//
// CopyRight (c) 2020-2021 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT SUSHI-WARE License.
//
import React from 'react';
import Router from 'next/router';
import { gsap } from 'gsap';

interface Props {
  children: React.ReactElement
}

export default function Transition(props: Props): React.ReactElement {
  const [old_component, SetOldComponent] = React.useState<React.ReactElement>(<></>);
  const [is_transitioning, SetIsTransitioning] = React.useState(false);

  function ChangeStart(): void {
    SetIsTransitioning(true);
    const target = '#TransitionContainer';
    const duration = 1;

    const timeline = gsap.timeline();
    timeline
      .to(target, {
        duration: duration,
        opacity: 0,
        onComplete: () => {
          SetIsTransitioning(false);
        }
      })
      .to(target, {
        duration: duration,
        opacity: 1,
      }, '+=0.1'); // 0.1秒待機 (古いコンポーネントが見えないように)
  }

  React.useEffect(() => {
    Router.events.on('routeChangeStart', ChangeStart);
    return () => Router.events.off('routeChangeStart', ChangeStart);
  }, []);

  return (
    <>
      <div id='TransitionContainer'>
        {is_transitioning ? old_component : props.children}
      </div>
    </>
  );
}