import { Separator } from "@radix-ui/react-separator";

export function CSeparator({
    orientation,
    maxWidth
}: {
    orientation?: 'horizontal'|'vertical',
    maxWidth?: number
}) {
    return (
        <div className="w-full h-[2px] min-h-[2px] flex justify-center mb-2 mt-2">
            <Separator orientation={orientation||"horizontal"} className={`${maxWidth ? `w-[${maxWidth}%]` : "w-[60%]"} bg-background-foreground`} />
        </div>
    );
}