declare namespace JSX {
  interface IntrinsicElements {
    [elementName: string]: any;
  }
}

declare module 'react' {
  const React: unknown;
  namespace React {
    type ReactNode = any;
    type CSSProperties = Record<string, any>;
    type FC<P = {}> = (props: P) => any;
  }
  export default React;
  export type ReactNode = React.ReactNode;
  export type CSSProperties = React.CSSProperties;
  export type FC<P = {}> = React.FC<P>;
}

declare module 'react/jsx-runtime' {
  export const Fragment: any;
  export const jsx: any;
  export const jsxs: any;
}
