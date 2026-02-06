import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ChevronLeft, HelpCircle, Save } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const competencies = {
  behavioral: [
    { 
      id: "leadership", 
      name: "Leadership", 
      description: "Ability to guide, inspire, and motivate team members",
      help: "Evaluate how well the person takes initiative, makes decisions, and influences others positively."
    },
    { 
      id: "communication", 
      name: "Communication", 
      description: "Effectiveness in conveying information clearly",
      help: "Consider both verbal and written communication skills, active listening, and clarity of expression."
    },
    { 
      id: "teamwork", 
      name: "Teamwork", 
      description: "Collaboration and contribution to team success",
      help: "Assess cooperation with colleagues, willingness to help others, and contribution to team goals."
    },
  ],
  technical: [
    { 
      id: "expertise", 
      name: "Technical Expertise", 
      description: "Proficiency in required technical skills",
      help: "Evaluate the depth and breadth of technical knowledge relevant to the role."
    },
    { 
      id: "innovation", 
      name: "Innovation", 
      description: "Ability to develop creative solutions",
      help: "Consider new ideas proposed, process improvements, and creative problem-solving."
    },
  ],
  results: [
    { 
      id: "delivery", 
      name: "Delivery Quality", 
      description: "Quality and timeliness of work output",
      help: "Assess the consistency of high-quality deliverables and meeting deadlines."
    },
    { 
      id: "impact", 
      name: "Business Impact", 
      description: "Contribution to organizational goals",
      help: "Evaluate the measurable impact on business objectives and key results."
    },
  ],
};

const steps = [
  { id: "behavioral", label: "Behavioral" },
  { id: "technical", label: "Technical" },
  { id: "results", label: "Results" },
];

export default function Evaluation() {
  const [currentStep, setCurrentStep] = useState(0);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [justifications, setJustifications] = useState<Record<string, string>>({});

  const currentStepId = steps[currentStep].id;
  const currentCompetencies = competencies[currentStepId as keyof typeof competencies];

  const handleRatingChange = (id: string, value: number[]) => {
    setRatings({ ...ratings, [id]: value[0] });
  };

  const needsJustification = (id: string) => {
    const rating = ratings[id];
    return rating === 1 || rating === 5;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Performance Evaluation</h1>
        <p className="text-muted-foreground">Complete your evaluation for Cycle 2025.1</p>
      </div>

      {/* Stepper */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      index <= currentStep
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      index <= currentStep ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-4 rounded transition-colors ${
                      index < currentStep ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Competencies */}
      <div className="space-y-4">
        {currentCompetencies.map((competency) => (
          <Card key={competency.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {competency.name}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>{competency.help}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardTitle>
                  <CardDescription className="mt-1">{competency.description}</CardDescription>
                </div>
                {ratings[competency.id] && (
                  <Badge variant="outline" className="text-lg px-3 py-1">
                    {ratings[competency.id]}/5
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-muted-foreground mb-3">
                  <span>Below Expectations</span>
                  <span>Exceeds Expectations</span>
                </div>
                <Slider
                  value={[ratings[competency.id] || 3]}
                  onValueChange={(value) => handleRatingChange(competency.id, value)}
                  min={1}
                  max={5}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                </div>
              </div>

              {needsJustification(competency.id) && (
                <div className="space-y-2 pt-2 border-t">
                  <Label htmlFor={`justification-${competency.id}`} className="text-alert-red">
                    Justification Required *
                  </Label>
                  <Textarea
                    id={`justification-${competency.id}`}
                    placeholder="Please provide a detailed justification for this rating..."
                    value={justifications[competency.id] || ""}
                    onChange={(e) =>
                      setJustifications({ ...justifications, [competency.id]: e.target.value })
                    }
                    className="min-h-[100px]"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Navigation Footer */}
      <Card>
        <CardFooter className="flex justify-between pt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <Button variant="secondary" className="gap-2">
            <Save className="h-4 w-4" />
            Save Draft
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              className="bg-primary-medium hover:bg-primary-medium/90"
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button className="bg-cyan-accent hover:bg-cyan-accent/90">
              Submit Evaluation
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
