"use client";
import { BACKEND_AI_ROUTES } from "@/utils/routes/backend_routes";
import { HttpStatusCode } from "axios";
import jsPDF from "jspdf";
import { set } from "mongoose";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function UniqueScoreButton({ title, description }) {
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);

  const [report, setReport] = useState(null);

  useEffect(() => {
    if (title.length === 0 || description.length === 0) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [title, description]);

  const formatTextForPDF = (data) => {
    const { top_results, analysis } = data;

    const formattedTopResults = top_results
      .split('\n')
      .map(line => line.trim())
      .map(line => (line.startsWith('PROJECT') ? '\n' : '') + line)
      .join('\n');

    const formattedAnalysis = analysis
      .split('\n')
      .map(line => line.trim())
      .join('\n');

    return { formattedTopResults, formattedAnalysis };
  };

  const downloadReport = () => {
    const doc = new jsPDF();

    const { formattedTopResults, formattedAnalysis } = formatTextForPDF(report);
    const maxWidth = 180;
    const lineHeight = 6;
    const leftMargin = 20;
    const topMargin = 20;
    const bottomMargin = 20;
    const fontSize = 15; 

    const linesPerPage = Math.floor((doc.internal.pageSize.getHeight() - topMargin - bottomMargin) / lineHeight);

    const addTextToPDF = (text) => {
      const lines = doc.splitTextToSize(text, maxWidth);
      let y = topMargin;
      let remainingLines = lines.length;
      while (remainingLines > 0) {
        const linesToAdd = Math.min(linesPerPage, remainingLines);
        const linesToAddThisPage = lines.slice(lines.length - remainingLines, lines.length - remainingLines + linesToAdd);
        linesToAddThisPage.forEach(line => {
          doc.setFontSize(fontSize);
          doc.text(line, leftMargin, y);
          y += lineHeight;
        });
        remainingLines -= linesToAdd;
        if (remainingLines > 0) {
          doc.addPage();
          y = topMargin;
        }
      }
    };

    addTextToPDF(formattedTopResults);

    doc.addPage();
    addTextToPDF('Analysis:\n\n' + formattedAnalysis);

    doc.save('Report.pdf');
  };

  const getScore = async () => {
    try {
      setLoading(true);
      const response = await fetch(BACKEND_AI_ROUTES.uniqueIdeaDetection, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project_title: title,
          project_abstract_description: description,
        }),
      });
      if(response.status === HttpStatusCode.Ok){
        const data = await response.json();
        setReport(data);
        console.log(data);
      } else (
        toast.error("Failed to generate report")
      )
      setLoading(false);
    } catch (error) {
        toast.error("Failed to generate report")
        setLoading(false);
    }
  };

  return (
    <div className="flex flex-col item-center justify-center">
      <button
        type="button"
        onClick={getScore}
        disabled={disable || loading}
        className="text-sm bg-black border-2 font-normal border-black text-white p-1.5 rounded-lg hover:bg-gray-100 hover:text-black disabled:cursor-not-allowed disabled:bg-gray-300 disabled:border-gray-300 disabled:text-black"
      >
        {loading ? "Generating Report ... " : "Calculate Unique Idea Report"}
      </button>
      {report && !loading && <button type="button" onClick={downloadReport} className="text-sm hover:text-blue-500">Report.pdf</button>}
    </div>
  );
}

export default UniqueScoreButton;
