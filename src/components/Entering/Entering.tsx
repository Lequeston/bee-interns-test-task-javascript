import React from 'react';

import './Entering.scss';

type Props = {
  isEntering: boolean;
};
export const Entering: React.FC<Props> = ({ isEntering }) => {
  return <>{isEntering ? <div className='entering' /> : undefined}</>;
};
