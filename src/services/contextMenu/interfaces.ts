export interface IMenuContent {
  label: string;
  action: () => void;
}

export interface IState {
  position: {
    x: number,
    y: number,
  },
  menuContents: IMenuContent[];
  visible: boolean;
}
