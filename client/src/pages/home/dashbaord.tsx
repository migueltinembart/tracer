import { SiteForm } from "@/components/form/createSiteForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Dashboard() {
  return (
    <div className="border max-md:border-hidden border-gray-300 rounded-lg grid p-6 max-md:p-0 md:grid-cols-4 gap-6">
      <Card className={`col-span-2`}>
        <CardHeader>
          <CardTitle>Create Site</CardTitle>
          <CardDescription>Create a Site in one Click</CardDescription>
        </CardHeader>
        <CardContent>
          <SiteForm></SiteForm>
        </CardContent>
      </Card>
      <Card className={`col-span-2`}>
        <CardHeader>
          <CardTitle>Create Tenant</CardTitle>
          <CardDescription>Create a Site in one Click</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name of your project" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Framework</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="sveltekit">SvelteKit</SelectItem>
                    <SelectItem value="astro">Astro</SelectItem>
                    <SelectItem value="nuxt">Nuxt.js</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
