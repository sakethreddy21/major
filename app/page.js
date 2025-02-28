"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Send, Frown, Smile, Meh, Heart, Angry, ThumbsUp } from "lucide-react"

export default function EmotionAnalyzer() {
  const [text, setText] = useState("")
  const [emotion, setEmotion] = useState(null)
  const [loading, setLoading] = useState(false)

  const analyzeEmotion = async () => {
    if (!text.trim()) return

    setLoading(true)
    setEmotion(null)

    try {
      const response = await fetch("/api/analyzeEmotion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      })

      const data = await response.json()
      setEmotion(data.emotion)
    } catch (error) {
      setEmotion("Error analyzing emotion.")
    }

    setLoading(false)
  }

  const getEmotionIcon = (emotion) => {
    switch (emotion?.toLowerCase()) {
      case "happy":
      case "joy":
        return <Smile className="h-6 w-6 text-yellow-500" />;
      case "sad":
      case "sadness":
        return <Frown className="h-6 w-6 text-blue-500" />;
      case "angry":
      case "anger":
        return <Angry className="h-6 w-6 text-red-500" />;
      case "love":
        return <Heart className="h-6 w-6 text-pink-500" />;
      case "neutral":
        return <Meh className="h-6 w-6 text-gray-500" />;
      case "positive":
        return <ThumbsUp className="h-6 w-6 text-green-500" />;
      case "sarcasm":
        return <Meh className="h-6 w-6 text-purple-500" />; // Add a new color for sarcasm
      default:
        return <Meh className="h-6 w-6 text-gray-500" />;
    }
  };
  
  const getEmotionColor = (emotion) => {
    switch (emotion?.toLowerCase()) {
      case "happy":
      case "joy":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "sad":
      case "sadness":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "angry":
      case "anger":
        return "bg-red-100 text-red-800 border-red-200";
      case "love":
        return "bg-pink-100 text-pink-800 border-pink-200";
      case "neutral":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "positive":
        return "bg-green-100 text-green-800 border-green-200";
      case "sarcasm":
        return "bg-purple-100 text-purple-800 border-purple-200"; // Unique color for sarcasm
      case "error analyzing emotion.":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md shadow-lg border-slate-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-slate-800">Emotion Analyzer</CardTitle>
          <CardDescription>Enter text to analyze the emotional tone</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="How are you feeling today? Type your thoughts here..."
            className="min-h-[120px] resize-none focus:ring-2 focus:ring-primary/50"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {emotion && (
            <div
              className={`mt-6 p-4 rounded-lg border ${getEmotionColor(emotion)} transition-all duration-300 ease-in-out`}
            >
              <div className="flex items-center gap-3">
                {getEmotionIcon(emotion)}
                <div>
                  <p className="text-sm font-medium">Detected Emotion</p>
                  <p className="text-lg font-bold capitalize">{emotion}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Badge variant="outline" className="text-xs text-slate-500">
            AI-Powered Analysis
          </Badge>
          <Button onClick={analyzeEmotion} disabled={loading || !text.trim()} className="gap-2">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Analyze
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

