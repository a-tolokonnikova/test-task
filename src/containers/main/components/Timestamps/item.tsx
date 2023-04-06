import { memo, useMemo } from "react";
import { Button } from "../../../../components";
import { Timestamp } from "../../../../types/Timestamp";

interface IDataItem {
  timestamp: Timestamp;
  updateTimestamps(t: Timestamp[]): void;
}

const MS_IN_MIN = 60000;
const MS_IN_SEC = 1000;
const DECIMALS = 10;
const HUNDREDTHS = 100;

export const DataItem: React.FC<IDataItem> = memo((props) => {
  const { timestamp, updateTimestamps } = props;
  const { timestamp: timestampValue } = timestamp;

  const handleClick = () => {
    const video = document.getElementById("video") as HTMLVideoElement;

    if (video) {
      updateTimestamps([timestamp]);
      video.currentTime = timestampValue / MS_IN_SEC;
    }
  };

  const formatTime = (time: number, comparativeNumber: number) => {
    const addedZero = time < comparativeNumber ? 0 : "";
    return `${addedZero}${time}`;
  };

  const timestampData = useMemo(() => {
    const minutes = Math.floor(timestampValue / MS_IN_MIN);
    const seconds = Math.floor((timestampValue % MS_IN_MIN) / MS_IN_SEC);
    const milliseconds = (timestampValue % MS_IN_MIN) % MS_IN_SEC;

    return `${formatTime(minutes, DECIMALS)}:${formatTime(
      seconds,
      DECIMALS
    )}:${formatTime(milliseconds, HUNDREDTHS)}`;
  }, [timestampValue]);

  return (
    <div>
      <Button value={timestampData} onClick={handleClick} />
    </div>
  );
});
