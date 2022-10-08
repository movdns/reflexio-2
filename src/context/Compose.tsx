import React, { FC, JSXElementConstructor, PropsWithChildren } from "react";

type ComposeProps = {
  components: Array<JSXElementConstructor<PropsWithChildren<any>>>;
  children: React.ReactNode;
};

export const Compose: FC<ComposeProps> = ({ components, children }) => {
  return (
    <>
      {components.reduceRight((acc, Comp) => {
        return <Comp>{acc}</Comp>;
      }, children)}
    </>
  );
};

export default Compose;
