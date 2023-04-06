interface Zone {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface Timestamp {
  id: number;
  timestamp: number;
  duration: number;
  zone: Zone;
}
