import React from 'react';
import { S3_DOCUMENTS } from '../constants/s3';
import DocumentCardSimple from './DocumentCardSimple';

const TestDocuments = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-light mb-8 text-center">Document Test Page</h1>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Resume Card - Primary Button Style */}
        <DocumentCardSimple
          title="Professional Resume"
          description="Comprehensive overview of my experience, skills, and achievements in software development and cloud engineering."
          documentUrl={S3_DOCUMENTS.resume}
          fileName="ElishaTheetla-Resume-2024.pdf"
          type="resume"
          buttonStyle="primary"
        />
        
        {/* AWS Certification Card - Outline Button Style */}
        <DocumentCardSimple
          title="AWS Cloud Practitioner"
          description="Official AWS certification demonstrating foundational cloud computing knowledge and best practices."
          documentUrl={S3_DOCUMENTS.awsCertification}
          fileName="AWS-Cloud-Practitioner-Certificate.pdf"
          type="certificate"
          buttonStyle="outline"
        />
      </div>
    </div>
  );
};

export default TestDocuments;
