import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Users,
  BarChart3,
  Mic,
  Brain,
  Star,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-interview.jpg";

const Index = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Create AI Interviewers",
      description:
        "Customize your AI interviewer with different personalities, voices, and specializations.",
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Smart Question Generation",
      description:
        "AI generates relevant questions based on your resume, job role, and interview preferences.",
    },
    {
      icon: <Mic className="h-8 w-8" />,
      title: "Voice Interviews",
      description:
        "Practice with realistic voice conversations and get real-time feedback.",
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Performance Analytics",
      description:
        "Track your progress with detailed analytics and confidence scoring.",
    },
  ];

  const stats = [
    {
      label: "Students Practiced",
      value: "10,000+",
      icon: <Users className="h-5 w-5" />,
    },
    {
      label: "Interview Success Rate",
      value: "85%",
      icon: <Star className="h-5 w-5" />,
    },
    {
      label: "Questions Generated",
      value: "50,000+",
      icon: <Brain className="h-5 w-5" />,
    },
    {
      label: "Hours Practiced",
      value: "25,000+",
      icon: <Play className="h-5 w-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">InterviewAI</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a
              href="#features"
              className="text-muted-foreground hover:text-primary transition-smooth"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-muted-foreground hover:text-primary transition-smooth"
            >
              How it Works
            </a>
            <a
              href="#pricing"
              className="text-muted-foreground hover:text-primary transition-smooth"
            >
              Pricing
            </a>
          </nav>
          <div className="flex items-center space-x-3">
            <Button variant="ghost">Sign In</Button>
            <Button
              variant="hero"
              onClick={() => navigate("/create-interviewer")}
            >
              Start Practicing
            </Button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden py-20 interview-gradient">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white animate-fade-in">
              <Badge
                variant="outline"
                className="mb-4 border-white/20 text-white"
              >
                🚀 AI-Powered Interview Practice
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Master Your
                <span className="block text-accent"> Interview Skills</span>
                with AI
              </h1>
              <p className="text-xl mb-8 text-white/90 leading-relaxed">
                Practice with personalized AI interviewers, get instant
                feedback, and boost your confidence. Land your dream job with
                our intelligent interview simulation platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  size="xl"
                  variant="success"
                  onClick={() => navigate("/create-interviewer")}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Start Free Practice
                </Button>
                <Button
                  size="xl"
                  variant="outline"
                  className="border-white/20 hover:text-white hover:bg-white/10 bg-white text-black"
                >
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center gap-6 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  No Credit Card Required
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  5-Minute Setup
                </div>
              </div>
            </div>
            <div className="animate-slide-up">
              <img
                src={heroImage}
                alt="AI Interview Platform"
                className="rounded-2xl shadow-2xl w-full h-auto interview-shadow"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in">
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Features
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools you need to
              excel in your interviews
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`card-shadow hover:shadow-lg transition-smooth cursor-pointer ${
                  activeFeature === index ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <CardHeader>
                  <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20  interview-gradient text-white">
        <div className="mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of successful candidates who improved their interview
            skills with InterviewAI
          </p>
          <Button
            size="xl"
            variant="success"
            onClick={() => navigate("/create-interviewer")}
          >
            <Play className="mr-2 h-5 w-5" />
            Start Your Practice Journey
          </Button>
        </div>
      </section>

      <footer className="border-t border-border py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Brain className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-primary">
                InterviewAI
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 InterviewAI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
