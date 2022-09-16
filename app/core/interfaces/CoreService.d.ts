export default interface CoreService {
  name: string;
  start: () => Promise<void>;
  stop: () => Promise<void>;
  isEnabled: boolean;
  on?: (string) => Promise<boolean|void>;
}
