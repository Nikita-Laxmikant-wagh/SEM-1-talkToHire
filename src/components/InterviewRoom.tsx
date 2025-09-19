import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Mic, MicOff, Volume2, VolumeX, Play, Pause, Square, 
  Clock, MessageCircle, User, Brain, Settings, BarChart3,
  ArrowRight, CheckCircle, AlertCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const InterviewRoom = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [interviewTime, setInterviewTime] = useState(0);
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [confidence, setConfidence] = useState(75);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'interviewer',
      content: "Hello! I'm Alex, your AI interviewer today. I'm excited to get to know you better. Let's start with a simple question - could you tell me a bit about yourself and your background?",
      timestamp: new Date(),
      isAudio: true,
    }
  ]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const mockQuestions = [
    "Tell me about yourself and your background",
    "What interests you about this role?", 
    "Describe a challenging project you've worked on",
    "How do you handle working under pressure?",
    "Where do you see yourself in 5 years?"
  ];

  useEffect(() => {
    if (isInterviewActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setInterviewTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isInterviewActive, isPaused]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartInterview = () => {
    setIsInterviewActive(true);
    setIsRecording(true);
  };

  const handleEndInterview = () => {
    setIsInterviewActive(false);
    setIsRecording(false);
    navigate('/analytics');
  };

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      const newMessage = {
        id: messages.length + 1,
        sender: 'interviewer' as const,
        content: mockQuestions[currentQuestionIndex + 1],
        timestamp: new Date(),
        isAudio: true,
      };
      setMessages([...messages, newMessage]);
    }
  };

  const simulateUserResponse = () => {
    const responses = [
      "Thank you for that question. I have over 5 years of experience in software development...",
      "I'm particularly drawn to this role because it combines my technical skills with leadership opportunities...",
      "One of the most challenging projects I worked on was building a distributed system that required...",
      "When working under pressure, I focus on prioritizing tasks and maintaining clear communication with my team..."
    ];
    
    const newMessage = {
      id: messages.length + 1,
      sender: 'user' as const,
      content: responses[Math.floor(Math.random() * responses.length)],
      timestamp: new Date(),
      isAudio: false,
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold text-primary">InterviewAI</span>
              </div>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-mono text-lg">{formatTime(interviewTime)}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Badge variant={isInterviewActive ? "success" : "secondary"} className="px-3 py-1">
                {isInterviewActive ? "Active" : "Waiting"}
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Interview Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Interviewer Video/Avatar */}
            <Card className="card-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Alex Thompson</h3>
                      <p className="text-sm text-muted-foreground">Senior Technical Interviewer</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`} />
                    <span className="text-sm text-muted-foreground">
                      {isRecording ? 'Recording' : 'Standby'}
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 text-center min-h-[300px] flex items-center justify-center">
                  <div className="space-y-4">
                    <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                      <User className="h-12 w-12 text-primary" />
                    </div>
                    <div>
                      <p className="text-lg font-medium mb-2">AI Interviewer Ready</p>
                      <p className="text-muted-foreground">
                        {isInterviewActive 
                          ? "Interview in progress..." 
                          : "Click 'Start Interview' to begin your session"
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interview Controls */}
            <Card className="card-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {!isInterviewActive ? (
                      <Button size="lg" variant="interview" onClick={handleStartInterview}>
                        <Play className="mr-2 h-5 w-5" />
                        Start Interview
                      </Button>
                    ) : (
                      <>
                        <Button
                          size="lg"
                          variant={isRecording ? "destructive" : "success"}
                          onClick={handleToggleRecording}
                        >
                          {isRecording ? (
                            <>
                              <MicOff className="mr-2 h-5 w-5" />
                              Stop Recording
                            </>
                          ) : (
                            <>
                              <Mic className="mr-2 h-5 w-5" />
                              Start Recording
                            </>
                          )}
                        </Button>

                        <Button
                          variant="outline"
                          onClick={() => setIsPaused(!isPaused)}
                        >
                          {isPaused ? (
                            <>
                              <Play className="mr-2 h-4 w-4" />
                              Resume
                            </>
                          ) : (
                            <>
                              <Pause className="mr-2 h-4 w-4" />
                              Pause
                            </>
                          )}
                        </Button>

                        <Button variant="outline" onClick={simulateUserResponse}>
                          Simulate Response
                        </Button>
                      </>
                    )}
                  </div>

                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? (
                        <VolumeX className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                    </Button>

                    {isInterviewActive && (
                      <>
                        <Button variant="outline" onClick={handleNextQuestion}>
                          Next Question
                        </Button>
                        <Button variant="destructive" onClick={handleEndInterview}>
                          <Square className="mr-2 h-4 w-4" />
                          End Interview
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Live Transcript */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Live Transcript
                </CardTitle>
                <CardDescription>
                  Real-time conversation transcript
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                            {message.sender === 'user' ? (
                              <User className="h-4 w-4" />
                            ) : (
                              <Brain className="h-4 w-4" />
                            )}
                          </div>
                          <span className="text-sm font-medium">
                            {message.sender === 'user' ? 'You' : 'Alex'}
                          </span>
                          {message.isAudio && (
                            <Volume2 className="h-3 w-3 opacity-70" />
                          )}
                        </div>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <p className="text-xs opacity-70 mt-2">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Progress & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Interview Progress */}
            <Card className="card-shadow sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Interview Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Questions Completed</span>
                    <span>{currentQuestionIndex + 1}/{mockQuestions.length}</span>
                  </div>
                  <Progress value={((currentQuestionIndex + 1) / mockQuestions.length) * 100} />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Duration</span>
                    <Badge variant="outline">{formatTime(interviewTime)}</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Confidence</span>
                    <Badge variant="success">{confidence}%</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Speech Rate</span>
                    <Badge variant="outline">Normal</Badge>
                  </div>
                </div>

                {isInterviewActive && (
                  <div className="pt-4 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => navigate('/analytics')}
                    >
                      <BarChart3 className="mr-2 h-4 w-4" />
                      View Analytics
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Interview Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                    <span>Maintain eye contact with camera</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                    <span>Speak clearly and at normal pace</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-warning mt-0.5" />
                    <span>Take your time to think before answering</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                    <span>Use specific examples in your responses</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Question */}
            {isInterviewActive && (
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Current Question</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">
                    {mockQuestions[currentQuestionIndex]}
                  </p>
                  <div className="mt-4 pt-4 border-t">
                    <Button size="sm" variant="outline" className="w-full" onClick={handleNextQuestion}>
                      Next Question
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewRoom;