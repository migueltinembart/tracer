"use client"
import { mainCardClasses } from "@/app/_components/shared"
import { trpc } from "@/app/_trpc/client"
import { useParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import clsx from "clsx"
import moment from "moment"


export default function Site() {
  
  const {id: paramId} = useParams()
  

  const {data, isLoading} = trpc.entities.sites.select.one.useQuery(Number(paramId))

  return (
    <div className={clsx(["flex", "flex-1", "flex-col", "border", "rounded-lg", "p-6"])}>
      <div className="pb-4">
        <h1 className="text-xl font-semibold">{data?.name}</h1>
        <span className="text-xs text-gray-600">{`Created ${moment(data?.created_at).format("DD.MM.YYYY hh:mm")} | updated ${moment(data?.updated_at).format("DD.MM.YYYY hh:mm")}`}</span>
      </div>
      <Tabs defaultValue="account" className="flex flex-1 flex-col items-stretch">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="grid grid-cols-[.5fr_1fr] flex-1">test</TabsContent>
      </Tabs>
    </div>
    
  )
}
