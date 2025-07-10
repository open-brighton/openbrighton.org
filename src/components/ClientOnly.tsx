"use client";
import React, { useEffect, useState } from "react";

type Props = {
  children: React.ReactElement;
};

export default function ClientOnly({ children, ...props }: Props) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div {...props}>{children}</div>;
}
