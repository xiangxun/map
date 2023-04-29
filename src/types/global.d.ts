declare type BuildingProps = {
  type: string;
  flag?: boolean;
};

declare type ColorType = {
  [key: string]: {
    color: string;
    opacity: number;
  };
};

declare type DataType = {
  [key: string]: number[];
};

declare type CreateMeshProps = {
  type: string;
  positionArray: number[];
  indexArray: number[];
  color: string;
  opacity: number;
  flag?: boolean;
};
