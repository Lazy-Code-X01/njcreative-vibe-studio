import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Edit2, Trash2, ExternalLink } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
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
import { toast } from "sonner";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { portfolioApi } from "@/lib/portfolioApi";

const EMPTY_FORM = {
  title: "",
  slug: "",
  category: "",
  client: "",
  image: "",
  description: "",
  technologies: "",
  results: "",
  link: "",
  featured: false,
};

const toSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const CATEGORY_LABELS: Record<string, string> = {
  web: "Web Development",
  branding: "Branding",
  marketing: "Marketing",
  tech: "Technology",
};

const PortfolioManagement = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>(null);
  const [formData, setFormData] = useState({ ...EMPTY_FORM });

  const queryClient = useQueryClient();
  const token = localStorage.getItem("admin_token");

  useEffect(() => {
    if (isDialogOpen && !isEditing) {
      setFormData((prev) => ({ ...prev, slug: toSlug(prev.title) }));
    }
  }, [formData.title, isDialogOpen, isEditing]);

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["portfolio-projects"],
    queryFn: () => portfolioApi.getProjects().then((res) => res.data),
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => portfolioApi.createProject(data, token || ""),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio-projects"] });
      toast.success("Project created successfully");
      closeDialog();
    },
    onError: () => toast.error("Failed to create project"),
  });

  const updateMutation = useMutation({
    mutationFn: (data: any) => portfolioApi.updateProject(data._id, data, token || ""),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio-projects"] });
      toast.success("Project updated successfully");
      closeDialog();
    },
    onError: () => toast.error("Failed to update project"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => portfolioApi.deleteProject(id, token || ""),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio-projects"] });
      toast.success("Project deleted");
    },
    onError: () => toast.error("Failed to delete project"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      technologies: formData.technologies.split(",").map((t) => t.trim()).filter(Boolean),
      results: formData.results.split(",").map((r) => r.trim()).filter(Boolean),
    };
    if (isEditing && currentProject) {
      updateMutation.mutate({ ...data, _id: currentProject._id });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (project: any) => {
    setIsEditing(true);
    setCurrentProject(project);
    setFormData({
      title: project.title,
      slug: project.slug,
      category: project.category,
      client: project.client,
      image: project.image,
      description: project.description,
      technologies: project.technologies.join(", "),
      results: project.results.join(", "),
      link: project.link || "",
      featured: project.featured,
    });
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setIsEditing(false);
    setCurrentProject(null);
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
            <h1 className="text-3xl font-bold text-foreground">Portfolio</h1>
            <p className="text-muted-foreground">
              {projects.length} project{projects.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Button
            onClick={() => {
              setIsEditing(false);
              setCurrentProject(null);
              setFormData({ ...EMPTY_FORM });
              setIsDialogOpen(true);
            }}
            className="bg-primary hover:bg-primary-glow text-primary-foreground transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </div>

        {/* Project grid */}
        {projects.length === 0 ? (
          <div className="text-center py-20 glass-card rounded-lg">
            <p className="text-muted-foreground">No projects yet. Add your first one.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-5">
            {projects.map((project: any) => (
              <Card key={project._id} className="glass-card overflow-hidden">
                {/* Cover image */}
                <div className="relative h-44 bg-muted overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
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
                      onClick={() => handleEdit(project)}
                      title="Edit project"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8 bg-background/80 hover:bg-background backdrop-blur-sm"
                          title="Delete project"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Project</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{project.title}"? This cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteMutation.mutate(project._id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                  {/* Featured badge overlay */}
                  {project.featured && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-foreground leading-tight">{project.title}</h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 text-muted-foreground hover:text-primary transition-colors"
                        title="View live project"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <p className="text-sm text-primary mb-2">{project.client}</p>

                  <div className="flex items-center gap-2 flex-wrap mb-3">
                    <Badge variant="outline" className="text-xs border-border text-muted-foreground">
                      {CATEGORY_LABELS[project.category] || project.category}
                    </Badge>
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-2">{project.description}</p>

                  {project.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {project.technologies.slice(0, 4).map((tech: string) => (
                        <span key={tech} className="px-1.5 py-0.5 bg-muted text-muted-foreground text-xs rounded">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-1.5 py-0.5 text-muted-foreground text-xs">
                          +{project.technologies.length - 4}
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
              {isEditing ? "Edit Project" : "Add New Project"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                    placeholder="project-slug"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web">Web Development</SelectItem>
                      <SelectItem value="branding">Branding</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="tech">Technology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client">Client *</Label>
                  <Input
                    id="client"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    required
                  />
                </div>
              </div>

              <ImageUploader
                label="Project Image *"
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
              />

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
                <Label htmlFor="technologies">Technologies (comma-separated) *</Label>
                <Input
                  id="technologies"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  required
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="results">Results (comma-separated) *</Label>
                <Input
                  id="results"
                  value={formData.results}
                  onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                  required
                  placeholder="+250% conversion, 99.9% uptime"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="link">Project Link</Label>
                <Input
                  id="link"
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor="featured" className="cursor-pointer">
                  Featured Project
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
                {isSaving ? "Saving…" : isEditing ? "Update Project" : "Create Project"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default PortfolioManagement;
