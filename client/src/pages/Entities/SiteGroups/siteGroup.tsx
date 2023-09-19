import { toast } from "@/components/ui/use-toast";
import { trpc } from "@/trpc";
import { useState } from "react";
import { useParams } from "react-router-dom";
import QrReader from "react-qr-scanner";
import { Button } from "@/components/ui/button";

export function SiteGroup() {
  const params = useParams();

  const siteUpdater = trpc.entities.siteGroups.update.one.useMutation({
    onSuccess: (data) => {
      return toast({
        title: `Site "${data.name}" created`,
      });
    },
    onError: () => {
      return toast({
        variant: "destructive",
        title: "Something with request went wrong! Trying again...",
      });
    },
  });

  const [turnedOn, setTurnedOn] = useState(true);

  const [delay, setDelay] = useState(100);
  const [result, setResult] = useState<any>("no result");

  function handleScan(data: typeof result) {
    if (data) {
      setResult(data);
      setTurnedOn(false);
    }
  }

  function handleError(err: Error) {
    console.log(err);
  }

  const previewStyle = {
    height: 240,
    width: 320,
  };

  return (
    <div>
      {turnedOn ? (
        <QrReader
          delay={delay}
          style={previewStyle}
          onError={handleError}
          onScan={handleScan}
        />
      ) : (
        <div>{result?.text}</div>
      )}
      <Button
        onClick={() =>
          siteUpdater.mutate({
            id: 1,
            description: "Test",
            name: "Rebsamen",
          })
        }
      ></Button>
    </div>
  );
}
