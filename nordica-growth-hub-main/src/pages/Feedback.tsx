import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Download, Check } from "lucide-react";
import { toast } from "sonner";

const competencyData = [
  { skill: "Leadership", manager: 4, self: 4 },
  { skill: "Communication", manager: 5, self: 4 },
  { skill: "Technical", manager: 4, self: 5 },
  { skill: "Teamwork", manager: 5, self: 5 },
  { skill: "Innovation", manager: 3, self: 4 },
  { skill: "Delivery", manager: 4, self: 3 },
];

export default function Feedback() {
  const [acknowledged, setAcknowledged] = useState(false);
  const [signed, setSigned] = useState(false);

  const handleSign = () => {
    if (!acknowledged) {
      toast.error("Please acknowledge the feedback first");
      return;
    }
    setSigned(true);
    toast.success("Feedback signed successfully");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Performance Feedback</h1>
        <p className="text-muted-foreground">Review and acknowledge your performance evaluation</p>
      </div>

      {/* Radar Chart Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Competency Assessment</CardTitle>
          <CardDescription>Comparison between self-evaluation and manager evaluation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full aspect-square max-w-xl mx-auto">
            {/* Simple visual representation - in production, use a proper chart library */}
            <svg viewBox="0 0 400 400" className="w-full h-full">
              {/* Background grid */}
              <circle cx="200" cy="200" r="160" fill="none" stroke="hsl(var(--border))" strokeWidth="1" />
              <circle cx="200" cy="200" r="120" fill="none" stroke="hsl(var(--border))" strokeWidth="1" />
              <circle cx="200" cy="200" r="80" fill="none" stroke="hsl(var(--border))" strokeWidth="1" />
              <circle cx="200" cy="200" r="40" fill="none" stroke="hsl(var(--border))" strokeWidth="1" />

              {/* Axis lines */}
              {competencyData.map((_, i) => {
                const angle = (i * 360) / competencyData.length - 90;
                const x = 200 + 160 * Math.cos((angle * Math.PI) / 180);
                const y = 200 + 160 * Math.sin((angle * Math.PI) / 180);
                return (
                  <line
                    key={`axis-${i}`}
                    x1="200"
                    y1="200"
                    x2={x}
                    y2={y}
                    stroke="hsl(var(--border))"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Manager ratings polygon */}
              <polygon
                points={competencyData
                  .map((item, i) => {
                    const angle = (i * 360) / competencyData.length - 90;
                    const distance = (item.manager / 5) * 160;
                    const x = 200 + distance * Math.cos((angle * Math.PI) / 180);
                    const y = 200 + distance * Math.sin((angle * Math.PI) / 180);
                    return `${x},${y}`;
                  })
                  .join(" ")}
                fill="hsl(var(--cyan-accent) / 0.2)"
                stroke="hsl(var(--cyan-accent))"
                strokeWidth="2"
              />

              {/* Self ratings polygon */}
              <polygon
                points={competencyData
                  .map((item, i) => {
                    const angle = (i * 360) / competencyData.length - 90;
                    const distance = (item.self / 5) * 160;
                    const x = 200 + distance * Math.cos((angle * Math.PI) / 180);
                    const y = 200 + distance * Math.sin((angle * Math.PI) / 180);
                    return `${x},${y}`;
                  })
                  .join(" ")}
                fill="hsl(var(--primary-light) / 0.2)"
                stroke="hsl(var(--primary-light))"
                strokeWidth="2"
              />

              {/* Labels */}
              {competencyData.map((item, i) => {
                const angle = (i * 360) / competencyData.length - 90;
                const x = 200 + 190 * Math.cos((angle * Math.PI) / 180);
                const y = 200 + 190 * Math.sin((angle * Math.PI) / 180);
                return (
                  <text
                    key={`label-${i}`}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    className="text-xs fill-current"
                    dominantBaseline="middle"
                  >
                    {item.skill}
                  </text>
                );
              })}
            </svg>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-8 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: "hsl(var(--cyan-accent))" }} />
              <span className="text-sm">Manager Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: "hsl(var(--primary-light))" }} />
              <span className="text-sm">Self Rating</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feedback Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Manager Feedback Summary</CardTitle>
          <CardDescription>Evaluation Period: 2025.1</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Strengths</h3>
            <p className="text-muted-foreground">
              Maria consistently demonstrates exceptional communication skills and teamwork. Her ability to
              collaborate effectively with cross-functional teams and articulate complex technical concepts
              to stakeholders has been instrumental in project success. Her leadership qualities are evident
              in how she mentors junior team members.
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">Areas for Development</h3>
            <p className="text-muted-foreground">
              While technical skills are solid, there's an opportunity to further develop expertise in cloud
              architecture and emerging technologies. Focus on innovation and proposing new solutions could
              be enhanced. Consider taking the AWS certification as discussed in your PDI.
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">Goals for Next Period</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Lead at least one major client project independently</li>
              <li>Complete AWS Solutions Architect certification</li>
              <li>Mentor two junior consultants</li>
              <li>Present findings at quarterly leadership meeting</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Signature Section */}
      <Card className={signed ? "border-cyan-accent" : ""}>
        <CardHeader>
          <CardTitle>Acknowledgment & Signature</CardTitle>
          <CardDescription>
            Please review the feedback and provide your acknowledgment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!signed ? (
            <>
              <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                <Checkbox
                  id="acknowledge"
                  checked={acknowledged}
                  onCheckedChange={(checked) => setAcknowledged(checked === true)}
                />
                <div className="space-y-1">
                  <Label htmlFor="acknowledge" className="cursor-pointer font-medium">
                    I acknowledge the feedback received
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    By checking this box, I confirm that I have read and understood the performance feedback
                    provided by my manager. This acknowledgment does not necessarily indicate agreement with
                    all aspects of the evaluation.
                  </p>
                </div>
              </div>

              <div className="border-2 border-dashed rounded-lg p-12 text-center bg-muted/30">
                <p className="text-muted-foreground mb-4">Click below to sign electronically</p>
                <Button
                  size="lg"
                  onClick={handleSign}
                  disabled={!acknowledged}
                  className="bg-cyan-accent hover:bg-cyan-accent/90 text-white"
                >
                  Sign Feedback
                </Button>
              </div>
            </>
          ) : (
            <div className="border-2 border-cyan-accent rounded-lg p-8 text-center bg-cyan-accent/5">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-cyan-accent flex items-center justify-center">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-cyan-accent mb-1">
                    Feedback Signed Successfully
                  </h3>
                  <p className="text-muted-foreground">
                    Signed on {new Date().toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            {signed && (
              <Button variant="outline">Add Comments (Optional)</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
