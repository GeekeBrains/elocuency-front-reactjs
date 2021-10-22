export const ScoreOld = ({wordNumberTarget, wordNumberOk, countOk}) => {
  return (
    <div className="score">
      {countOk}/{wordNumberOk}/{wordNumberTarget}
    </div>
  );
};
