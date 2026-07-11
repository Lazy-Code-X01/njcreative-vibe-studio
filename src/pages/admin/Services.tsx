import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit2, Trash2, Plus, DollarSign } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { adminApi } from "@/lib/adminApi";
import { ImageUploader } from "@/components/admin/ImageUploader";

const EMPTY_FORM = {
  serviceId: "",
  title: "",
  subtitle: "",
  description: "",
  features: "",
  technologies: "",
  startingPrice: "",
  image: "",
  order: 0,
  active: true,
};

const ServicesManagement = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState<any>(null);
  const [formData, setFormData] = useState({ ...EMPTY_FORM });

  const queryClient = useQueryClient();

  const { data: services = [], isLoading } = useQuery({
    queryKey: ["admin-services"],
    queryFn: () => adminApi.getServices().then((res) => res.data),
  });

  const seedMutation = useMutation({
    mutationFn: () => adminApi.seedServices(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-services"] });
      toast.success("Services seeded successfully!");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to seed services");
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => adminApi.createService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-services"] });
      toast.success("Service created successfully!");
      closeDialog();
    },
    onError: () => toast.error("Failed to create service"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      adminApi.updateService(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-services"] });
      toast.success("Service updated successfully!");
      closeDialog();
    },
    onError: () => toast.error("Failed to update service"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApi.deleteService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-services"] });
      toast.success("Service deleted successfully!");
    },
    onError: () => toast.error("Failed to delete service"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      features: formData.features.split("\n").map((f) => f.trim()).filter(Boolean),
      technologies: formData.technologies.split(",").map((t) => t.trim()).filter(Boolean),
      order: Number(formData.order),
    };
    if (isEditing && currentService) {
      updateMutation.mutate({ id: currentService._id, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleEdit = (service: any) => {
    setIsEditing(true);
    setCurrentService(service);
    setFormData({
      serviceId: service.serviceId,
      title: service.title,
      subtitle: service.subtitle,
      description: service.description,
      features: service.features.join("\n"),
      technologies: service.technologies.join(", "),
      startingPrice: service.startingPrice,
      image: service.image || "",
      order: service.order || 0,
      active: service.active ?? true,
    });
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setIsEditing(false);
    setCurrentService(null);
    setFormData({ ...EMPTY_FORM });
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-foreground">Services</h1>
            <p className="text-muted-foreground">
              {services.length} service{services.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex gap-3">
            {services.length === 0 && (
              <Button
                variant="outline"
                onClick={() => seedMutation.mutate()}
                disabled={seedMutation.isPending}
              >
                {seedMutation.isPending ? "Seeding..." : "Initialize Services"}
              </Button>
            )}
            <Button
              onClick={() => {
                setIsEditing(false);
                setCurrentService(null);
                setFormData({ ...EMPTY_FORM });
                setIsDialogOpen(true);
              }}
              className="bg-primary hover:bg-primary-glow text-primary-foreground transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </div>
        </div>

        {/* Empty state */}
        {services.length === 0 && (
          <div className="text-center py-20 glass-card rounded-lg">
            <p className="text-muted-foreground mb-2">No services found.</p>
            <p className="text-sm text-muted-foreground">
              Click <strong className="text-foreground">Initialize Services</strong> to import from the website, or{" "}
              <strong className="text-foreground">Add Service</strong> to create one manually.
            </p>
          </div>
        )}

        {/* Services grid */}
        {services.length > 0 && (
          <div className="grid lg:grid-cols-2 gap-5">
            {services.map((service: any) => (
              <Card key={service._id} className="glass-card overflow-hidden">
                {/* Cover image */}
                <div className="relative h-44 bg-muted overflow-hidden">
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                      No image
                    </div>
                  )}

                  {/* Action buttons overlay */}
                  <div className="absolute top-3 right-3 flex gap-1">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8 bg-background/80 hover:bg-background text-foreground backdrop-blur-sm"
                      onClick={() => handleEdit(service)}
                      title="Edit service"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8 bg-background/80 hover:bg-background backdrop-blur-sm"
                          title="Delete service"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Service</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{service.title}"? This cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteMutation.mutate(service._id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>

                  {/* Hidden badge */}
                  {!service.active && (
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="text-xs">Hidden</Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-foreground leading-tight">{service.title}</h3>
                    <div className="flex items-center gap-1 shrink-0 text-primary">
                      <DollarSign className="w-3.5 h-3.5" />
                      <span className="text-sm font-bold">{service.startingPrice}</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">{service.subtitle}</p>

                  <p className="text-xs text-muted-foreground line-clamp-2">{service.description}</p>

                  {service.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {service.technologies.slice(0, 4).map((tech: string) => (
                        <span key={tech} className="px-1.5 py-0.5 bg-muted text-muted-foreground text-xs rounded">
                          {tech}
                        </span>
                      ))}
                      {service.technologies.length > 4 && (
                        <span className="px-1.5 py-0.5 text-muted-foreground text-xs">
                          +{service.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit dialog */}
      <Dialog open={isDialogOpen} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="max-w-2xl flex flex-col max-h-[90vh] p-0 gap-0">
          <DialogHeader className="shrink-0 px-6 pt-6 pb-4 border-b border-border">
            <DialogTitle className="text-xl font-semibold text-foreground">
              {isEditing ? "Edit Service" : "Add New Service"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
            <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="serviceId">Service ID *</Label>
                  <Input
                    id="serviceId"
                    value={formData.serviceId}
                    onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                    placeholder="e.g. web-development"
                    required
                    disabled={isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order">Display Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                    min={0}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle *</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  required
                />
              </div>

              {/* Pricing */}
              <div className="space-y-2 p-4 rounded-lg border border-primary/30 bg-primary/5">
                <Label htmlFor="startingPrice" className="flex items-center gap-2 text-primary font-semibold">
                  <DollarSign className="w-4 h-4" />
                  Starting Price *
                </Label>
                <Input
                  id="startingPrice"
                  value={formData.startingPrice}
                  onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
                  placeholder="e.g. $3,000 or $2,500/mo"
                  required
                  className="text-lg font-semibold"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="features">Features (one per line) *</Label>
                <Textarea
                  id="features"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder={"Logo Design\nBrand Guidelines\nVisual Identity"}
                  rows={5}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                <Input
                  id="technologies"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="Figma, Adobe XD, Sketch"
                />
              </div>

              <ImageUploader
                label="Service Image"
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
              />

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor="active" className="cursor-pointer">
                  Active (visible on website)
                </Label>
              </div>
            </div>

            {/* Sticky footer */}
            <div className="shrink-0 flex justify-end gap-3 px-6 py-4 border-t border-border">
              <Button type="button" variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary-glow text-primary-foreground transition-colors"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : isEditing ? "Update Service" : "Create Service"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ServicesManagement;
