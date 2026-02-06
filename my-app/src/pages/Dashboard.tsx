import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, Target, AlertCircle, CheckCircle2, Lock, Play } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary-medium rounded-xl p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Maria Silva</h1>
        <p className="text-white/90 text-lg">Senior Consultant • 3 years with Nordica</p>
      </div>

      {/* Status Card */}
      <Card className="border-primary-light/20 shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Cycle 2025.1</CardTitle>
              <CardDescription className="text-base mt-1">Performance Evaluation Period</CardDescription>
            </div>
            <Badge className="bg-cyan-accent text-white px-4 py-2 text-sm font-medium">
              Open
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">Overall Progress</span>
              <span className="text-primary-medium font-semibold">60%</span>
            </div>
            <Progress value={60} className="h-3" />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Deadline: March 31, 2025</span>
          </div>
        </CardContent>
      </Card>

      {/* Pending Actions Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">My Pending Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">Self-Evaluation</CardTitle>
                  <CardDescription className="mt-1">Complete your self-assessment</CardDescription>
                </div>
                <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-cyan-accent hover:bg-cyan-accent/90 text-white">
                <Play className="mr-2 h-4 w-4" />
                Start
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">Peer Evaluation</CardTitle>
                  <CardDescription className="mt-1">Evaluate: John Doe</CardDescription>
                </div>
                <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-cyan-accent hover:bg-cyan-accent/90 text-white">
                <Play className="mr-2 h-4 w-4" />
                Start
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200 opacity-75">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">Feedback Signature</CardTitle>
                  <CardDescription className="mt-1">Awaiting manager feedback</CardDescription>
                </div>
                <Lock className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="secondary" disabled>
                <Lock className="mr-2 h-4 w-4" />
                Locked
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* KPIs Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Active Goals</CardDescription>
            <CardTitle className="text-3xl">3</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-cyan-accent">
              <Target className="h-4 w-4" />
              <span className="font-medium">On track</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-alert-red/20">
          <CardHeader className="pb-3">
            <CardDescription>Overdue Goals</CardDescription>
            <CardTitle className="text-3xl text-alert-red">1</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-alert-red">
              <AlertCircle className="h-4 w-4" />
              <span className="font-medium">Needs attention</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Completed Tasks</CardDescription>
            <CardTitle className="text-3xl">8</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-primary-medium">
              <CheckCircle2 className="h-4 w-4" />
              <span className="font-medium">This cycle</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Peer Reviews</CardDescription>
            <CardTitle className="text-3xl">2</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="font-medium">Pending</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
