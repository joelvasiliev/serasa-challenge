import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Debt } from "@prisma/client";

interface ObservationDialogProps {
    debt: Debt
    observation: string | null;
}

export function ObservationDialog({ debt, observation }: ObservationDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <span
                    className="truncate max-w-xs cursor-pointer hover:underline"
                    title={`${observation}` || " - "}
                >
                    {observation ? 
                    <p>{observation.length > 20 ? `${observation.slice(0, 20)}...` : observation}</p>
                    :
                    " - "
                    }
                </span>
            </DialogTrigger>
            <DialogContent
                className="bg-white text-black max-h-[75vh] overflow-y-auto overflow-x-hidden break-words break-all p-4"
            >
                <DialogHeader>
                    <DialogTitle>Observação da dívida <strong className="ml-1">{debt.title}</strong></DialogTitle>
                </DialogHeader>
                <p className="mt-8 whitespace-pre-wrap">{observation || "-"}</p>
            </DialogContent>
        </Dialog>
    );
}
