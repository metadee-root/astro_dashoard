"use client";

import Image from "next/image";
import { XIcon } from "lucide-react";
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";

interface ImageEnlargeDialogProps {
  imageSrc: string | null;
  onClose: () => void;
}

export const ImageEnlargeDialog = ({
  imageSrc,
  onClose,
}: ImageEnlargeDialogProps) => {
  return (
    <Dialog open={!!imageSrc} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="bg-black/80" />
        <DialogPrimitive.Content
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          onClick={onClose}
        >
          {/* Visually hidden title for accessibility */}
          <DialogTitle className="sr-only">Enlarged Image</DialogTitle>

          {/* Close button */}
          <DialogClose className="absolute top-4 right-4 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/50">
            <XIcon className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </DialogClose>

          {/* Enlarged image */}
          {imageSrc && (
            <div
              className="relative max-h-[90vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={imageSrc}
                alt="Enlarged image"
                width={1200}
                height={800}
                className="max-h-[90vh] w-auto rounded-lg object-contain"
                sizes="90vw"
                priority
              />
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
};
