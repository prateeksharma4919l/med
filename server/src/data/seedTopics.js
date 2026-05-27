const subjects = [
  {
    subjectId: "pathology",
    subjectName: "Pathology",
    topics: [
      "Cell Injury",
      "Necrosis",
      "Apoptosis",
      "Acute Inflammation",
      "Chronic Inflammation",
      "Healing and Repair",
      "Edema",
      "Thrombosis",
      "Embolism",
      "Shock",
      "Neoplasia",
      "Anemia",
      "Leukemia",
      "Tuberculosis",
      "Cirrhosis",
      "Pneumonia",
      "Myocardial Infarction",
      "Nephrotic Syndrome",
      "Amyloidosis",
      "Gangrene",
      "Metaplasia",
      "Dysplasia",
      "Septicemia"
    ]
  },
  {
    subjectId: "pharmacology",
    subjectName: "Pharmacology",
    topics: [
      "General Pharmacology",
      "Pharmacokinetics",
      "Pharmacodynamics",
      "Autonomic Drugs",
      "Cholinergic Drugs",
      "Anticholinergic Drugs",
      "Adrenergic Drugs",
      "Antihypertensives",
      "Diuretics",
      "Antianginal Drugs",
      "Anticoagulants",
      "NSAIDs",
      "Opioids",
      "Antibiotics",
      "Antitubercular Drugs",
      "Antimalarials",
      "Antivirals",
      "Antifungals",
      "Anticancer Drugs",
      "Insulin and Oral Antidiabetics",
      "Corticosteroids"
    ]
  },
  {
    subjectId: "microbiology",
    subjectName: "Microbiology",
    topics: [
      "Bacterial Cell Structure",
      "Staining Techniques",
      "Culture Media",
      "Sterilization and Disinfection",
      "Immunology Basics",
      "Antigen Antibody Reactions",
      "Hypersensitivity",
      "Staphylococcus",
      "Streptococcus",
      "Mycobacterium Tuberculosis",
      "Clostridium",
      "Vibrio Cholerae",
      "Salmonella",
      "Viral Hepatitis",
      "HIV",
      "Dengue",
      "Influenza",
      "Herpes Viruses",
      "Candida",
      "Aspergillus",
      "Malaria",
      "Amoebiasis"
    ]
  }
];

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function makeTopic(subject, title, index) {
  return {
    subjectId: subject.subjectId,
    subjectName: subject.subjectName,
    slug: `${subject.subjectId}-${slugify(title)}`,
    title,
    difficulty: index < 8 ? "Beginner" : index < 16 ? "Intermediate" : "Exam Core",
    duration: 20 + (index % 4) * 5,
    definition: `${title} is a high-yield ${subject.subjectName} topic for MBBS 2nd year students.`,
    causes: ["Core concept trigger", "Clinical relevance", "Exam classification", "Important complications"],
    pathogenesis: ["Start with the initiating factor", "Explain mechanism step by step", "Connect to clinical features", "Finish with diagnosis or management relevance"],
    morphology: subject.subjectName === "Pharmacology" ? "Use classification and comparison tables." : "Include gross, microscopy, stain, organism or tissue-specific changes where relevant.",
    clinicalFeatures: ["Common presentation", "Important red flag", "Complication", "Exam correlation"],
    diagnosis: ["History and examination", "Relevant lab test", "Confirmatory test", "Special stain or imaging when needed"],
    examPoints: ["Begin with definition", "Add a labelled flowchart", "Mention high-yield keywords", "End with viva-worthy facts"],
    viva: [`Define ${title}.`, `Give two important exam points of ${title}.`, `Mention one clinical correlation.`],
    mnemonics: [`${title.split(" ")[0].toUpperCase()} = Definition, Mechanism, Exam points, Viva`],
    mcqs: [
      {
        question: `Which is the best first step while revising ${title}?`,
        options: ["Definition and classification", "Skipping basics", "Only guessing MCQs", "Ignoring viva"],
        answer: "Definition and classification",
        explanation: "Definitions and classifications anchor the rest of the answer."
      }
    ],
    flowchart: ["Definition", "Causes/Class", "Mechanism", "Features", "Diagnosis", "Exam point"],
    diagram: `${title} labelled diagram or flowchart placeholder`,
    pyqs: [`Write a short note on ${title}.`, `Describe important exam points of ${title}.`],
    summary: `${title} should be revised with definition, mechanism, key facts, viva questions, MCQs and PYQs.`
  };
}

export const seedTopics = subjects.flatMap((subject) => subject.topics.map((title, index) => makeTopic(subject, title, index)));
