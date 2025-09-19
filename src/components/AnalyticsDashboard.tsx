import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, TrendingUp, Clock, Target, Award, 
  CheckCircle, AlertCircle, Download, Share2,
  User, MessageSquare, Mic, Volume2, ArrowRight,
  Calendar, Star
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AnalyticsDashboard = () => {
  const navigate = useNavigate();
  
  // Mock data - in real app this would come from backend
  const interviewData = {
    overall: {
      score: 85,
      confidence: 78,
      duration: "28:45",
      questionsAnswered: 8,
      totalQuestions: 10,
      completionRate: 80,
    },
    categories: [
      { name: "Technical Skills", score: 88, color: "bg-primary" },
      { name: "Communication", score: 82, color: "bg-success" },
      { name: "Problem Solving", score: 79, color: "bg-analytics" },
      { name: "Leadership", score: 85, color: "bg-accent" },
    ],
    improvements: [
      {
        category: "Speaking Pace",
        current: 65,
        target: 80,
        suggestion: "Slow down slightly when explaining complex concepts"
      },
      {
        category: "Eye Contact", 
        current: 72,
        target: 85,
        suggestion: "Look directly at the camera more frequently"
      },
      {
        category: "Answer Structure",
        current: 75,
        target: 90,
        suggestion: "Use the STAR method more consistently"
      }
    ],
    questions: [
      {
        id: 1,
        question: "Tell me about yourself",
        answer: "I'm a passionate software engineer with 5 years of experience...",
        score: 88,
        feedback: "Excellent introduction with clear structure and relevant examples.",
        duration: "3:20",
        type: "Behavioral"
      },
      {
        id: 2,
        question: "What interests you about this role?", 
        answer: "I'm particularly excited about the opportunity to work with...",
        score: 85,
        feedback: "Good enthusiasm and company research evident.",
        duration: "2:45",
        type: "Behavioral"
      },
      {
        id: 3,
        question: "Describe a challenging technical problem you solved",
        answer: "Recently, I worked on optimizing a database query that was...",
        score: 92,
        feedback: "Excellent technical explanation with clear problem-solving approach.",
        duration: "4:15", 
        type: "Technical"
      }
    ]
  };

  const handleRetakeInterview = () => {
    navigate('/interview-setup');
  };

  const handleNewInterview = () => {
    navigate('/create-interviewer');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">Interview Analytics</h1>
              <p className="text-muted-foreground">Comprehensive analysis of your interview performance</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
              <Button variant="outline">
                <Share2 className="mr-2 h-4 w-4" />
                Share Results
              </Button>
              <Button variant="hero" onClick={handleNewInterview}>
                New Interview
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Overall Performance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="card-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <Badge variant="success" className="text-lg px-3 py-1">
                  {interviewData.overall.score}%
                </Badge>
              </div>
              <h3 className="font-semibold mb-1">Overall Score</h3>
              <p className="text-sm text-muted-foreground">Excellent performance</p>
            </CardContent>
          </Card>

          <Card className="card-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-full bg-success/10">
                  <Target className="h-6 w-6 text-success" />
                </div>
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {interviewData.overall.confidence}%
                </Badge>
              </div>
              <h3 className="font-semibold mb-1">Confidence Level</h3>
              <p className="text-sm text-muted-foreground">Strong delivery</p>
            </CardContent>
          </Card>

          <Card className="card-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-full bg-analytics/10">
                  <Clock className="h-6 w-6 text-analytics" />
                </div>
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {interviewData.overall.duration}
                </Badge>
              </div>
              <h3 className="font-semibold mb-1">Duration</h3>
              <p className="text-sm text-muted-foreground">Good pacing</p>
            </CardContent>
          </Card>

          <Card className="card-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-full bg-accent/10">
                  <CheckCircle className="h-6 w-6 text-accent" />
                </div>
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {interviewData.overall.questionsAnswered}/{interviewData.overall.totalQuestions}
                </Badge>
              </div>
              <h3 className="font-semibold mb-1">Questions Answered</h3>
              <p className="text-sm text-muted-foreground">
                {interviewData.overall.completionRate}% completion
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="questions">Question Details</TabsTrigger>
            <TabsTrigger value="improvements">Improvements</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Category Breakdown */}
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Performance by Category
                  </CardTitle>
                  <CardDescription>
                    Breakdown of your performance across different skill areas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {interviewData.categories.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{category.name}</span>
                        <Badge variant="outline">{category.score}%</Badge>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${category.color} transition-all duration-500`}
                          style={{ width: `${category.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Performance Trend */}
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-success" />
                    Performance Trend
                  </CardTitle>
                  <CardDescription>
                    Your improvement over recent interviews
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-success/5 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-success/10">
                          <TrendingUp className="h-4 w-4 text-success" />
                        </div>
                        <div>
                          <p className="font-medium">+12% Improvement</p>
                          <p className="text-sm text-muted-foreground">From last interview</p>
                        </div>
                      </div>
                      <Badge variant="success">Great Progress!</Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-primary">73</p>
                        <p className="text-sm text-muted-foreground">Last Score</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-success">85</p>
                        <p className="text-sm text-muted-foreground">Current</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-analytics">90+</p>
                        <p className="text-sm text-muted-foreground">Target</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Questions Tab */}
          <TabsContent value="questions" className="space-y-6">
            <div className="space-y-4">
              {interviewData.questions.map((question, index) => (
                <Card key={question.id} className="card-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                        <CardDescription className="text-base">
                          {question.question}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{question.type}</Badge>
                        <Badge variant={question.score >= 85 ? "success" : question.score >= 70 ? "secondary" : "destructive"}>
                          {question.score}%
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Your Answer
                      </h4>
                      <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                        {question.answer}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Star className="h-4 w-4" />
                        Feedback
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {question.feedback}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {question.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Mic className="h-3 w-3" />
                          Voice Analysis Available
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Volume2 className="mr-2 h-3 w-3" />
                        Replay Audio
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Improvements Tab */}
          <TabsContent value="improvements" className="space-y-6">
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Areas for Improvement
                </CardTitle>
                <CardDescription>
                  Personalized recommendations to enhance your interview performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {interviewData.improvements.map((improvement, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{improvement.category}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{improvement.current}%</span>
                        <ArrowRight className="h-3 w-3" />
                        <span className="text-primary font-medium">{improvement.target}%</span>
                      </div>
                    </div>
                    
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-primary transition-all duration-500"
                        style={{ width: `${improvement.current}%` }}
                      />
                    </div>
                    
                    <div className="flex items-start gap-2 p-3 bg-muted/30 rounded-lg">
                      <AlertCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">
                        {improvement.suggestion}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="card-shadow">
              <CardHeader>
                <CardTitle>Recommended Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <div>
                      <p className="font-medium">Practice Technical Questions</p>
                      <p className="text-sm text-muted-foreground">Focus on system design scenarios</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <div>
                      <p className="font-medium">Work on STAR Method</p>
                      <p className="text-sm text-muted-foreground">Structure behavioral responses better</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <div>
                      <p className="font-medium">Improve Eye Contact</p>
                      <p className="text-sm text-muted-foreground">Practice looking directly at camera</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Interview History
                </CardTitle>
                <CardDescription>
                  Track your progress over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { date: "Today", score: 85, type: "Software Engineer", company: "Tech Corp" },
                    { date: "3 days ago", score: 73, type: "Frontend Developer", company: "StartupXYZ" },
                    { date: "1 week ago", score: 68, type: "Full Stack Developer", company: "BigTech Inc" },
                  ].map((interview, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">{interview.type}</p>
                        <p className="text-sm text-muted-foreground">{interview.company}</p>
                        <p className="text-xs text-muted-foreground">{interview.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={interview.score >= 80 ? "success" : "secondary"}>
                          {interview.score}%
                        </Badge>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 p-6 bg-primary/5 rounded-2xl">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Ready to improve further?</h3>
            <p className="text-muted-foreground">
              Practice with different interview scenarios to boost your confidence and skills.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleRetakeInterview}>
              Retake Interview
            </Button>
            <Button variant="hero" onClick={handleNewInterview}>
              New Interview Type
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;