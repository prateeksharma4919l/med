export const subjects = [
  {
    id: "pathology",
    name: "Pathology",
    tagline: "Disease mechanisms made visual and exam-ready.",
    color: "from-rose-400 to-orange-400",
    icon: "Activity",
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
      "Septicemia",
      "Hemodynamic Disorders",
      "Granulomatous Inflammation",
      "Diabetes Mellitus Pathology"
    ]
  },
  {
    id: "pharmacology",
    name: "Pharmacology",
    tagline: "Classifications, mechanisms, uses, adverse effects.",
    color: "from-sky-400 to-cyan-400",
    icon: "Pill",
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
      "Corticosteroids",
      "Antiepileptics",
      "Antipsychotics",
      "Anesthetics"
    ]
  },
  {
    id: "microbiology",
    name: "Microbiology",
    tagline: "Organisms, immunity, diagnosis, and clinical links.",
    color: "from-emerald-400 to-teal-400",
    icon: "Microscope",
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
      "Amoebiasis",
      "Leishmaniasis",
      "Lab Diagnosis of Infections"
    ]
  }
];

const pathologyTemplate = (topic) => ({
  definition: `${topic} is an important MBBS 2nd year pathology topic that explains structural and functional changes caused by disease.`,
  causes: ["Infection", "Ischemia or hypoxia", "Immune reactions", "Toxins and drugs", "Genetic or metabolic defects"],
  pathogenesis: [
    "Initial trigger injures cells or tissues.",
    "Inflammatory mediators and vascular responses amplify damage.",
    "Repair, fibrosis, necrosis, or clinical complications follow depending on severity."
  ],
  morphology: "Look for gross changes, microscopic cellular injury, inflammatory infiltrate, necrosis pattern, fibrosis, and organ-specific changes.",
  clinicalFeatures: ["Fever or malaise", "Pain or swelling", "Organ dysfunction", "Lab abnormalities related to involved tissue"],
  diagnosis: ["History and examination", "CBC and inflammatory markers", "Histopathology", "Relevant imaging and special stains"],
  examPoints: ["Write definition first", "Draw a small flowchart", "Mention morphology separately", "Add 2-3 clinical correlations"],
  viva: [`Define ${topic}.`, `What are the common causes of ${topic}?`, `Mention one important complication.`],
  mnemonics: [`${topic.split(" ")[0].toUpperCase()} = Cause, Mechanism, Morphology, Clinical point, Diagnosis`],
  mcqs: [
    {
      question: `Most useful first step while writing an answer on ${topic}?`,
      options: ["Definition", "Treatment brand names", "Only diagram", "Only investigation"],
      answer: "Definition"
    }
  ],
  summary: `${topic} should be revised with definition, pathogenesis, morphology, clinical features, diagnosis, and exam points.`
});

const pharmaTemplate = (topic) => ({
  definition: `${topic} covers drug classes, mechanism of action, uses, adverse effects, contraindications, and clinical precautions.`,
  causes: ["Therapeutic indication", "Patient age and comorbidities", "Drug interactions", "Renal and hepatic function"],
  pathogenesis: ["Drug reaches target", "Receptor/enzyme/channel action occurs", "Therapeutic and adverse effects appear"],
  morphology: "Not morphology-heavy; focus on mechanism diagrams, classification tables, and adverse effect charts.",
  clinicalFeatures: ["Indications", "Contraindications", "Dose-related toxicity", "Important monitoring points"],
  diagnosis: ["Clinical indication", "Baseline labs", "Therapeutic drug monitoring where needed"],
  examPoints: ["Classification table is scoring", "Mechanism must be crisp", "Write common and dangerous adverse effects", "Add one clinical use"],
  viva: [`Classify drugs used in ${topic}.`, `What is the mechanism of action?`, `Name two adverse effects.`],
  mnemonics: [`For ${topic}: C-M-U-S-C = Classification, Mechanism, Uses, Side effects, Contraindications`],
  mcqs: [
    {
      question: `In pharmacology, ${topic} is best revised using which format?`,
      options: ["Classification table", "Only essay", "Only anatomy diagram", "Only pathology slide"],
      answer: "Classification table"
    }
  ],
  summary: `${topic} becomes easy when every drug is revised through class, mechanism, uses, side effects, and contraindications.`
});

const microTemplate = (topic) => ({
  definition: `${topic} is a core microbiology topic linking organism biology, pathogenesis, immunity, lab diagnosis, and prevention.`,
  causes: ["Bacterial agents", "Viral agents", "Fungal agents", "Parasitic agents", "Host immune status"],
  pathogenesis: ["Entry into host", "Adhesion and invasion", "Toxin or immune-mediated damage", "Clinical disease"],
  morphology: "Mention shape, arrangement, staining, culture characteristics, and special diagnostic features wherever applicable.",
  clinicalFeatures: ["Fever", "Localizing symptoms", "Systemic toxicity", "Disease-specific signs"],
  diagnosis: ["Microscopy and staining", "Culture", "Serology", "PCR or antigen test", "Antimicrobial sensitivity"],
  examPoints: ["Lab diagnosis flowchart is high-yield", "Mention specimen collection", "Add prevention or vaccine when applicable"],
  viva: [`Which stain is used for ${topic}?`, `How will you diagnose it in the lab?`, `Name one prevention method.`],
  mnemonics: [`For ${topic}: S-C-P-D-P = Stain, Culture, Pathogenesis, Diagnosis, Prevention`],
  mcqs: [
    {
      question: `Best exam-friendly way to answer ${topic}?`,
      options: ["Organism + disease + lab diagnosis", "Only treatment", "Only anatomy", "Only biochemistry"],
      answer: "Organism + disease + lab diagnosis"
    }
  ],
  summary: `${topic} should be revised with organism features, disease, lab diagnosis, treatment basics, and prevention.`
});

export const topicBank = subjects.flatMap((subject) =>
  subject.topics.map((name, index) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const template =
      subject.id === "pathology"
        ? pathologyTemplate(name)
        : subject.id === "pharmacology"
          ? pharmaTemplate(name)
          : microTemplate(name);

    return {
      id: `${subject.id}-${slug}`,
      slug,
      subjectId: subject.id,
      subjectName: subject.name,
      title: name,
      difficulty: index < 8 ? "Beginner" : index < 18 ? "Intermediate" : "Exam Core",
      duration: 18 + (index % 4) * 7,
      diagram: `${name} concept map`,
      flowchart: ["Trigger", "Mechanism", "Key changes", "Clinical signs", "Diagnosis", "Exam answer"],
      pyqs: [
        `Write a short note on ${name}.`,
        `Describe pathogenesis and important exam points of ${name}.`
      ],
      ...template
    };
  })
);

export const getTopic = (idOrSlug) =>
  topicBank.find((topic) => topic.id === idOrSlug || topic.slug === idOrSlug);

export const getSubject = (id) => subjects.find((subject) => subject.id === id);
