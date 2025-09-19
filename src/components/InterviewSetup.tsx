import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, FileText, Target, Clock, Settings, 
  ArrowRight, ArrowLeft, CheckCircle, AlertCircle 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const InterviewSetup = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [setup, setSetup] = useState({
    position: "",
    company: "",
    resume: null as File | null,
    duration: "30",
    difficulty: "medium",
    questionTypes: [] as string[],
    interests: "",
    additionalContext: "",
  });

  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const questionTypeOptions = [
    { id: "behavioral", label: "Behavioral Questions", description: "Tell me about a time when..." },
    { id: "technical", label: "Technical Questions", description: "Role-specific technical skills" },
    { id: "situational", label: "Situational Questions", description: "How would you handle..." },
    { id: "culture-fit", label: "Culture Fit", description: "Company values alignment" },
    { id: "leadership", label: "Leadership", description: "Management and team dynamics" },
    { id: "problem-solving", label: "Problem Solving", description: "Analytical thinking" },
  ];

  const handleQuestionTypeToggle = (typeId: string) => {
    const updatedTypes = setup.questionTypes.includes(typeId)
      ? setup.questionTypes.filter(id => id !== typeId)
      : [...setup.questionTypes, typeId];
    setSetup({ ...setup, questionTypes: updatedTypes });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSetup({ ...setup, resume: file });
    }
  };

  const isStepComplete = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return setup.position && setup.company;
      case 2:
        return setup.resume !== null;
      case 3:
        return setup.questionTypes.length > 0;
      default:
        return false;
    }
  };

  const canProceed = isStepComplete(step);

  const handleNext = () => {
    if (step < totalSteps && canProceed) {
      setStep(step + 1);
    } else if (step === totalSteps && canProceed) {
      handleStartInterview();
    }
  };

  const handleStartInterview = () => {
    console.log("Starting interview with setup:", setup);
    navigate('/interview-room');
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Interview Setup</h1>
          <p className="text-xl text-muted-foreground">
            Configure your interview parameters for the best experience
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-smooth ${
                  stepNum === step 
                    ? 'border-primary bg-primary text-white' 
                    : stepNum < step 
                      ? 'border-success bg-success text-white'
                      : 'border-muted-foreground text-muted-foreground'
                }`}>
                  {stepNum < step ? <CheckCircle className="h-5 w-5" /> : stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`flex-1 h-1 mx-4 transition-smooth ${
                    stepNum < step ? 'bg-success' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <Progress value={(step / totalSteps) * 100} className="h-2" />
        </div>

        {/* Step Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <Card className="card-shadow animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Interview Details
                  </CardTitle>
                  <CardDescription>
                    Tell us about the position you're preparing for
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="position">Position Title *</Label>
                      <Input
                        id="position"
                        placeholder="e.g., Senior Software Engineer"
                        value={setup.position}
                        onChange={(e) => setSetup({ ...setup, position: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company Name *</Label>
                      <Input
                        id="company"
                        placeholder="e.g., Google, Microsoft, Startup Inc."
                        value={setup.company}
                        onChange={(e) => setSetup({ ...setup, company: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="duration">Interview Duration</Label>
                      <Select value={setup.duration} onValueChange={(value) => setSetup({ ...setup, duration: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="difficulty">Difficulty Level</Label>
                      <Select value={setup.difficulty} onValueChange={(value) => setSetup({ ...setup, difficulty: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                          <SelectItem value="expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="interests">Areas of Interest</Label>
                    <Textarea
                      id="interests"
                      placeholder="Mention specific technologies, methodologies, or areas you want to focus on..."
                      value={setup.interests}
                      onChange={(e) => setSetup({ ...setup, interests: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Resume Upload */}
            {step === 2 && (
              <Card className="card-shadow animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Upload Resume
                  </CardTitle>
                  <CardDescription>
                    Upload your resume to generate personalized questions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div 
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-smooth cursor-pointer hover:bg-muted/50 ${
                      setup.resume ? 'border-success bg-success/5' : 'border-muted-foreground'
                    }`}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="flex flex-col items-center gap-4">
                      {setup.resume ? (
                        <>
                          <CheckCircle className="h-12 w-12 text-success" />
                          <div>
                            <p className="text-lg font-medium text-success">Resume Uploaded Successfully</p>
                            <p className="text-sm text-muted-foreground">{setup.resume.name}</p>
                            <p className="text-xs text-muted-foreground mt-2">
                              Click to upload a different file
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <Upload className="h-12 w-12 text-muted-foreground" />
                          <div>
                            <p className="text-lg font-medium">Upload Your Resume</p>
                            <p className="text-sm text-muted-foreground">
                              Drag and drop or click to select
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              Supported formats: PDF, DOC, DOCX (Max 5MB)
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium mb-1">Why do we need your resume?</p>
                        <p className="text-muted-foreground">
                          Our AI analyzes your experience, skills, and background to generate 
                          relevant, personalized interview questions that match your profile.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="context">Additional Context (Optional)</Label>
                    <Textarea
                      id="context"
                      placeholder="Any specific experiences or achievements you'd like the interviewer to focus on..."
                      value={setup.additionalContext}
                      onChange={(e) => setSetup({ ...setup, additionalContext: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Question Types */}
            {step === 3 && (
              <Card className="card-shadow animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    Question Types
                  </CardTitle>
                  <CardDescription>
                    Select the types of questions you want to practice
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {questionTypeOptions.map((option) => (
                      <Card
                        key={option.id}
                        className={`cursor-pointer border-2 transition-smooth hover:shadow-md ${
                          setup.questionTypes.includes(option.id)
                            ? 'border-primary bg-primary/5'
                            : 'border-border'
                        }`}
                        onClick={() => handleQuestionTypeToggle(option.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <Checkbox
                              checked={setup.questionTypes.includes(option.id)}
                              className="mt-1"
                            />
                            <div>
                              <div className="font-medium mb-1">{option.label}</div>
                              <div className="text-sm text-muted-foreground">{option.description}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {setup.questionTypes.length === 0 && (
                    <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-warning">
                        <AlertCircle className="h-5 w-5" />
                        <span className="font-medium">Please select at least one question type</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="card-shadow sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">Setup Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Position</span>
                    <span className="font-medium">{setup.position || "Not set"}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Company</span>
                    <span className="font-medium">{setup.company || "Not set"}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{setup.duration} min</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Difficulty</span>
                    <Badge variant="outline" className="text-xs">
                      {setup.difficulty}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Resume</span>
                    <span className={setup.resume ? "text-success" : "text-muted-foreground"}>
                      {setup.resume ? "✓ Uploaded" : "Not uploaded"}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Question Types</span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {setup.questionTypes.length > 0 ? (
                        setup.questionTypes.map((type) => (
                          <Badge key={type} variant="outline" className="text-xs">
                            {questionTypeOptions.find(opt => opt.id === type)?.label}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-muted-foreground text-xs">None selected</span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8">
          <Button 
            variant="outline" 
            onClick={() => step === 1 ? navigate('/create-interviewer') : setStep(step - 1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {step === 1 ? 'Back to Interviewer' : 'Previous'}
          </Button>
          
          <Button 
            variant={step === totalSteps ? "interview" : "hero"} 
            onClick={handleNext}
            disabled={!canProceed}
          >
            {step === totalSteps ? (
              <>
                Start Interview
                <Clock className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Next Step
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewSetup;