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
  easyExplanation: `Think of ${topic} as a story of how normal structure or function gets disturbed, how the body reacts, and what changes a doctor can see clinically or under the microscope.`,
  beginnerExplanation: `Start with one line definition, then ask: what causes it, what happens step by step, what does it look like, and why does it matter in exams or patients.`,
  detailedExplanation: `${topic} should be understood in a sequence: etiological trigger, cellular or vascular response, tissue-level change, clinical presentation, diagnostic clue, and final complication or outcome.`,
  analogy: `Analogy: imagine the body as a city. ${topic} is the report of what damaged the city, how emergency services responded, and what permanent marks were left behind.`,
  clinicalExample: `Clinical link: in an exam answer, add one patient-style clue such as fever, swelling, organ dysfunction, bleeding, mass lesion, anemia, or abnormal lab value depending on the topic.`,
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
  keywords: ["Etiology", "Pathogenesis", "Morphology", "Clinical correlation", "Complication"],
  quickRevision: [`Definition of ${topic}`, "Most common causes", "Stepwise pathogenesis", "Gross and microscopic morphology", "One clinical correlation", "Two viva points"],
  highYieldTable: [
    { label: "Definition", value: "One clean line at the start of answer" },
    { label: "Mechanism", value: "Use arrows and mediators/events" },
    { label: "Morphology", value: "Separate gross and microscopy whenever possible" },
    { label: "Exam trick", value: "End with complication or clinical relevance" }
  ],
  viva: [`Define ${topic}.`, `What are the common causes of ${topic}?`, `Mention one important complication.`],
  mnemonics: [`${topic.split(" ")[0].toUpperCase()} = Cause, Mechanism, Morphology, Clinical point, Diagnosis`],
  mcqs: [
    {
      question: `Most useful first step while writing an answer on ${topic}?`,
      options: ["Definition", "Treatment brand names", "Only diagram", "Only investigation"],
      answer: "Definition",
      explanation: "A pathology answer becomes organized only after the definition anchors the topic."
    }
  ],
  summary: `${topic} should be revised with definition, pathogenesis, morphology, clinical features, diagnosis, and exam points.`
});

const pharmaTemplate = (topic) => ({
  definition: `${topic} covers drug classes, mechanism of action, uses, adverse effects, contraindications, and clinical precautions.`,
  easyExplanation: `${topic} becomes easy when every drug is revised as class, mechanism, use, side effect, contraindication, and special warning.`,
  beginnerExplanation: `Do not memorize isolated drug names first. Build a table: class -> prototype -> mechanism -> uses -> adverse effects.`,
  detailedExplanation: `For ${topic}, connect pharmacokinetics/pharmacodynamics with clinical use. Ask where the drug acts, what it changes, when it is useful, and when it becomes harmful.`,
  analogy: `Analogy: a drug is like a key. The receptor/enzyme/channel is the lock. The clinical effect depends on which lock is opened or blocked.`,
  clinicalExample: `Clinical link: mention a common use and one dangerous adverse effect. This makes pharmacology answers exam-ready.`,
  causes: ["Therapeutic indication", "Patient age and comorbidities", "Drug interactions", "Renal and hepatic function"],
  pathogenesis: ["Drug reaches target", "Receptor/enzyme/channel action occurs", "Therapeutic and adverse effects appear"],
  morphology: "Not morphology-heavy; focus on mechanism diagrams, classification tables, and adverse effect charts.",
  clinicalFeatures: ["Indications", "Contraindications", "Dose-related toxicity", "Important monitoring points"],
  diagnosis: ["Clinical indication", "Baseline labs", "Therapeutic drug monitoring where needed"],
  examPoints: ["Classification table is scoring", "Mechanism must be crisp", "Write common and dangerous adverse effects", "Add one clinical use"],
  keywords: ["Classification", "Prototype", "Mechanism", "Uses", "Adverse effects", "Contraindication"],
  quickRevision: [`Classify ${topic}`, "Prototype drugs", "Mechanism in one line", "Two common uses", "Two adverse effects", "One contraindication"],
  highYieldTable: [
    { label: "Class", value: "Write before individual drugs" },
    { label: "MOA", value: "Use receptor/enzyme/channel language" },
    { label: "Uses", value: "Mention exam-favorite indications" },
    { label: "Safety", value: "Add serious adverse effect and contraindication" }
  ],
  viva: [`Classify drugs used in ${topic}.`, `What is the mechanism of action?`, `Name two adverse effects.`],
  mnemonics: [`For ${topic}: C-M-U-S-C = Classification, Mechanism, Uses, Side effects, Contraindications`],
  mcqs: [
    {
      question: `In pharmacology, ${topic} is best revised using which format?`,
      options: ["Classification table", "Only essay", "Only anatomy diagram", "Only pathology slide"],
      answer: "Classification table",
      explanation: "Pharmacology answers score well when classification and prototypes are clear."
    }
  ],
  summary: `${topic} becomes easy when every drug is revised through class, mechanism, uses, side effects, and contraindications.`
});

