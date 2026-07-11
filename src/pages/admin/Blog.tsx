import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { adminApi } from '@/lib/adminApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Edit2, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { ImageUploader } from '@/components/admin/ImageUploader';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const emptyForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  featuredImage: '',
  category: '',
  tags: '',
  published: false,
  readTime: 0,
};

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

export default function AdminBlog() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [formData, setFormData] = useState(emptyForm);

  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await adminApi.getPosts();
      return res.data;
    },
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await adminApi.getCategories();
      return res.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => adminApi.createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post created successfully');
      closeDialog();
    },
    onError: () => toast.error('Failed to create post'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => adminApi.updatePost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post updated successfully');
      closeDialog();
    },
    onError: () => toast.error('Failed to update post'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApi.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post deleted successfully');
    },
    onError: () => toast.error('Failed to delete post'),
  });

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingPost(null);
    setFormData(emptyForm);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const postData = {
      ...formData,
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
      date: editingPost?.date || new Date().toISOString(),
    };
    if (editingPost) {
      updateMutation.mutate({ id: editingPost._id, data: postData });
    } else {
      createMutation.mutate(postData);
    }
  };

  const handleEdit = (post: any) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content,
      featuredImage: post.featuredImage || '',
      category: post.category?._id || '',
      tags: post.tags?.join(', ') || '',
      published: post.published,
      readTime: post.readTime || 0,
    });
    setIsDialogOpen(true);
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  const publishedCount = posts?.filter((p: any) => p.published).length || 0;
  const draftCount = (posts?.length || 0) - publishedCount;

  if (postsLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
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
            <h1 className="text-3xl font-bold text-foreground">Blog Posts</h1>
            <p className="text-muted-foreground">Manage your blog content</p>
          </div>
          <Button
            onClick={() => {
              setEditingPost(null);
              setFormData(emptyForm);
              setIsDialogOpen(true);
            }}
            className="bg-primary hover:bg-primary-glow text-primary-foreground transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>

        {/* Quick stats */}
        <div className="flex items-center gap-4 text-sm">
          <span className="text-muted-foreground">{posts?.length || 0} total</span>
          <span className="text-border">·</span>
          <span className="text-primary font-medium">{publishedCount} published</span>
          <span className="text-border">·</span>
          <span className="text-muted-foreground">{draftCount} draft{draftCount !== 1 ? 's' : ''}</span>
        </div>

        {/* Posts table */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-foreground">All Posts</CardTitle>
            <CardDescription>
              {posts?.length || 0} post{posts?.length !== 1 ? 's' : ''}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50">
                  <TableHead className="pl-5">Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right pr-5">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!posts || posts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-12">
                      No posts yet. Create your first post.
                    </TableCell>
                  </TableRow>
                ) : (
                  posts.map((post: any) => (
                    <TableRow key={post._id} className="border-border/50">
                      <TableCell className="pl-5 font-medium text-foreground max-w-xs">
                        <p className="truncate">{post.title}</p>
                        {post.excerpt && (
                          <p className="text-xs text-muted-foreground truncate mt-0.5">{post.excerpt}</p>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {post.category?.name || 'Uncategorized'}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            post.published
                              ? 'bg-primary/10 text-primary border-primary/20'
                              : 'bg-muted text-muted-foreground border-border'
                          }
                          variant="outline"
                        >
                          {post.published ? 'Published' : 'Draft'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {formatDate(post.date)}
                      </TableCell>
                      <TableCell className="text-right pr-5">
                        <div className="flex items-center justify-end gap-1">
                          {post.published && (
                            <Button variant="ghost" size="icon" asChild>
                              <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" title="View post">
                                <Eye className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(post)} title="Edit post">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" title="Delete post">
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Post</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{post.title}"? This cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteMutation.mutate(post._id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Create / Edit dialog */}
      <Dialog open={isDialogOpen} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="max-w-4xl flex flex-col max-h-[90vh] p-0 gap-0">
          <DialogHeader className="shrink-0 px-6 pt-6 pb-4 border-b border-border">
            <DialogTitle className="text-xl font-semibold text-foreground">
              {editingPost ? 'Edit Post' : 'Create New Post'}
            </DialogTitle>
            <DialogDescription>
              {editingPost ? 'Update the post details below.' : 'Fill in the details to publish a new blog post.'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
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
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={2}
                  placeholder="Short summary shown in blog listings"
                />
              </div>

              <div className="space-y-2">
                <Label>Content *</Label>
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                  className="bg-background"
                />
              </div>

              <ImageUploader
                label="Featured Image"
                value={formData.featuredImage}
                onChange={(url) => setFormData({ ...formData, featuredImage: url })}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((cat: any) => (
                        <SelectItem key={cat._id} value={cat._id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="readTime">Read Time (minutes)</Label>
                  <Input
                    id="readTime"
                    type="number"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="branding, design, strategy"
                />
              </div>

              <div className="flex items-center gap-3">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                />
                <Label htmlFor="published" className="cursor-pointer">
                  Publish immediately
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
                {isSaving ? 'Saving…' : editingPost ? 'Update Post' : 'Create Post'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
