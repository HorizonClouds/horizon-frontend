"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/toast"

export function ToastWithTitle() {
  const { toast } = useToast()

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        })
      }}
    >
      Show Toast
    </Button>
  )
}

export default ToastWithTitle
