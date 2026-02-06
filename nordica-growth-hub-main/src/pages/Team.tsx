import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Bell, Sliders, Mail, MoreVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    role: "Consultant",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    status: "in-progress",
    progress: 45,
    selfEval: "Completed",
    peerEvals: 2,
    managerEval: "Pending",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Senior Consultant",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    status: "completed",
    progress: 100,
    selfEval: "Completed",
    peerEvals: 3,
    managerEval: "Completed",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Junior Consultant",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    status: "not-started",
    progress: 0,
    selfEval: "Not Started",
    peerEvals: 0,
    managerEval: "Not Started",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    role: "Consultant",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    status: "in-progress",
    progress: 75,
    selfEval: "Completed",
    peerEvals: 2,
    managerEval: "In Progress",
  },
];

export default function Team() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-cyan-accent text-white">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-primary-light text-white">In Progress</Badge>;
      case "not-started":
        return <Badge variant="secondary">Not Started</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Team Overview</h1>
          <p className="text-muted-foreground">Manage and monitor your team's evaluation progress</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Bell className="h-4 w-4" />
            Remind All
          </Button>
          <Button className="bg-primary-light hover:bg-primary-light/90 text-white gap-2">
            <Sliders className="h-4 w-4" />
            Calibrate
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Team Members</CardDescription>
            <CardTitle className="text-3xl">4</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Completed</CardDescription>
            <CardTitle className="text-3xl text-cyan-accent">1</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>In Progress</CardDescription>
            <CardTitle className="text-3xl text-primary-light">2</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Not Started</CardDescription>
            <CardTitle className="text-3xl text-muted-foreground">1</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Team Members Table */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>Monitor individual progress and take actions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Self-Eval</TableHead>
                <TableHead>Peer Evals</TableHead>
                <TableHead>Manager Eval</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(member.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3 min-w-[150px]">
                      <Progress value={member.progress} className="flex-1" />
                      <span className="text-sm font-medium min-w-[40px] text-right">
                        {member.progress}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={member.selfEval === "Completed" ? "text-cyan-accent font-medium" : ""}>
                      {member.selfEval}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{member.peerEvals} of 3</Badge>
                  </TableCell>
                  <TableCell>
                    <span className={member.managerEval === "Completed" ? "text-cyan-accent font-medium" : ""}>
                      {member.managerEval}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Sliders className="mr-2 h-4 w-4" />
                          Calibrate
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Reminder
                        </DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
