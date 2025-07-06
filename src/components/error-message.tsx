import { AlertCircleIcon } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ErrorMessage({ error }: { error: string }) {
   return (
      <Alert variant="destructive" role="alert">
         <AlertCircleIcon aria-hidden="true" />
         <AlertDescription>{error}</AlertDescription>
      </Alert>
   )
}