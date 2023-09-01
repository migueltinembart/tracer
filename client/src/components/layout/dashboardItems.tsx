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
import { trpc } from "@/utils/trpc";
import { UseTRPCMutationOptions } from "@trpc/react-query/dist/shared";

export type Props = {
  className?: string;
};

export function SiteCreatorCard(props: Props) {
  const siteCreator = trpc.sites.insertOne.useMutation();

  const handleSiteCreation = () => {
    siteCreator.mutate({
      name: "",
      status: "active",
      comment: "",
    });
  };

  return (
    <Card className={`col-span-2 row-span-2 ${props.className}`}>
      <CardHeader>
        <CardTitle>Create Site</CardTitle>
        <CardDescription>Create a Site in one Click</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of the new site" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Status</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="planned">Planned</SelectItem>
                  <SelectItem value="planned">Staging</SelectItem>
                  <SelectItem value="planned">Retired</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="comment">Comment</Label>
              <Input id="comment" placeholder="Comment for this Site" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSiteCreation}>Deploy</Button>
      </CardFooter>
    </Card>
  );
}

export function TenantCreatorCard(props: Props) {
  return (
    <Card className={`col-span-2 row-span-2 ${props.className}`}>
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
  );
}
