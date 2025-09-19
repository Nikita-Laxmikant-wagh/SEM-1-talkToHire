import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { User, UserCheck, Briefcase, Mic, Volume2, ArrowRight, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

const InterviewerCreator = () => {
  const navigate = useNavigate();
  const [interviewer, setInterviewer] = useState({
    name: "",
    gender: "",
    personality: "",
    expertise: "",
    voice: "",
    tone: [50], // 0-100 scale for formal to casual
    description: "",
    experience: [5], // years of experience
  });

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log("Saving interviewer:", interviewer);
    navigate('/interview-setup');
  };

  const personalityTypes = [
    { value: "professional", label: "Professional & Direct", description: "Formal, structured approach" },
    { value: "friendly", label: "Friendly & Encouraging", description: "Supportive and warm demeanor" },
    { value: "analytical", label: "Analytical & Detailed", description: "Focus on technical precision" },
    { value: "conversational", label: "Conversational & Relaxed", description: "Easy-going interview style" },
  ];

  const expertiseAreas = [
    "Software Engineering", "Data Science", "Product Management", "Marketing",
    "Sales", "Finance", "HR", "Consulting", "Design", "Operations"
  ];

  const voiceOptions = [
    { value: "sarah", label: "Sarah", description: "Professional female voice" },
    { value: "david", label: "David", description: "Confident male voice" },
    { value: "emma", label: "Emma", description: "Friendly female voice" },
    { value: "james", label: "James", description: "Experienced male voice" },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Create Your AI Interviewer</h1>
          <p className="text-xl text-muted-foreground">
            Customize your perfect interviewer to match your interview style and needs
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Basic Information
                </CardTitle>
                <CardDescription>
                  Set up the basic details of your AI interviewer
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Interviewer Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Alex Thompson"
                      value={interviewer.name}
                      onChange={(e) => setInterviewer({ ...interviewer, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select onValueChange={(value) => setInterviewer({ ...interviewer, gender: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="non-binary">Non-binary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your interviewer's background and approach..."
                    value={interviewer.description}
                    onChange={(e) => setInterviewer({ ...interviewer, description: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Personality & Style */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-primary" />
                  Personality & Style
                </CardTitle>
                <CardDescription>
                  Choose the interviewer's personality and communication style
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-4 block">Personality Type</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {personalityTypes.map((type) => (
                      <Card
                        key={type.value}
                        className={`cursor-pointer border-2 transition-smooth hover:shadow-md ${
                          interviewer.personality === type.value
                            ? 'border-primary bg-primary/5'
                            : 'border-border'
                        }`}
                        onClick={() => setInterviewer({ ...interviewer, personality: type.value })}
                      >
                        <CardContent className="p-4">
                          <div className="font-medium mb-1">{type.label}</div>
                          <div className="text-sm text-muted-foreground">{type.description}</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium mb-4 block">
                    Communication Tone: {interviewer.tone[0] < 30 ? 'Formal' : interviewer.tone[0] > 70 ? 'Casual' : 'Balanced'}
                  </Label>
                  <div className="px-4">
                    <Slider
                      value={interviewer.tone}
                      onValueChange={(value) => setInterviewer({ ...interviewer, tone: value })}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                      <span>Formal</span>
                      <span>Casual</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium mb-4 block">
                    Experience Level: {interviewer.experience[0]} years
                  </Label>
                  <div className="px-4">
                    <Slider
                      value={interviewer.experience}
                      onValueChange={(value) => setInterviewer({ ...interviewer, experience: value })}
                      max={20}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                      <span>1 year</span>
                      <span>20+ years</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Expertise & Voice */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Expertise & Voice
                </CardTitle>
                <CardDescription>
                  Set the interviewer's domain expertise and voice preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="expertise">Area of Expertise</Label>
                  <Select onValueChange={(value) => setInterviewer({ ...interviewer, expertise: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select expertise area" />
                    </SelectTrigger>
                    <SelectContent>
                      {expertiseAreas.map((area) => (
                        <SelectItem key={area} value={area.toLowerCase().replace(' ', '-')}>
                          {area}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-base font-medium mb-4 block">Voice Selection</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {voiceOptions.map((voice) => (
                      <Card
                        key={voice.value}
                        className={`cursor-pointer border-2 transition-smooth hover:shadow-md ${
                          interviewer.voice === voice.value
                            ? 'border-primary bg-primary/5'
                            : 'border-border'
                        }`}
                        onClick={() => setInterviewer({ ...interviewer, voice: voice.value })}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-full bg-primary/10">
                              <Volume2 className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">{voice.label}</div>
                              <div className="text-sm text-muted-foreground">{voice.description}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-1">
            <Card className="card-shadow sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-primary" />
                  Interviewer Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">
                    {interviewer.name || "Your Interviewer"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {interviewer.expertise ? expertiseAreas.find(area => 
                      area.toLowerCase().replace(' ', '-') === interviewer.expertise
                    ) : "Select expertise"}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Experience</span>
                    <Badge variant="outline">{interviewer.experience[0]} years</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Style</span>
                    <Badge variant="outline">
                      {interviewer.tone[0] < 30 ? 'Formal' : interviewer.tone[0] > 70 ? 'Casual' : 'Balanced'}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Voice</span>
                    <Badge variant="outline">
                      {voiceOptions.find(v => v.value === interviewer.voice)?.label || "Not selected"}
                    </Badge>
                  </div>
                </div>

                {interviewer.description && (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm">{interviewer.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8">
          <Button variant="outline" onClick={() => navigate('/')}>
            Back to Home
          </Button>
          <div className="flex gap-3">
            <Button variant="secondary">
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Button variant="hero" onClick={handleSave}>
              Continue to Setup
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewerCreator;