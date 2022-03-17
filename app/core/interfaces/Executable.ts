export default interface Executable {
  name: string;
  start: () => Promise<void>;
  stop: () => Promise<void>;
}
