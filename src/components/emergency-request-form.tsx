
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import { emergencyRequestSchema, type EmergencyRequestFormData } from "@/lib/schemas"
import { useUserAuth } from "@/context/AuthContext"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function EmergencyRequestForm() {
  const { user } = useUserAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<EmergencyRequestFormData>({
    resolver: zodResolver(emergencyRequestSchema),
    defaultValues: {
      priority: "Emergency",
    },
  })

  async function onSubmit(data: EmergencyRequestFormData) {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to submit a request.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      await addDoc(collection(db, "requests"), {
        ...data,
        requesterId: user.uid,
        status: "Pending",
        createdAt: serverTimestamp(),
      })

      toast({
        title: "Request Submitted",
        description: "We have broadcasted your request to nearby donors.",
        variant: "default", 
        className: "bg-red-600 text-white border-red-700",
      })
      router.push("/dashboard")
    } catch (error) {
      console.error("Error submitting request:", error)
      toast({
        title: "Error",
        description: "Could not submit request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="patientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patient Name</FormLabel>
              <FormControl>
                <Input placeholder="Jane Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="bloodGroup"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blood Group Needed</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select group" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                      <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="unitsNeeded"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Units Needed</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="hospitalName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hospital Name</FormLabel>
              <FormControl>
                <Input placeholder="City General Hospital" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="New York" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input placeholder="1234567890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Priority Level</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Emergency" />
                    </FormControl>
                    <FormLabel className="font-normal text-red-600 font-bold">
                      Emergency (Immediate Need)
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Normal" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Normal (Planned Surgery/Treatment)
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 font-bold text-lg py-6" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting Request...
            </>
          ) : (
            "REQUEST BLOOD NOW"
          )}
        </Button>
      </form>
    </Form>
  )
}
