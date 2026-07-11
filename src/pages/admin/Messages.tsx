import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { adminApi } from '@/lib/adminApi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Trash2, Mail, Phone, Building2, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

const initialsOf = (first: string, last: string) =>
  `${first?.[0] || ''}${last?.[0] || ''}`.toUpperCase();

export default function AdminMessages() {
  const queryClient = useQueryClient();
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  const { data: messages, isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const res = await adminApi.getMessages();
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApi.deleteMessage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      toast.success('Message deleted successfully');
      setSelectedMessage(null);
    },
    onError: () => {
      toast.error('Failed to delete message');
    },
  });

  const markReadMutation = useMutation({
    mutationFn: (id: string) => adminApi.markMessageRead(id),
    onSuccess: (_res, id) => {
      queryClient.setQueryData(['messages'], (old: any) =>
        old?.map((m: any) => (m._id === id ? { ...m, read: true } : m))
      );
    },
  });

  const openMessage = (message: any) => {
    setSelectedMessage(message);
    if (!message.read) {
      markReadMutation.mutate(message._id);
    }
  };

  const unreadCount = messages?.filter((m: any) => !m.read).length || 0;

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">Contact Messages</h1>
          <p className="text-muted-foreground">View and manage contact form submissions</p>
        </div>

        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold text-foreground">
                  All Messages
                </CardTitle>
                <CardDescription className="mt-1">
                  {messages?.length || 0} total
                  {unreadCount > 0 && (
                    <>
                      {' · '}
                      <span className="text-primary font-medium">{unreadCount} unread</span>
                    </>
                  )}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {!messages || messages.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">No messages yet</p>
            ) : (
              <div>
                {messages.map((message: any) => (
                  <div
                    key={message._id}
                    onClick={() => openMessage(message)}
                    className={`flex items-center gap-4 px-5 py-4 border-b border-border/50 last:border-0 cursor-pointer transition-colors hover:bg-muted/50 ${
                      !message.read ? 'bg-primary/5' : ''
                    }`}
                  >
                    <div className="w-10 h-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                      {initialsOf(message.firstName, message.lastName)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p
                          className={`text-sm truncate ${
                            !message.read ? 'font-semibold text-foreground' : 'font-medium text-foreground'
                          }`}
                        >
                          {message.firstName} {message.lastName}
                        </p>
                        {!message.read && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
                        <span className="text-xs text-muted-foreground truncate">
                          {message.companyName}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {message.helpMessage}
                      </p>
                    </div>

                    <p className="text-xs text-muted-foreground shrink-0">
                      {formatDate(message.createdAt)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Detail dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={(open) => !open && setSelectedMessage(null)}>
        <DialogContent className="max-w-xl max-h-[85vh] overflow-y-auto">
          {selectedMessage && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-foreground">
                  {selectedMessage.firstName} {selectedMessage.lastName}
                </DialogTitle>
                <DialogDescription>
                  Submitted {formatDate(selectedMessage.createdAt)}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="h-4 w-4 shrink-0" />
                    <span className="truncate">{selectedMessage.email}</span>
                  </a>
                  <a
                    href={`tel:${selectedMessage.phone}`}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Phone className="h-4 w-4 shrink-0" />
                    <span className="truncate">{selectedMessage.phone}</span>
                  </a>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Building2 className="h-4 w-4 shrink-0" />
                    <span className="truncate">{selectedMessage.companyName}</span>
                  </div>
                  {selectedMessage.address && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 shrink-0" />
                      <span className="truncate">{selectedMessage.address}</span>
                    </div>
                  )}
                </div>

                {selectedMessage.selectedServices?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedMessage.selectedServices.map((service: string) => (
                      <Badge key={service} variant="secondary">
                        {service}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="bg-muted p-4 rounded-md">
                  <p className="text-sm text-foreground whitespace-pre-wrap">
                    {selectedMessage.helpMessage}
                  </p>
                </div>

                {selectedMessage.companyLogo && (
                  <a
                    href={selectedMessage.companyLogo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-primary hover:underline"
                  >
                    View attached company logo
                  </a>
                )}
              </div>

              <DialogFooter className="flex items-center justify-between sm:justify-between gap-2 mt-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Message</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this message? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteMutation.mutate(selectedMessage._id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Button variant="outline" size="sm" onClick={() => setSelectedMessage(null)}>
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
