import React from 'react';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export default function DeleteConfirmationDialog({
                                                     open,
                                                     onClose,
                                                     onConfirm,
                                                     title = 'Delete Item',
                                                     description = 'Are you sure you want to delete this item? This action cannot be undone.',
                                                 }) {
    // Avoid rendering the dialog if not open
    if (!open) return null;

    return (
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent forceMount={false} className="bg-white text-black">
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button variant="destructive" onClick={onConfirm}>Delete</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
