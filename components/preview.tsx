"use client"

import dynamic from "next/dynamic"
import { useMemo } from "react";

import 'react-quill/dist/react-quill.bubble.snow';

interface PreviewProps {
  value: string;
}

export const Preview = ({
  value,
} : PreviewProps) => {
  const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), {ssr: false}), [])

  return (
      <ReactQuill
        theme="bubble"
        value={value}
        readOnly
      />
  )

}