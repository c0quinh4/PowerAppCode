import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, Award, Paperclip, Edit, Trash2, Target } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockGoals = [
  {
    id: 1,
    title: "Complete AWS Certification",
    description: "Obtain AWS Solutions Architect Associate certification to enhance cloud infrastructure knowledge",
    deadline: "2025-06-30",
    certification: "AWS Solutions Architect",
    status: "in-progress",
    progress: 65,
  },
  {
    id: 2,
    title: "Lead Cross-functional Project",
    description: "Successfully deliver a major client project involving multiple departments",
    deadline: "2025-04-15",
    certification: null,
    status: "in-progress",
    progress: 40,
  },
  {
    id: 3,
    title: "Improve Public Speaking",
    description: "Complete presentation skills workshop and deliver quarterly team presentations",
    deadline: "2025-02-28",
    certification: null,
    status: "overdue",
    progress: 20,
  },
];

export default function PDI() {
  const [goals, setGoals] = useState(mockGoals);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isOverdue = (deadline: string) => {
    return new Date(deadline) < new Date();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-cyan-accent";
      case "in-progress":
        return "bg-primary-light";
      case "overdue":
        return "bg-alert-red";
      default:
        return "bg-muted";
    }
  };

  const getProgressBarColor = (deadline: string) => {
    return isOverdue(deadline) ? "bg-alert-red" : "bg-cyan-accent";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Personal Development Plan</h1>
          <p className="text-muted-foreground">Track your professional growth goals and certifications</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-cyan-accent hover:bg-cyan-accent/90 text-white gap-2">
              <Plus className="h-4 w-4" />
              Add New Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Goal</DialogTitle>
              <DialogDescription>
                Define a new development goal and link certifications if applicable
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Goal Title</Label>
                <Input id="title" placeholder="e.g., Complete PMP Certification" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide details about this goal..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="deadline">Target Deadline</Label>
                  <Input id="deadline" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certification">Link Certification</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select certification" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aws">AWS Solutions Architect</SelectItem>
                      <SelectItem value="pmp">PMP Certification</SelectItem>
                      <SelectItem value="scrum">Scrum Master</SelectItem>
                      <SelectItem value="none">No Certification</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="evidence">Upload Certificate Evidence</Label>
                <div className="flex items-center gap-2">
                  <Input id="evidence" type="file" accept=".pdf,.jpg,.png" />
                  <Button variant="outline" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-cyan-accent hover:bg-cyan-accent/90">
                Create Goal
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Timeline View */}
      <div className="space-y-4">
        {goals.map((goal) => (
          <Card key={goal.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-xl">{goal.title}</CardTitle>
                    <Badge className={`${getStatusColor(goal.status)} text-white`}>
                      {goal.status.replace("-", " ").toUpperCase()}
                    </Badge>
                  </div>
                  <CardDescription className="text-base">{goal.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-alert-red" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {goal.certification && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Award className="h-4 w-4 text-primary-light" />
                  <span>Linked to: {goal.certification}</span>
                </div>
              )}
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Target: {new Date(goal.deadline).toLocaleDateString("en-US", { 
                        month: "long", 
                        day: "numeric", 
                        year: "numeric" 
                      })}
                    </span>
                    {isOverdue(goal.deadline) && (
                      <Badge variant="outline" className="text-alert-red border-alert-red">
                        OVERDUE
                      </Badge>
                    )}
                  </div>
                  <span className="font-medium">{goal.progress}%</span>
                </div>
                
                {/* Gantt-style Progress Bar */}
                <div className="relative h-8 bg-muted rounded-lg overflow-hidden">
                  <div
                    className={`absolute inset-y-0 left-0 ${getProgressBarColor(goal.deadline)} transition-all duration-300`}
                    style={{ width: `${goal.progress}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-medium text-foreground/80 mix-blend-difference">
                      {goal.progress}% Complete
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {goals.length === 0 && (
        <Card className="p-12">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <Target className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">No goals yet</h3>
              <p className="text-muted-foreground">Start building your professional development plan</p>
            </div>
            <Button className="bg-cyan-accent hover:bg-cyan-accent/90 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Goal
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
