import { useState } from "react";
import { Plus, Pencil, Trash2, UserPlus, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "employee";
  department: string;
  avatar: string;
  status: "active" | "inactive";
}

const initialUsers: User[] = [
  { id: "1", name: "Gabriel Lopes", email: "gabriel.lopes@nordica.com", role: "admin", department: "TI", avatar: "Gabriel", status: "active" },
  { id: "2", name: "Maria Silva", email: "maria.silva@nordica.com", role: "manager", department: "RH", avatar: "Maria", status: "active" },
  { id: "3", name: "João Santos", email: "joao.santos@nordica.com", role: "employee", department: "Vendas", avatar: "Joao", status: "active" },
  { id: "4", name: "Ana Costa", email: "ana.costa@nordica.com", role: "employee", department: "Marketing", avatar: "Ana", status: "inactive" },
  { id: "5", name: "Carlos Oliveira", email: "carlos.oliveira@nordica.com", role: "manager", department: "Financeiro", avatar: "Carlos", status: "active" },
];

const roleLabels: Record<string, string> = {
  admin: "Administrador",
  manager: "Gestor",
  employee: "Colaborador",
};

const roleBadgeVariants: Record<string, string> = {
  admin: "bg-primary-medium text-white",
  manager: "bg-cyan-accent text-white",
  employee: "bg-secondary-light text-primary-dark",
};

const Settings = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "employee" as "admin" | "manager" | "employee",
    department: "",
  });

  const openAddDialog = () => {
    setEditingUser(null);
    setFormData({ name: "", email: "", role: "employee", department: "" });
    setIsDialogOpen(true);
  };

  const openEditDialog = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
    });
    setIsDialogOpen(true);
  };

  const openDeleteDialog = (user: User) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.department) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    if (editingUser) {
      setUsers(users.map(u => 
        u.id === editingUser.id 
          ? { ...u, ...formData }
          : u
      ));
      toast.success("Usuário atualizado com sucesso!");
    } else {
      const newUser: User = {
        id: Date.now().toString(),
        ...formData,
        avatar: formData.name.split(" ")[0],
        status: "active",
      };
      setUsers([...users, newUser]);
      toast.success("Usuário adicionado com sucesso!");
    }
    setIsDialogOpen(false);
  };

  const handleDelete = () => {
    if (userToDelete) {
      setUsers(users.filter(u => u.id !== userToDelete.id));
      toast.success("Usuário removido com sucesso!");
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground mt-1">Gerencie usuários e permissões do sistema</p>
        </div>
        <Button onClick={openAddDialog} className="bg-cyan-accent hover:bg-cyan-accent/90 text-white">
          <UserPlus className="h-4 w-4 mr-2" />
          Adicionar Usuário
        </Button>
      </div>

      {/* Users List */}
      <Card className="border-border shadow-sm">
        <CardHeader className="border-b border-border">
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary-medium" />
            Usuários do Sistema
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {users.map((user) => (
              <div 
                key={user.id} 
                className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-11 w-11 border-2 border-primary-light/30">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.avatar}`} />
                    <AvatarFallback className="bg-primary-medium text-white">
                      {user.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">{user.name}</p>
                      {user.status === "inactive" && (
                        <Badge variant="outline" className="text-xs text-muted-foreground">Inativo</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{user.department}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge className={`${roleBadgeVariants[user.role]} font-medium`}>
                    {roleLabels[user.role]}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => openEditDialog(user)}
                      className="h-8 w-8 text-muted-foreground hover:text-primary-medium hover:bg-primary-light/10"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => openDeleteDialog(user)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit User Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md bg-card">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {editingUser ? "Editar Usuário" : "Adicionar Usuário"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input 
                id="name" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Digite o nome completo"
                className="border-border"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input 
                id="email" 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@empresa.com"
                className="border-border"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="department">Departamento</Label>
              <Input 
                id="department" 
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                placeholder="Ex: TI, RH, Vendas"
                className="border-border"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Perfil de Permissão</Label>
              <Select 
                value={formData.role} 
                onValueChange={(value: "admin" | "manager" | "employee") => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger className="border-border">
                  <SelectValue placeholder="Selecione o perfil" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="employee">Colaborador - Acesso básico</SelectItem>
                  <SelectItem value="manager">Gestor - Gerencia equipe</SelectItem>
                  <SelectItem value="admin">Administrador - Acesso total</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-border">
              Cancelar
            </Button>
            <Button onClick={handleSubmit} className="bg-primary-medium hover:bg-primary-medium/90 text-white">
              {editingUser ? "Salvar Alterações" : "Adicionar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-sm bg-card">
          <DialogHeader>
            <DialogTitle className="text-foreground">Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground py-4">
            Tem certeza que deseja remover <strong>{userToDelete?.name}</strong> do sistema? Esta ação não pode ser desfeita.
          </p>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} className="border-border">
              Cancelar
            </Button>
            <Button onClick={handleDelete} className="bg-destructive hover:bg-destructive/90 text-white">
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Settings;
