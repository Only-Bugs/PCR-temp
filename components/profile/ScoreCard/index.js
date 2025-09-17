/**
 * @fileoverview ScoreCard component.
 * Simplified to only render the CarbonCard.
 */

import CarbonCard from "./CarbonCard";

/**
 * ScoreCard wrapper for carbon points.
 *
 * @param {Object} props
 * @param {{ label: string, value: number|string, unit?: string }} props.data - Data for carbon score.
 * @returns {JSX.Element}
 */
const ScoreCard = ({ data }) => {
  if (!data) return null;
  return <CarbonCard key={data.value} data={data} />;
};

export default ScoreCard;
