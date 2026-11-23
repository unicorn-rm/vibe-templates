// MathML elements used for equation (1). React renders them natively; this only teaches TypeScript their names.
import "react";

type MathProps = React.HTMLAttributes<HTMLElement> & { display?: "block" | "inline" };

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      math: MathProps; mrow: MathProps; mtext: MathProps; mo: MathProps; mi: MathProps; mn: MathProps;
      msub: MathProps; mfrac: MathProps; munderover: MathProps;
    }
  }
}
