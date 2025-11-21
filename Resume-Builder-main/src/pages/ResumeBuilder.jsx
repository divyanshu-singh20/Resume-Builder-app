import React, { useEffect, useMemo, useRef, useState } from "react";
import { Plus, Trash2, Download, Upload, Printer, Palette } from "lucide-react";

// ---- Helper components ----
const SectionTitle = ({ children }) => (
  <h3 className="text-xl font-semibold tracking-wide mb-3 text-slate-800 print:text-black">
    {children}
  </h3>
);

const Input = ({ label, ...props }) => (
  <label className="block mb-3">
    <span className="text-sm font-medium text-slate-600 mb-1 block">{label}</span>
    <input
      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 shadow-sm"
      {...props}
    />
  </label>
);

const Textarea = ({ label, ...props }) => (
  <label className="block mb-3">
    <span className="text-sm font-medium text-slate-600 mb-1 block">{label}</span>
    <textarea
      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 shadow-sm"
      {...props}
    />
  </label>
);

const IconButton = ({ children, className = "", ...props }) => (
  <button
    className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium shadow-sm transition hover:shadow ${className}`}
    {...props}
  >
    {children}
  </button>
);

// ---- Main Component ----
export default function ResumeBuilder() {
  const [theme, setTheme] = useState("indigo");
  const [data, setData] = useState(() =>
    JSON.parse(localStorage.getItem("resume-data") || "null") || {
      basics: {
        name: "Amit Kumar",
        title: "FullStack Developer",
        email: "amit@example.com",
        phone: "+91 9523599608",
        location: "Buxar, Bihar",
        website: "https://your-portfolio.com",
        summary:
          "Avid tech explorer with a keen interest in modern web development and building delightful user experiences.",
      },
      skills: ["JavaScript", "React", "Node.js", "MongoDB", "Tailwind CSS"],
      experience: [
        {
          company: "Your Company",
          role: "Full Stack Developer",
          start: "2023-01",
          end: "Present",
          location: "Remote",
          bullets: [
            "Built responsive UI components with React and Tailwind.",
            "Improved performance with code-splitting and memoization.",
          ],
        },
      ],
      education: [
        {
          school: "Budge Budge Institute of Technology",
          degree: "B.Tech in Computer Science Engineerig",
          start: "2022",
          end: "2026",
          location: "Kolkata, West Bengal",
        },
      ],
      projects: [
        {
          name: "Ayurveda AI",
          link: "https://github.com/username/ayurveda-AI",
          bullets: [
            "Developed an AI-Chatbot specialized in Ayurvedic Knowledge",
          ],
        },
      ],
    }
  );

  const printRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("resume-data", JSON.stringify(data));
  }, [data]);

  const themeClasses = useMemo(() => {
    const map = {
      indigo: {
        bar: "bg-indigo-600",
        chip: "bg-indigo-50 text-indigo-700 border-indigo-200",
        heading: "text-indigo-700",
      },
      emerald: {
        bar: "bg-emerald-600",
        chip: "bg-emerald-50 text-emerald-700 border-emerald-200",
        heading: "text-emerald-700",
      },
      rose: {
        bar: "bg-rose-600",
        chip: "bg-rose-50 text-rose-700 border-rose-200",
        heading: "text-rose-700",
      },
      sky: {
        bar: "bg-sky-600",
        chip: "bg-sky-50 text-sky-700 border-sky-200",
        heading: "text-sky-700",
      },
      amber: {
        bar: "bg-amber-500",
        chip: "bg-amber-50 text-amber-700 border-amber-200",
        heading: "text-amber-700",
      },
    };
    return map[theme] ?? map.indigo;
  }, [theme]);

  const handleChange = (path, value) => {
    setData((prev) => {
      const next = { ...prev };
      const parts = path.split(".");
      let ref = next;
      for (let i = 0; i < parts.length - 1; i++) ref = ref[parts[i]];
      ref[parts[parts.length - 1]] = value;
      return next;
    });
  };

  const addItem = (key, item) => setData((d) => ({ ...d, [key]: [...d[key], item] }));
  const removeItem = (key, idx) =>
    setData((d) => ({ ...d, [key]: d[key].filter((_, i) => i !== idx) }));

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume-data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const uploadJSON = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        setData(json);
      } catch (err) {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className={`h-8 w-8 rounded-xl ${themeClasses.bar}`}></div>
            <h1 className="text-lg sm:text-xl font-bold">Resume Builder</h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-2 py-1">
              <Palette size={16} />
              <select
                className="bg-transparent text-sm outline-none"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                <option value="indigo">Indigo</option>
                <option value="emerald">Emerald</option>
                <option value="rose">Rose</option>
                <option value="sky">Sky</option>
                <option value="amber">Amber</option>
              </select>
            </div>

            <IconButton className="bg-white border border-slate-200" onClick={downloadJSON}>
              <Download size={16} /> Export JSON
            </IconButton>

            <label className="cursor-pointer">
              <input
                type="file"
                accept="application/json"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && uploadJSON(e.target.files[0])}
              />
              <span className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium shadow-sm bg-white border border-slate-200">
                <Upload size={16} /> Import
              </span>
            </label>

            <IconButton className={`${themeClasses.bar} text-white`} onClick={handlePrint}>
              <Printer size={16} /> Download PDF
            </IconButton>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
        {/* Editor */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6">
            <SectionTitle>Basic Info</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Full Name" value={data.basics.name} onChange={(e) => handleChange("basics.name", e.target.value)} />
              <Input label="Title" value={data.basics.title} onChange={(e) => handleChange("basics.title", e.target.value)} />
              <Input label="Email" value={data.basics.email} onChange={(e) => handleChange("basics.email", e.target.value)} />
              <Input label="Phone" value={data.basics.phone} onChange={(e) => handleChange("basics.phone", e.target.value)} />
              <Input label="Location" value={data.basics.location} onChange={(e) => handleChange("basics.location", e.target.value)} />
              <Input label="Website" value={data.basics.website} onChange={(e) => handleChange("basics.website", e.target.value)} />
            </div>
            <Textarea
              label="Summary"
              rows={4}
              value={data.basics.summary}
              onChange={(e) => handleChange("basics.summary", e.target.value)}
            />
          </div>

          {/* Skills */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3">
              <SectionTitle>Skills</SectionTitle>
              <IconButton
                className={`${themeClasses.bar} text-white`}
                onClick={() => addItem("skills", "New Skill")}
              >
                <Plus size={16} /> Add Skill
              </IconButton>
            </div>

            <div className="flex flex-wrap gap-2">
              {data.skills.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    className="rounded-full border border-slate-300 px-3 py-1 text-sm shadow-sm"
                    value={s}
                    onChange={(e) => {
                      const v = e.target.value;
                      setData((d) => ({
                        ...d,
                        skills: d.skills.map((x, idx) => (idx === i ? v : x)),
                      }));
                    }}
                  />
                  <button
                    className="p-1 rounded-full hover:bg-rose-50 text-rose-600"
                    onClick={() => removeItem("skills", i)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3">
              <SectionTitle>Experience</SectionTitle>
              <IconButton
                className={`${themeClasses.bar} text-white`}
                onClick={() =>
                  addItem("experience", {
                    company: "Company",
                    role: "Role",
                    start: "2024-01",
                    end: "Present",
                    location: "City",
                    bullets: ["Describe your impact"],
                  })
                }
              >
                <Plus size={16} /> Add
              </IconButton>
            </div>

            {data.experience.map((exp, i) => (
              <div key={i} className="rounded-xl border border-slate-200 p-4 mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Company" value={exp.company} onChange={(e) => {
                    const v = e.target.value;
                    setData((d) => ({
                      ...d,
                      experience: d.experience.map((x, idx) =>
                        idx === i ? { ...x, company: v } : x
                      ),
                    }));
                  }} />
                  <Input label="Role" value={exp.role} onChange={(e) => {
                    const v = e.target.value;
                    setData((d) => ({
                      ...d,
                      experience: d.experience.map((x, idx) =>
                        idx === i ? { ...x, role: v } : x
                      ),
                    }));
                  }} />
                  <Input label="Start (YYYY-MM)" value={exp.start} onChange={(e) => {
                    const v = e.target.value;
                    setData((d) => ({
                      ...d,
                      experience: d.experience.map((x, idx) =>
                        idx === i ? { ...x, start: v } : x
                      ),
                    }));
                  }} />
                  <Input label="End (YYYY-MM / Present)" value={exp.end} onChange={(e) => {
                    const v = e.target.value;
                    setData((d) => ({
                      ...d,
                      experience: d.experience.map((x, idx) =>
                        idx === i ? { ...x, end: v } : x
                      ),
                    }));
                  }} />
                  <Input label="Location" value={exp.location} onChange={(e) => {
                    const v = e.target.value;
                    setData((d) => ({
                      ...d,
                      experience: d.experience.map((x, idx) =>
                        idx === i ? { ...x, location: v } : x
                      ),
                    }));
                  }} />
                </div>

                <div className="mt-3">
                  <span className="text-sm text-slate-600">Bullets</span>
                  {exp.bullets.map((b, j) => (
                    <div key={j} className="flex items-center gap-2 mt-2">
                      <input
                        className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
                        value={b}
                        onChange={(e) => {
                          const v = e.target.value;
                          setData((d) => ({
                            ...d,
                            experience: d.experience.map((x, idx) =>
                              idx === i
                                ? { ...x, bullets: x.bullets.map((y, k) => (k === j ? v : y)) }
                                : x
                            ),
                          }));
                        }}
                      />
                      <button
                        className="p-1 rounded-full hover:bg-rose-50 text-rose-600"
                        onClick={() => {
                          setData((d) => ({
                            ...d,
                            experience: d.experience.map((x, idx) =>
                              idx === i
                                ? { ...x, bullets: x.bullets.filter((_, k) => k !== j) }
                                : x
                            ),
                          }));
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <IconButton
                    className="mt-2 bg-white border border-slate-200"
                    onClick={() => {
                      setData((d) => ({
                        ...d,
                        experience: d.experience.map((x, idx) =>
                          idx === i ? { ...x, bullets: [...x.bullets, "New bullet"] } : x
                        ),
                      }));
                    }}
                  >
                    <Plus size={16} /> Add bullet
                  </IconButton>
                </div>

                <div className="mt-3 flex justify-end">
                  <IconButton
                    className="bg-white border border-slate-200 text-rose-600"
                    onClick={() => removeItem("experience", i)}
                  >
                    <Trash2 size={16} /> Remove entry
                  </IconButton>
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3">
              <SectionTitle>Education</SectionTitle>
              <IconButton
                className={`${themeClasses.bar} text-white`}
                onClick={() =>
                  addItem("education", {
                    school: "Institute",
                    degree: "Degree",
                    start: "2020",
                    end: "2024",
                    location: "City",
                  })
                }
              >
                <Plus size={16} /> Add
              </IconButton>
            </div>

            {data.education.map((ed, i) => (
              <div key={i} className="rounded-xl border border-slate-200 p-4 mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="School" value={ed.school} onChange={(e) => {
                  const v = e.target.value;
                  setData((d) => ({
                    ...d,
                    education: d.education.map((x, idx) => (idx === i ? { ...x, school: v } : x)),
                  }));
                }} />
                <Input label="Degree" value={ed.degree} onChange={(e) => {
                  const v = e.target.value;
                  setData((d) => ({
                    ...d,
                    education: d.education.map((x, idx) => (idx === i ? { ...x, degree: v } : x)),
                  }));
                }} />
                <Input label="Start" value={ed.start} onChange={(e) => {
                  const v = e.target.value;
                  setData((d) => ({
                    ...d,
                    education: d.education.map((x, idx) => (idx === i ? { ...x, start: v } : x)),
                  }));
                }} />
                <Input label="End" value={ed.end} onChange={(e) => {
                  const v = e.target.value;
                  setData((d) => ({
                    ...d,
                    education: d.education.map((x, idx) => (idx === i ? { ...x, end: v } : x)),
                  }));
                }} />
                <Input label="Location" value={ed.location} onChange={(e) => {
                  const v = e.target.value;
                  setData((d) => ({
                    ...d,
                    education: d.education.map((x, idx) => (idx === i ? { ...x, location: v } : x)),
                  }));
                }} />
                <div className="flex justify-end sm:col-span-2">
                  <IconButton className="bg-white border border-slate-200 text-rose-600" onClick={() => removeItem("education", i)}>
                    <Trash2 size={16} /> Remove entry
                  </IconButton>
                </div>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3">
              <SectionTitle>Projects</SectionTitle>
              <IconButton
                className={`${themeClasses.bar} text-white`}
                onClick={() =>
                  addItem("projects", {
                    name: "Project Name",
                    link: "https://github.com/username/project",
                    bullets: ["What did you build and why it matters"],
                  })
                }
              >
                <Plus size={16} /> Add
              </IconButton>
            </div>

            {data.projects.map((pr, i) => (
              <div key={i} className="rounded-xl border border-slate-200 p-4 mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Project Name" value={pr.name} onChange={(e) => {
                    const v = e.target.value;
                    setData((d) => ({
                      ...d,
                      projects: d.projects.map((x, idx) => (idx === i ? { ...x, name: v } : x)),
                    }));
                  }} />
                  <Input label="Link" value={pr.link} onChange={(e) => {
                    const v = e.target.value;
                    setData((d) => ({
                      ...d,
                      projects: d.projects.map((x, idx) => (idx === i ? { ...x, link: v } : x)),
                    }));
                  }} />
                </div>

                <div className="mt-3">
                  <span className="text-sm text-slate-600">Bullets</span>
                  {pr.bullets.map((b, j) => (
                    <div key={j} className="flex items-center gap-2 mt-2">
                      <input
                        className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
                        value={b}
                        onChange={(e) => {
                          const v = e.target.value;
                          setData((d) => ({
                            ...d,
                            projects: d.projects.map((x, idx) =>
                              idx === i
                                ? { ...x, bullets: x.bullets.map((y, k) => (k === j ? v : y)) }
                                : x
                            ),
                          }));
                        }}
                      />
                      <button
                        className="p-1 rounded-full hover:bg-rose-50 text-rose-600"
                        onClick={() => {
                          setData((d) => ({
                            ...d,
                            projects: d.projects.map((x, idx) =>
                              idx === i
                                ? { ...x, bullets: x.bullets.filter((_, k) => k !== j) }
                                : x
                            ),
                          }));
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <IconButton
                    className="mt-2 bg-white border border-slate-200"
                    onClick={() => {
                      setData((d) => ({
                        ...d,
                        projects: d.projects.map((x, idx) =>
                          idx === i ? { ...x, bullets: [...x.bullets, "New bullet"] } : x
                        ),
                      }));
                    }}
                  >
                    <Plus size={16} /> Add bullet
                  </IconButton>
                </div>

                <div className="mt-3 flex justify-end">
                  <IconButton className="bg-white border border-slate-200 text-rose-600" onClick={() => removeItem("projects", i)}>
                    <Trash2 size={16} /> Remove entry
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div>
          <div
            ref={printRef}
            id="resume-preview"
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 lg:sticky lg:top-24 print:shadow-none print:border-0 print:rounded-none"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 print:text-black">{data.basics.name}</h1>
                <p className="text-slate-600 mt-1">{data.basics.title}</p>
              </div>
              <div className={`px-3 py-1.5 rounded-lg text-white text-sm ${themeClasses.bar}`}>{data.basics.location}</div>
            </div>

            {/* Contacts */}
            <div className="mt-3 text-sm text-slate-700 flex flex-wrap gap-x-6 gap-y-1">
              <span>{data.basics.email}</span>
              <span>{data.basics.phone}</span>
              <a href={data.basics.website} className="text-indigo-600 hover:underline" target="_blank" rel="noreferrer">
                {data.basics.website}
              </a>
            </div>

            {/* Summary */}
            {data.basics.summary?.trim() && (
              <div className="mt-6">
                <SectionTitle>Summary</SectionTitle>
                <p className="text-slate-700 leading-relaxed">
                  {data.basics.summary}
                </p>
              </div>
            )}

            {/* Skills */}
            {!!data.skills.length && (
              <div className="mt-6">
                <SectionTitle>Skills</SectionTitle>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((s, i) => (
                    <span
                      key={i}
                      className={`inline-block rounded-full border px-3 py-1 text-sm ${themeClasses.chip}`}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Experience */}
            {!!data.experience.length && (
              <div className="mt-6">
                <SectionTitle>Experience</SectionTitle>
                <div className="space-y-4">
                  {data.experience.map((exp, i) => (
                    <div key={i}>
                      <div className="flex items-baseline justify-between flex-wrap gap-2">
                        <div>
                          <h4 className="font-semibold text-slate-900">
                            {exp.role} <span className="text-slate-500">• {exp.company}</span>
                          </h4>
                          <p className="text-sm text-slate-600">{exp.location}</p>
                        </div>
                        <div className={`text-sm font-medium ${themeClasses.heading}`}>
                          {exp.start} — {exp.end}
                        </div>
                      </div>
                      {exp.bullets?.length > 0 && (
                        <ul className="mt-2 list-disc pl-5 text-slate-700 space-y-1">
                          {exp.bullets.map((b, j) => (
                            <li key={j}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {!!data.education.length && (
              <div className="mt-6">
                <SectionTitle>Education</SectionTitle>
                <div className="space-y-3">
                  {data.education.map((ed, i) => (
                    <div key={i} className="flex items-baseline justify-between flex-wrap gap-2">
                      <div>
                        <h4 className="font-semibold text-slate-900">
                          {ed.degree} <span className="text-slate-500">• {ed.school}</span>
                        </h4>
                        <p className="text-sm text-slate-600">{ed.location}</p>
                      </div>
                      <div className={`text-sm font-medium ${themeClasses.heading}`}>
                        {ed.start} — {ed.end}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {!!data.projects.length && (
              <div className="mt-6">
                <SectionTitle>Projects</SectionTitle>
                <div className="space-y-3">
                  {data.projects.map((pr, i) => (
                    <div key={i}>
                      <div className="flex items-baseline justify-between flex-wrap gap-2">
                        <h4 className="font-semibold text-slate-900">{pr.name}</h4>
                        {pr.link && (
                          <a className="text-sm text-indigo-600 hover:underline" href={pr.link} target="_blank" rel="noreferrer">
                            {pr.link}
                          </a>
                        )}
                      </div>
                      {pr.bullets?.length > 0 && (
                        <ul className="mt-2 list-disc pl-5 text-slate-700 space-y-1">
                          {pr.bullets.map((b, j) => (
                            <li key={j}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body { background: white !important; }
          #resume-preview { box-shadow: none !important; }
          /* Hide everything except preview */
          .sticky, .sticky *:not(#resume-preview) { display: none !important; }
          .max-w-7xl > :not(:last-child) { display: none !important; }
          #resume-preview { display: block !important; }
        }
      `}</style>
    </div>
  );
}
