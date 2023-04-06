import { DATA_URL } from "../../constants";
import { DataList } from "./components/Timestamps/list";
import { ErrorModal } from "../../components";
import { Timestamp } from "../../types/Timestamp";
import { VideoPlayer } from "./components/VideoPlayer";
import { getTimestamps } from "../../store/timestampsSlice";
import { playerApi } from "../../api";
import { useAppDispatch } from "../../store/reduxHooks";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";

export const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);
  const handleClose = () => setErrorModalOpen(false);

  useEffect(() => {
    setLoading(true);

    playerApi
      .get(DATA_URL)
      .then((response) => {
        const sortedData = response.data.sort(
          (a: Timestamp, b: Timestamp) => a.timestamp - b.timestamp
        );
        dispatch(getTimestamps(sortedData));
      })
      .catch(() => {
        setErrorModalOpen(true);
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return (
    <div className={styles.main}>
      <h2>Тестовое задание: Видео</h2>
      <VideoPlayer />
      <DataList loading={loading} />

      <ErrorModal isOpen={errorModalOpen} handleClose={handleClose} />
    </div>
  );
};
