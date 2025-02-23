"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Book, Download, FileText, Star, Layout,Map } from "lucide-react";

const ResourcesPage = () => {
  const resources = [
    { id: "book1", title: "Python for Data Science", description: "Comprehensive guide to Python for data analysis", link: "Python4DataAnalysis.pdf", downloads: 1200, stars: 450, category: "Programming", language: "Python" },
    { id: "book2", title: "Java: The Complete Reference", description: "In-depth exploration of Java programming", link: "Mark_Allen_Weiss_Data_Structures_and_Algorithm_Analysis_in_Java,_3rd_Edition__2011.pdf", downloads: 980, stars: 320, category: "Programming", language: "Java" },
    { id: "book3", title: "Computer Networks", description: "Comprehensive guide to computer networking principles", link: "Computer.Networking A Top-Down Approach 6th Edition.pdf", downloads: 1500, stars: 780, category: "Computer Networks" },
    { id: "note1", title: "JavaScript ES6 Cheatsheet", description: "Quick reference for modern JavaScript features", link: "Javascript Handwritten Notes.pdf", downloads: 750, stars: 230, category: "Programming", language: "JavaScript" },
    { id: "note2", title: "Data Structures in C++", description: "Notes on implementing common data structures in C++", link: "DSA Handwritten Notes-2.pdf", downloads: 620, stars: 180, category: "Programming", language: "C++" },
    { id: "note3", title: "Network Protocols Overview", description: "Summary of key networking protocols", link: "Computer_Networking_Notes.pdf", downloads: 890, stars: 340, category: "Computer Networks" },
  ];

  const templates = [
    { id: "template1", title: "Professional Resume Template", description: "A clean and professional resume template", link: "jvs-resume-template.pdf", downloads: 1100, stars: 500 },
    { id: "template2", title: "Modern Resume Template", description: "A sleek and modern resume template", link: "nitin-bawanes-resume.pdf", downloads: 870, stars: 350 }
  ];
  const roadmaps = [
    { id: "roadmap1", title: "Full Stack Developer Roadmap", description: "Step-by-step guide to becoming a Full Stack Developer", link: "full-stack.pdf", downloads: 1500, stars: 600 },
    { id: "roadmap2", title: "Data Science Roadmap", description: "A complete guide to Data Science career path", link: "ai-data-scientist.pdf", downloads: 1300, stars: 550 }
  ];
  

  const categories = ["All", "Programming", "Computer Networks"];
  const languages = ["All", "Python", "Java", "JavaScript", "C++"];

  const [activeTab, setActiveTab] = useState("books");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [languageFilter, setLanguageFilter] = useState("All");
  const [templateTab, setTemplateTab] = useState("resumes");

  const filteredResources = resources.filter(
    (resource) =>
      (activeTab === "books" ? resource.id.startsWith("book") : resource.id.startsWith("note")) &&
      (categoryFilter === "All" || resource.category === categoryFilter) &&
      (languageFilter === "All" || resource.language === languageFilter)
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="font-bold gradient-title text-5xl md:text-6xl">Engineering Resources</h1>
      <br /> <br />
      <Tabs defaultValue="books" className="w-full" onValueChange={(value) => setActiveTab(value)}>
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="books" className="text-lg"><Book className="mr-2 h-5 w-5" /> Books</TabsTrigger>
          <TabsTrigger value="notes" className="text-lg"><FileText className="mr-2 h-5 w-5" /> Notes</TabsTrigger>
          <TabsTrigger value="templates" className="text-lg"><Layout className="mr-2 h-5 w-5" /> Templates</TabsTrigger>
        </TabsList>
        {activeTab !== "templates" && (
          <div className="flex gap-4 mb-6">
            <Select onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Select Category" /></SelectTrigger>
              <SelectContent>{categories.map((category) => <SelectItem key={category} value={category}>{category}</SelectItem>)}</SelectContent>
            </Select>
            <Select onValueChange={setLanguageFilter}>
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Select Language" /></SelectTrigger>
              <SelectContent>{languages.map((language) => <SelectItem key={language} value={language}>{language}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        )}
        <TabsContent value="books"><ResourceGrid resources={filteredResources} /></TabsContent>
        <TabsContent value="notes"><ResourceGrid resources={filteredResources} /></TabsContent>
        <TabsContent value="templates">
          <Tabs defaultValue="resumes" className="w-full" onValueChange={(value) => setTemplateTab(value)}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="resumes" className="text-lg"><FileText className="mr-2 h-5 w-5" /> Resume Templates</TabsTrigger>
              <TabsTrigger value="roadmaps" className="text-lg"><Map className="mr-2 h-5 w-5" /> Roadmaps</TabsTrigger>
            </TabsList>
            <TabsContent value="resumes"><ResourceGrid resources={templates} /></TabsContent>
            <TabsContent value="roadmaps"><ResourceGrid resources={roadmaps} /></TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const ResourceGrid = ({ resources }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {resources.map((resource) => <ResourceCard key={resource.id} resource={resource} />)}
    </div>
  );
};

const ResourceCard = ({ resource }) => {
  const [stars, setStars] = useState(resource.stars);
  const [downloads, setDownloads] = useState(resource.downloads);

  const handleDownload = () => {
    setDownloads(downloads + 1);
    const link = document.createElement("a");
    link.href = resource.link;
    link.download = resource.title + ".pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="overflow-hidden transition-all hover:border-primary transition-colors duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">{resource.title}</CardTitle>
        <CardDescription>{resource.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <a href={resource.link} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">View Resource</a>
      </CardContent>
      <CardFooter className="flex justify-between bg-muted/50 p-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => setStars(stars + 1)}><Star className="mr-2 h-4 w-4" />{stars}</Button>
          <Button variant="outline" size="sm" onClick={() => setDownloads(downloads + 1)}><Download className="mr-2 h-4 w-4" />{downloads}</Button>
        </div>
        <Button variant="default" size="sm" onClick={handleDownload}>Download</Button>
      </CardFooter>
    </Card>
  );
};

export default ResourcesPage;
