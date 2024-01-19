"use client"
import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
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

import { Input } from "@/components/ui/input"
import { Job } from ".prisma/client"

interface PriceFormProps {
  initialData: Job,
  jobId: string,
};

const formSchema = z.object({
  price: z.coerce.number(),
})

export const PriceForm = ({
  initialData, 
  jobId,
  }: PriceFormProps) => {
    const[isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        price: initialData?.price ? parseFloat(initialData.price) : undefined,
      },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try{
        await axios.patch(`/api/jobs/${jobId}`, values);
        toast.success("Job Desciption Updated!");
        toggleEdit();
        router.refresh();
      } catch(error){
        toast.error("Something Went Wrong!")
      }
    }

    return(
      <div className="mt-6 border bg-slate-100 rounded-md p-4">
        <div className="font-medium flex items-center justify-between">
          Project Price
          <Button onClick={toggleEdit} variant="ghost">
            {isEditing ? (
              <>Cancel</>
            ) : (
              <>    
              <Pencil className="h-4 w-4 mr-2" />
              Edit Price
              </>
            )}
          </Button>
      </div>
      {!isEditing &&
        <p className={cn(
          "text-sm mt-2",
          !initialData.price && "text-slate-500 italic"
        )}>
          {initialData.price || "No Price"}
        </p> 
      }
      {isEditing && (
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                          type="number"
                          step="0.01"
                          disabled={isSubmitting} 
                          placeholder="Set a price for this project..." 
                          {...field} />
                    </FormControl>
                    <FormMessage />
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