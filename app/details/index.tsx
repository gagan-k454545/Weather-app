"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DetailsIndex() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to home page if no city is specified
    router.push("/")
  }, [router])

  return null
}
