"use client"
import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Editor } from "@/components/editor"
import { Chapter } from "@prisma/client"
import { Preview } from "@/components/preview"
import { Checkbox } from "@/components/ui/checkbox"

interface ChapterAccessFormProps {
  initialData: Chapter;
  jobId: string;
  chapterId: string;
};

const formSchema = z.object({
  isApproved: z.boolean().default(false),
})

export const ChapterAccessForm = ({
  initialData, 
  jobId,
  chapterId,
  }: ChapterAccessFormProps) => {
    const[isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        isApproved: !!initialData.isApproved
      },
    })

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try{
        await axios.patch(`/api/jobs/${jobId}/chapters/${chapterId}`, values);
        toast.success("Chapter Desciption Updated!");
        toggleEdit();
        router.refresh();
      } catch(error){
        toast.error("Something Went Wrong!")
      }
    }

    return(
      <div className="mt-6 border bg-slate-100 rounded-md p-4">
        <div className="font-medium flex items-center justify-between">
          Chapter Access
          <Button onClick={toggleEdit} variant="ghost">
            {isEditing ? (
              <>Cancel</>
            ) : (
              <>    
              <Pencil className="h-4 w-4 mr-2" />
              Edit Access
              </>
            )}
          </Button>
      </div>
      {!isEditing &&
        <p className={cn(
          "text-sm mt-2",
          !initialData.isApproved && "text-slate-500 italic"
        )}>
          {initialData.isApproved ? (
            <>This Chapter is approved for preview</>
          ): (
          <>This Chapter is not approved for preview</>
          )}

        </p> 
      }
      {isEditing && (
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <FormField
                control={form.control}
                name="isApproved"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox 
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <div className="space-y-1 leading-none">  
                     <FormDescription>
                      Check this box if you want this chapter to be free for preview
                     </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2">
                <Button 
                    disabled={!isValid || isSubmitting}
                    type="submit">Save</Button>
              </div>
            </form>
          </Form>
      )}
    </div>
    )
}