const microTemplate = (topic) => ({
  definition: `${topic} is a core microbiology topic linking organism biology, pathogenesis, immunity, lab diagnosis, and prevention.`,
  easyExplanation: `${topic} should be learned as organism features, disease caused, sample collection, lab diagnosis, and prevention.`,
  beginnerExplanation: `Start with morphology and staining, then culture, pathogenesis, clinical disease, lab diagnosis, treatment clue, and prevention.`,
  detailedExplanation: `For ${topic}, connect organism structure with virulence, immune response, clinical presentation, diagnostic test, and public health prevention.`,
  analogy: `Analogy: microbiology is detective work. The organism leaves clues through stain, culture, antigen, antibody, PCR, and disease pattern.`,
  clinicalExample: `Clinical link: always mention the correct specimen, diagnostic test, and prevention/vaccine if applicable.`,
  causes: ["Bacterial agents", "Viral agents", "Fungal agents", "Parasitic agents", "Host immune status"],
  pathogenesis: ["Entry into host", "Adhesion and invasion", "Toxin or immune-mediated damage", "Clinical disease"],
  morphology: "Mention shape, arrangement, staining, culture characteristics, and special diagnostic features wherever applicable.",
  clinicalFeatures: ["Fever", "Localizing symptoms", "Systemic toxicity", "Disease-specific signs"],
  diagnosis: ["Microscopy and staining", "Culture", "Serology", "PCR or antigen test", "Antimicrobial sensitivity"],
  examPoints: ["Lab diagnosis flowchart is high-yield", "Mention specimen collection", "Add prevention or vaccine when applicable"],
  keywords: ["Morphology", "Stain", "Culture", "Pathogenesis", "Lab diagnosis", "Prevention"],
  quickRevision: [`Organism features of ${topic}`, "Important stain/culture", "Disease caused", "Lab diagnosis flowchart", "Prevention or vaccine", "Two viva points"],
  highYieldTable: [
    { label: "Specimen", value: "Write sample before test" },
    { label: "Microscopy", value: "Mention stain and appearance" },
    { label: "Culture/Serology", value: "Add confirmatory test" },
    { label: "Prevention", value: "Mention vaccine or control measure where relevant" }
  ],
  viva: [`Which stain is used for ${topic}?`, `How will you diagnose it in the lab?`, `Name one prevention method.`],
  mnemonics: [`For ${topic}: S-C-P-D-P = Stain, Culture, Pathogenesis, Diagnosis, Prevention`],
  mcqs: [
    {
      question: `Best exam-friendly way to answer ${topic}?`,
      options: ["Organism + disease + lab diagnosis", "Only treatment", "Only anatomy", "Only biochemistry"],
      answer: "Organism + disease + lab diagnosis",
      explanation: "Microbiology answers are strongest when organism features and diagnosis are connected."
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
