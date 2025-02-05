"use client";
import { useState } from "react";
import { analyzeResume } from "@/actions/analyze";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area"


export default function AnalyzePage() {
  const [field, setField] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    if (!pdfFile) {
      alert("Please upload a PDF file!");
      setLoading(false);
      return;
    }

    const extractTextFromPDF = async (file) => {
      const { getDocument } = await import("pdfjs-dist/webpack");
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await getDocument({ data: arrayBuffer }).promise;

      let fullText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" ");
        fullText += pageText + "\n";
      }

      return fullText;
    };

    try {
      const resumeText = await extractTextFromPDF(pdfFile);
      const analysis = await analyzeResume(resumeText, field);
      setResult(analysis);
    } catch (error) {
      console.error("Error:", error);
      setResult("An error occurred while analyzing the resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-color-mode="light" className="relative h-screen bg-black-900 p-6">
      {/* Title in the top-left corner */}
      <h1 className="absolute top-6 left-6 font-bold gradient-title text-5xl md:text-6xl">
        Resume Analyzer
      </h1>

      {/* Centered form */}
      <div className="max-w-3xl mx-auto mt-24 bg-black shadow-lg rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Upload Your Resume (PDF):
            </label>
            <Input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              required
              className="w-full border-gray-700 bg-black-800 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Field of Interest:
            </label>
            <Input
              type="text"
              value={field}
              onChange={(e) => setField(e.target.value)}
              required
              className="w-full border-gray-700 bg-black text-white"
            />
          </div>
          <Button type="submit" className="w-full flex justify-center items-center gap-2" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> Analyzing...
              </>
            ) : (
              "Analyze Resume"
            )}
          </Button>
        </form>

        {/* Display result without a card */}
        {result && (
          <ScrollArea className="mt-6 rounded-md border p-4 h-80 overflow-y-auto">
            <h2 className="text-white text-lg font-semibold mb-2 text-center">Analysis Result:</h2>
            <pre className="whitespace-pre-wrap text-white text-sm font-mono p-3 bg-black-800 rounded-lg border border-gray-700">
              {result}
            </pre>
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
