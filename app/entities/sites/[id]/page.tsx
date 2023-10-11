"use client"
import { useParams } from "next/navigation"

export default function Site() {
  const {id: paramId} = useParams()
  return <div>{paramId}</div>
}
