"use client"
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form'
import { useRouter } from "next/navigation";
import axios from "axios"
import React, { useEffect } from 'react'
import Link from "next/link";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is Required",
  }),
})

const CreatePage = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

const { isSubmitting, isValid } = form.formState;

const onSubmit = async (values: z.infer<typeof formSchema>) => {

    try{
      const response = await axios.post("/api/jobs", values);
      router.push(`/client/jobs/${response.data.id}`)
      toast.success("Job Created Successfully");
    } catch{
      toast.error("Something Went Wrong!")
    }
  }

  useEffect(() => {
    // Refresh the page on component mount
    router.replace('/client/create');
  }, []);

  return (
    
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Name Your Job</h1>
        <p className="">What would you like to name your Job? Don&apos;t worry, you can change this later.</p> 
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input 
                      disabled={isSubmitting} 
                      placeholder="Front End React Developer" {...field} />
                  </FormControl>
                  <FormDescription>
                    What kind of talent are you trying to hire?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/">
                <Button 
                  type="button" 
                  variant="ghost">
                  Cancel
                </Button>
              </Link>
              <Button 
                type="submit"
                disabled={!isValid || isSubmitting}>Submit</Button>
            </div>
          </form>        
        </Form>
      </div>
    </div>
  )
}

export default CreatePage