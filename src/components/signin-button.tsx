
import { signIn } from "@/auth"
import { Button } from "./ui/button"

export default function GoogleSignInButton() {
   return (
      <form
         action={async () => {
            "use server"
            await signIn("google")
         }}
      >
         <Button type="submit">Sign In with Google</Button>
      </form>
   )
} 