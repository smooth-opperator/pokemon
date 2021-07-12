import React from "react";
import ReactLoading from "react-loading";
import { ILoaderProps, LoaderTypes } from "../interfaces";
import { LoaderContainer } from "./styles";

const Loader: React.FC<ILoaderProps> = ({
  type = LoaderTypes.Spin,
  color = "#334769",
  height = 80,
  width = 80,
}) => {
  return (
    <LoaderContainer>
      <ReactLoading type={type} color={color} height={height} width={width} />
    </LoaderContainer>
  );
};

export default Loader;
