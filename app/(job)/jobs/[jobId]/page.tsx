"use client";
import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Enter Your Name To Be Seen By Client.",
  }).max(50),
  descripton: z.string().min(1, {
    message: "Description Cannot Be Empty",
  }).max(255),
  extraLinks: z.string().min(2, {
    message: "Enter Links to your past projects or portfolio",
  }),
})

const JobIdPage = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      description: "",
      extraLinks: "",
    },
  })


  return (
    <div>
      {/* <Form {...form}>

      </Form> */}

    </div>
  )
}

export default JobIdPage