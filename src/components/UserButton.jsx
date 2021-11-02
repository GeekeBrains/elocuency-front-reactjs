import React from 'react';

export const UserButton = ({
  user,
  onClick,
  //voiceSpanish, voiceEnglish
}) => {
  return (
    <div className="userButton" onClick={() => onClick()}>
      {user.substring(0, 1).toUpperCase()}
    </div>
  );
};
