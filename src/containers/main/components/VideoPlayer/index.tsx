import { VIDEO_URL } from "../../../../constants";
import { useAppDispatch, useAppSelector } from "../../../../store/reduxHooks";
import { updateCurrentTimestamps } from "../../../../store/currentTimestampsSlice";
import styles from "./index.module.scss";

export const VideoPlayer: React.FC = () => {
  const timestamps = useAppSelector((state) => state.timestamps);
  const currentTimestamps = useAppSelector((state) => state.currentTimestamps);
  const dispatch = useAppDispatch();

  const onTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.target as HTMLVideoElement;
    const currentVideoTime = video.currentTime * 1000;

    timestamps.forEach((item) => {
      if (
        currentTimestamps.indexOf(item) !== -1 ||
        currentVideoTime < item.timestamp ||
        currentVideoTime > item.timestamp + item.duration
      ) {
        return;
      }
      dispatch(updateCurrentTimestamps([...currentTimestamps, item]));
    });

    currentTimestamps.forEach((item) => {
      if (currentVideoTime > item.timestamp + item.duration) {
        const updatedTimestamps = currentTimestamps.filter(
          (stamp) => stamp.id !== item.id
        );
        dispatch(updateCurrentTimestamps(updatedTimestamps));
      }
    });
  };

  return (
    <div className={styles.player}>
      <video id="video" controls onTimeUpdate={(e) => onTimeUpdate(e)}>
        <source src={VIDEO_URL} type="video/mp4" />К сожалению, ваш браузер не
        поддерживает воспроизведение этого видео.
      </video>
      {currentTimestamps &&
        currentTimestamps.map((timestamp) => (
          <div
            className={styles.rect}
            key={timestamp.id}
            style={{
              width: timestamp.zone?.width,
              height: timestamp.zone?.height,
              top: timestamp.zone?.top,
              left: timestamp.zone?.left,
            }}
          />
        ))}
    </div>
  );
};
