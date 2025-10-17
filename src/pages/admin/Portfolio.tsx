import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { ImageUploader } from "@/components/admin/ImageUploader";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8787/api';

const PortfolioManagement = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>(null);
  const [formData, setFormData] = useState({
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
  });

  const queryClient = useQueryClient();
  const token = localStorage.getItem("admin_token");

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["portfolio-projects"],
    queryFn: () => axios.get(`${API_BASE_URL}/portfolio`).then((res) => res.data),
  });

  const createMutation = useMutation({
    mutationFn: (data: any) =>
      axios.post(`${API_BASE_URL}/portfolio`, data, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio-projects"] });
      toast.success("Project created successfully!");
      resetForm();
      setIsDialogOpen(false);
    },
    onError: () => {
      toast.error("Failed to create project");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: any) =>
      axios.put(`${API_BASE_URL}/portfolio/${data._id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio-projects"] });
      toast.success("Project updated successfully!");
      resetForm();
      setIsDialogOpen(false);
    },
    onError: () => {
      toast.error("Failed to update project");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      axios.delete(`${API_BASE_URL}/portfolio/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio-projects"] });
      toast.success("Project deleted successfully!");
    },
    onError: () => {
      toast.error("Failed to delete project");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = {
      ...formData,
      technologies: formData.technologies.split(",").map((t) => t.trim()),
      results: formData.results.split(",").map((r) => r.trim()),
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

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      deleteMutation.mutate(id);
    }
  };

  const resetForm = () => {
    setFormData({
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
    });
    setIsEditing(false);
    setCurrentProject(null);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  useEffect(() => {
    if (formData.title && !isEditing) {
      setFormData((prev) => ({ ...prev, slug: generateSlug(prev.title) }));
    }
  }, [formData.title, isEditing]);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-lemon-500">Portfolio Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage your portfolio projects
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="bg-lemon-500 hover:bg-lemon-600 text-black">
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center text-lemon-500">
                  {isEditing ? "Edit Project" : "Create New Project"}
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Project Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug *</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({ ...formData, slug: e.target.value })
                      }
                      required
                      placeholder="project-slug"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      required
                      placeholder="Web Development, Branding, etc."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="client">Client *</Label>
                    <Input
                      id="client"
                      value={formData.client}
                      onChange={(e) =>
                        setFormData({ ...formData, client: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <ImageUploader
                    label="Project Image *"
                    value={formData.image}
                    onChange={(url) => setFormData({ ...formData, image: url })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="technologies">
                    Technologies (comma-separated) *
                  </Label>
                  <Input
                    id="technologies"
                    value={formData.technologies}
                    onChange={(e) =>
                      setFormData({ ...formData, technologies: e.target.value })
                    }
                    required
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="results">Results (comma-separated) *</Label>
                  <Input
                    id="results"
                    value={formData.results}
                    onChange={(e) =>
                      setFormData({ ...formData, results: e.target.value })
                    }
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
                    onChange={(e) =>
                      setFormData({ ...formData, link: e.target.value })
                    }
                    placeholder="https://example.com"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
                    className="w-4 h-4"
                  />
                  <Label htmlFor="featured" className="cursor-pointer">
                    Featured Project
                  </Label>
                </div>

                <div className="flex justify-end gap-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      resetForm();
                      setIsDialogOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-lemon-500 hover:bg-lemon-600 text-black"
                    disabled={createMutation.isPending || updateMutation.isPending}
                  >
                    {isEditing ? "Update" : "Create"} Project
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {projects.map((project: any) => (
            <Card key={project._id} className="glass-card border-border/50">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-1">
                          {project.title}
                        </h3>
                        <p className="text-sm text-primary mb-2">
                          {project.client}
                        </p>
                        <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full mb-2">
                          {project.category}
                        </span>
                        {project.featured && (
                          <span className="inline-block ml-2 px-2 py-1 bg-lemon-500/10 text-lemon-500 text-xs rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(project)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(project._id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No projects yet. Create your first project!
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default PortfolioManagement;
