import { toast } from "@/components/ui/use-toast";
import { trpc } from "@/trpc";
import { useState } from "react";
import { useParams } from "react-router-dom";
import QrReader from "react-qr-scanner";

export function Site() {
  const params = useParams();

  const site = trpc.sites.select.one.useQuery(Number(params.id));
  const siteUpdater = trpc.sites.update.one.useMutation({
    onSuccess: (data) => {
      return toast({
        title: `Site "${data}" created`,
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
    </div>
  );
}
