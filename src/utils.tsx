import React from "react";

export async function sleep(ms?: number) {
  const delay = ms || Math.floor(Math.random() * 1000) + 500;
  return new Promise(resolve => setTimeout(resolve, delay));
}

const internalCache = new Map<string, unknown>();
export async function get<T>(url: string): Promise<T> {
  //if (internalCache.has(url)) {
  //  return internalCache.get(url) as T;
  //}
  const response = await fetch(url);
  const json = await response.json();
  //internalCache.set(url, json);
  return json;
}

export function withAdaptive<P>(
  Component: React.ComponentType<P>,
  computeProps: (width: number) => Partial<P>
) {
  return (props: P) => {
    const [computedProps, setComputedProps] = React.useState<Partial<P>>(
      computeProps(window.innerWidth)
    );
    React.useEffect(() => {
      const handler = () => {
        setComputedProps(computeProps(window.innerWidth));
      };
      window.addEventListener("resize", handler);
      return () => window.removeEventListener("resize", handler);
    }, []);
    return <Component {...props} {...computedProps} />;
  };
}
