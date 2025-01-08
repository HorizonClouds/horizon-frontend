import { useForm } from "react-hook-form"
import { useNavigate, useSearchParams } from "react-router-dom"
import { AlertTriangle } from 'lucide-react'
import { Button } from "../../ui/button.jsx"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card.jsx"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form.jsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select.jsx"
import { Textarea } from "../../ui/textarea.jsx"
import { Input } from "../../ui/input.jsx"
import { toast } from "sonner"
import reportService from "../../../services/microservices/reportService"
import usersService from '../../../services/microservices/usersService.js';

function ReportForm() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const form = useForm({
    defaultValues: {
      type: searchParams.get('type') || 'itinerary',
      resourceId: searchParams.get('id') || '',
      reason: ''
    }
  })

  const onSubmit = async (data) => {
    try {
      const userId = usersService.getLoggedUser()?.id;
      if (!userId) {
        toast.error("You must be logged in to submit a report")
        return
      }

      if (!data.resourceId) {
        toast.error("Resource ID is required")
        return
      }

      if (data.reason.length < 10) {
        toast.error("Reason must be at least 10 characters")
        return
      }

      await reportService.createReport({
        ...data,
        userId
      })

      toast.success("Report submitted successfully")
      // Redirigir a la página de analytics
      navigate('/analyticsReports')
    } catch (error) {
      console.error("Error submitting report:", error)
      toast.error("Failed to submit report")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-2xl mx-auto py-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Submit a Report
            </CardTitle>
            <CardDescription>
              Report inappropriate content or behavior. We take all reports seriously and will review them promptly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What are you reporting?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select what you want to report" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="itinerary">Itinerary</SelectItem>
                          <SelectItem value="publication">Publication</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select whether you're reporting an itinerary or a publication
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="resourceId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content ID</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter the ID of the content you're reporting" 
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        You can find this ID in the URL or content details
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason for reporting</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please provide details about why you're reporting this content..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Be specific and include any relevant details
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/analyticsReports')}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    Submit Report
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default ReportForm

