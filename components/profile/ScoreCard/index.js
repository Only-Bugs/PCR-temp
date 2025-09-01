import BaseLineCard from "./BaseLineCard";
import CarbonCard from "./CarbonCard";

const ScoreCard = ({ variant, data }) => {
  if (variant === "baseline") {
    return <BaseLineCard data={data} />;
  }
  if (variant === "carbon") {
    return <CarbonCard data={data} />;
  }
  return null;
};

export default ScoreCard;
