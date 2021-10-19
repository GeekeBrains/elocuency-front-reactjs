export const Score = ({wordNumberTarget, wordNumberOk, countOk}) => {
  return (
    <div className="score">
      {countOk}/{wordNumberOk}/{wordNumberTarget}
    </div>
  );
};
