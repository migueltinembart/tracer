import { SiteForm } from "@/components/form/createSiteForm";
import { TenantForm } from "@/components/form/createTenantForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Dashboard() {
  return (
    <div className="max-md:p-0 grid md:grid-cols-4 gap-6 ">
      <Card className={`col-span-2 row-span-2`}>
        <CardHeader>
          <CardTitle>Create Site</CardTitle>
          <CardDescription>Create a Site in one Click</CardDescription>
        </CardHeader>
        <CardContent>
          <SiteForm></SiteForm>
        </CardContent>
      </Card>
      <Card className={`col-span-2 row-span-2`}>
        <CardHeader>
          <CardTitle>Create Tenant</CardTitle>
          <CardDescription>Create a Tenant in one Click</CardDescription>
        </CardHeader>
        <CardContent>
          <TenantForm></TenantForm>
        </CardContent>
      </Card>
      
    </div>
  );
}
