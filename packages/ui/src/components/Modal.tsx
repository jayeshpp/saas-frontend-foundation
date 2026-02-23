import * as Dialog from "@radix-ui/react-dialog";
import * as React from "react";

import { cn } from "../lib/cn";

export type ModalProps = {
  open: boolean;
  onOpenChange(open: boolean): void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function Modal(props: ModalProps): React.ReactElement {
  return (
    <Dialog.Root open={props.open} onOpenChange={props.onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-[2px]" />
        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl border border-zinc-200 bg-white p-5 shadow-xl",
            "dark:border-zinc-800 dark:bg-zinc-950",
          )}
        >
          <div className="space-y-1">
            <Dialog.Title className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
              {props.title}
            </Dialog.Title>
            {props.description ? (
              <Dialog.Description className="text-sm text-zinc-600 dark:text-zinc-400">
                {props.description}
              </Dialog.Description>
            ) : null}
          </div>

          <div className="mt-4">{props.children}</div>

          {props.footer ? <div className="mt-5 flex justify-end gap-2">{props.footer}</div> : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

