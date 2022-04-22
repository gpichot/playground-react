import React from "react";
import classnames from "classnames";

import styles from "./TimelineBox.module.scss";

export default function TimelineBox({
  title,
  className,
  children,
  ...divProps
}: { title: string } & React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={classnames(styles.timelineBox, className)} {...divProps}>
      <div className={styles.timelineTitle}>{title}</div>
      {children}
    </div>
  );
}

export function TimelineBoxGroup(
  divProps: React.ComponentPropsWithoutRef<"div">
) {
  return <div className={styles.timelineBoxGroup} {...divProps} />;
}
