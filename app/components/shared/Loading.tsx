import { Loader2 } from "lucide-react";

export default function LoadingFullScreen() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-12 w-12 text-white animate-spin" />
                <p className="text-lg font-bold text-white tracking-wide">
                    Loading...
                </p>
            </div>
        </div>
    );
}