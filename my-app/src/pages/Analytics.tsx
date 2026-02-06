import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const employees = [
  { id: 1, name: "John Doe", x: 70, y: 80, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John" },
  { id: 2, name: "Sarah Johnson", x: 85, y: 85, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
  { id: 3, name: "Michael Chen", x: 45, y: 60, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael" },
  { id: 4, name: "Emily Rodriguez", x: 75, y: 50, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily" },
  { id: 5, name: "David Kim", x: 55, y: 85, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David" },
  { id: 6, name: "Lisa Anderson", x: 30, y: 40, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa" },
];

const boxLabels = [
  { x: 0, y: 2, label: "Low Potential\nHigh Performer", color: "bg-secondary-light/20" },
  { x: 1, y: 2, label: "High Potential\nHigh Performer", color: "bg-cyan-accent/20" },
  { x: 2, y: 2, label: "Star\nPerformer", color: "bg-primary-light/30" },
  
  { x: 0, y: 1, label: "Core\nPerformer", color: "bg-muted/40" },
  { x: 1, y: 1, label: "Solid\nPerformer", color: "bg-primary-medium/10" },
  { x: 2, y: 1, label: "Growth\nPotential", color: "bg-primary-light/20" },
  
  { x: 0, y: 0, label: "Under\nPerformer", color: "bg-alert-red/10" },
  { x: 1, y: 0, label: "Development\nNeeded", color: "bg-secondary-medium/10" },
  { x: 2, y: 0, label: "Inconsistent\nPerformer", color: "bg-muted/30" },
];

export default function Analytics() {
  const getBoxPosition = (value: number) => {
    if (value < 40) return 0;
    if (value < 70) return 1;
    return 2;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">9-Box Talent Matrix</h1>
        <p className="text-muted-foreground">Performance and potential calibration tool</p>
      </div>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">How to Read the Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-primary-light/30" />
              <span className="text-sm">High Potential + High Performance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-cyan-accent/20" />
              <span className="text-sm">Strong Contributors</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-alert-red/10" />
              <span className="text-sm">Needs Development</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 9-Box Grid */}
      <Card>
        <CardContent className="p-8">
          <div className="relative">
            {/* Y-Axis Label */}
            <div className="absolute -left-16 top-1/2 -translate-y-1/2 -rotate-90">
              <span className="text-sm font-semibold text-muted-foreground">POTENTIAL</span>
            </div>

            {/* X-Axis Label */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
              <span className="text-sm font-semibold text-muted-foreground">DELIVERY / RESULTS</span>
            </div>

            {/* Grid Container */}
            <div className="grid grid-cols-3 gap-3 aspect-square max-w-3xl mx-auto">
              {boxLabels.map((box, index) => {
                const gridY = 2 - box.y; // Invert Y for CSS grid
                return (
                  <div
                    key={index}
                    className={`relative border-2 border-border rounded-lg ${box.color} p-4 flex items-center justify-center`}
                    style={{
                      gridColumn: box.x + 1,
                      gridRow: gridY + 1,
                    }}
                  >
                    {/* Box Label */}
                    <div className="text-center text-xs font-medium text-muted-foreground whitespace-pre-line pointer-events-none">
                      {box.label}
                    </div>

                    {/* Employees in this box */}
                    {employees
                      .filter((emp) => {
                        const empBoxX = getBoxPosition(emp.x);
                        const empBoxY = getBoxPosition(emp.y);
                        return empBoxX === box.x && empBoxY === box.y;
                      })
                      .map((emp, empIndex) => (
                        <div
                          key={emp.id}
                          className="absolute cursor-move hover:scale-110 transition-transform"
                          style={{
                            left: `${(empIndex % 2) * 50 + 20}%`,
                            top: `${Math.floor(empIndex / 2) * 40 + 30}%`,
                          }}
                        >
                          <Avatar className="h-12 w-12 border-3 border-card shadow-lg">
                            <AvatarImage src={emp.avatar} />
                            <AvatarFallback>
                              {emp.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <Badge
                            variant="secondary"
                            className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] px-1.5 py-0.5 whitespace-nowrap"
                          >
                            {emp.name.split(" ")[0]}
                          </Badge>
                        </div>
                      ))}
                  </div>
                );
              })}
            </div>

            {/* Y-Axis Scale */}
            <div className="absolute -left-8 top-0 bottom-0 flex flex-col justify-between text-xs text-muted-foreground">
              <span>High</span>
              <span>Med</span>
              <span>Low</span>
            </div>

            {/* X-Axis Scale */}
            <div className="absolute -bottom-4 left-0 right-0 flex justify-between text-xs text-muted-foreground px-2">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>High Potential Talent</CardDescription>
            <CardTitle className="text-3xl text-primary-light">3</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">33% of team</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Star Performers</CardDescription>
            <CardTitle className="text-3xl text-cyan-accent">2</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">22% of team</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Development Focus</CardDescription>
            <CardTitle className="text-3xl text-secondary-medium">1</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">11% of team</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
