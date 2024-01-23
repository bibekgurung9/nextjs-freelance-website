"use client"

import { ConfirmModel } from "@/components/models/confirm-model"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

interface ChapterActionsProps {
  disabled: boolean,
  jobId: string,
  chapterId: string,
  isPublished: boolean,
}

export const ChapterActions = ({
  disabled,
  jobId,
  chapterId,
  isPublished
  ,
} : ChapterActionsProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try{
      setIsLoading(true);

      if(isPublished){
        await axios.patch(`/api/jobs/${jobId}/chapters/${chapterId}/unpublish`)
        toast.success("Chapter Unpublished")
        } 
        else{ 
          await axios.patch(`/api/jobs/${jobId}/chapters/${chapterId}/publish`)
          toast.success("Chapter Published")
        }
    } catch{
      toast.error("Something Went Wrong[PUBLLISH]")
    } finally{
      setIsLoading(false)
    }
  }


  const onDelete = async () => {
    try{
      setIsLoading(true)
        await axios.delete(`/api/jobs/${jobId}/chapters/${chapterId}`)
        toast.success("Chapter Deleted")
        router.refresh()
        router.push(`/client/jobs/${jobId}`)
    } catch{
      toast.error("Something Went Wrong")
    } finally{
      setIsLoading(false)
    }
  }

  return(
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModel onConfirm = {onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4"/>
        </Button>
      </ConfirmModel>
    </div>
  )
}