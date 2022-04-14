import React from "react";

import styles from "./StatBlock.module.css";

export default function StatBlock({
  name,
  value,
}: {
  name: string;
  value: number;
}) {
  return (
    <div className={styles.statBlock}>
      <div className={styles.statValue}>{value}</div>
      <div className={styles.statName}>{name}</div>
    </div>
  );
}

export function StatBlockGroup({ children }: { children: React.ReactNode }) {
  return <div className={styles.statBlockGroup}>{children}</div>;
}
