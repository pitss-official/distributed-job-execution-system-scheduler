export default interface Datastore {
  name: string;
  connect: () => Promise<boolean>;
  disconnect?: boolean;
  shutdown?: () => Promise<void>;
  isConnected: boolean;
  listner?: Function;
  broadcast?: Function;
}
