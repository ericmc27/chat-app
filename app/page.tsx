import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex  min-h-screen custom-gradient">
      <form className="border border-black bg-white rounded mx-auto my-auto h-90 w-85">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email"/>

        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password"/>

        <Button size={"lg"}>login</Button>
      </form>
    </div>
  );
}
