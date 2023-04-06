import { useCallback, useRef } from "react";
import { DataItem } from "./item";
import { Timestamp } from "../../../../types/Timestamp";
import { updateCurrentTimestamps } from "../../../../store/currentTimestampsSlice";
import { useAppSelector } from "../../../../store/reduxHooks";
import { useAppDispatch } from "../../../../store/reduxHooks";
import styles from "./index.module.scss";
import leftArrow from "../../../../assets/images/arrow-left.svg";
import rightArrow from "../../../../assets/images/arrow-right.svg";

interface IDataTable {
  loading: boolean;
}

const SCROLL_SHIFT_LEFT = -400;
const SCROLL_SHIFT_RIGHT = +400;

export const DataList: React.FC<IDataTable> = (props) => {
  const { loading } = props;
  const timestamps = useAppSelector((state) => state.timestamps);
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const updateTimestamps = useCallback(
    (timestamp: Timestamp[]) => {
      dispatch(updateCurrentTimestamps([timestamp]));
    },
    [dispatch]
  );

  const slide = (shift: number) => {
    if (ref.current) {
      ref.current.scrollLeft += shift;
    }
  };

  if (loading) {
    return (
      <div>
        <p>Загрузка...</p>
      </div>
    );
  }

  if (timestamps.length === 0) {
    return null;
  }

  return (
    <div className={styles.list}>
      <button className={styles.left} onClick={() => slide(SCROLL_SHIFT_LEFT)}>
        <img src={leftArrow} alt="Влево" />
      </button>
      <div className={styles.scrollable} ref={ref}>
        {timestamps.map((timestamp: Timestamp) => (
          <DataItem
            timestamp={timestamp}
            key={timestamp.id}
            updateTimestamps={updateTimestamps}
          />
        ))}
      </div>
      <button
        className={styles.right}
        onClick={() => slide(SCROLL_SHIFT_RIGHT)}
      >
        <img src={rightArrow} alt="Вправо" />
      </button>
    </div>
  );
};
