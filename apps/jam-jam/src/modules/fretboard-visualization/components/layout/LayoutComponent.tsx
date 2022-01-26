import { ReactNode } from "react";
import { Helmet } from "react-helmet";
import css from "./LayoutComponent.module.less";

interface LayoutComponentProps {
  children: ReactNode[];
}

const LayoutComponent = ({ children }: LayoutComponentProps) => {
  const [Top, Bottom] = children;

  return (
    <>
      <Helmet>
        <title>JamJam - fretboard visualization and musical progress</title>
        <meta
          name="description"
          content="Fretboard visualization and musical progress"
        />
        <meta
          property="og:description"
          content="Fretboard visualization and musical progress"
        ></meta>
        <meta
          property="og:title"
          content="JamJam - fretboard visualization and musical progress"
        />
      </Helmet>

      <div className={css.container}>
        <div className={css.layout}>{Top}</div>
        {Bottom}
      </div>
    </>
  );
};

export { LayoutComponent };
