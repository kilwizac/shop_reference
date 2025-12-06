"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Tabs } from "@/components/Tabs";
import { NumberInput } from "@/components/NumberInput";
import { 
  calculateBoltCircle, 
  calculateSineBar, 
  solveRightTriangle,
  type BoltCircleResult,
  type TriangleResult
} from "@/lib/calc";

export default function ShopMathClient() {
  const [activeTab, setActiveTab] = useState("bolt-circle");

  // Bolt Circle State
  const [pcd, setPcd] = useState("");
  const [numHoles, setNumHoles] = useState("");
  const [startAngle, setStartAngle] = useState("0");
  const [bcResults, setBcResults] = useState<BoltCircleResult[]>([]);

  // Sine Bar State
  const [sineAngle, setSineAngle] = useState("");
  const [barLength, setBarLength] = useState("5");
  const [sineHeight, setSineHeight] = useState<number | null>(null);

  // Trig State
  const [sideA, setSideA] = useState("");
  const [sideB, setSideB] = useState("");
  const [sideC, setSideC] = useState("");
  const [angleA, setAngleA] = useState("");
  const [angleB, setAngleB] = useState("");
  const [trigResult, setTrigResult] = useState<TriangleResult | null>(null);

  const updateBoltCircle = (p: string, n: string, a: string) => {
    setPcd(p);
    setNumHoles(n);
    setStartAngle(a);
    const d = parseFloat(p);
    const num = parseInt(n);
    const ang = parseFloat(a);
    if (d && num && !isNaN(ang)) {
      setBcResults(calculateBoltCircle(d, num, ang));
    } else {
      setBcResults([]);
    }
  };

  const updateSineBar = (ang: string, len: string) => {
    setSineAngle(ang);
    setBarLength(len);
    const a = parseFloat(ang);
    const l = parseFloat(len);
    if (!isNaN(a) && l) {
      const res = calculateSineBar(a, l);
      setSineHeight(res ? res.blockHeight : null);
    } else {
      setSineHeight(null);
    }
  };

  const updateTrig = (
    sA: string, sB: string, sC: string,
    aA: string, aB: string
  ) => {
    setSideA(sA); setSideB(sB); setSideC(sC);
    setAngleA(aA); setAngleB(aB);

    const inputs: { a?: number; b?: number; c?: number; A?: number; B?: number } = {};
    if (sA && !isNaN(parseFloat(sA))) inputs.a = parseFloat(sA);
    if (sB && !isNaN(parseFloat(sB))) inputs.b = parseFloat(sB);
    if (sC && !isNaN(parseFloat(sC))) inputs.c = parseFloat(sC);
    if (aA && !isNaN(parseFloat(aA))) inputs.A = parseFloat(aA);
    if (aB && !isNaN(parseFloat(aB))) inputs.B = parseFloat(aB);

    if (Object.keys(inputs).length >= 2) {
      setTrigResult(solveRightTriangle(inputs));
    } else {
      setTrigResult(null);
    }
  };

  const clearTrig = () => {
    setSideA(""); setSideB(""); setSideC("");
    setAngleA(""); setAngleB("");
    setTrigResult(null);
  };

  const tabs = [
    { id: "bolt-circle", label: "Bolt Circle (PCD)" },
    { id: "sine-bar", label: "Sine Bar" },
    { id: "trig", label: "Right Triangle" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col">
      <Header />

      <section className="pt-12 pb-8 bg-gray-50 dark:bg-gray-900/20 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="font-mono text-xs text-green-600 dark:text-green-400 mb-2 tracking-wider font-semibold">
            MATH-001 | REV A
          </div>
          <h1 className="text-4xl font-bold mb-3 tracking-tight">Shop Math Calculators</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            Essential geometric calculations for layout and inspection.
          </p>
        </div>
      </section>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <section className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-6">
          
          {activeTab === "bolt-circle" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in-up">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 h-fit">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                  Parameters
                </h2>
                <div className="space-y-4">
                  <NumberInput label="Pitch Circle Diameter (PCD)" value={pcd} onChange={(v) => updateBoltCircle(v, numHoles, startAngle)} placeholder="e.g. 5.0" unit="in/mm" />
                  <NumberInput label="Number of Holes" value={numHoles} onChange={(v) => updateBoltCircle(pcd, v, startAngle)} placeholder="e.g. 6" step={1} />
                  <NumberInput label="Start Angle" value={startAngle} onChange={(v) => updateBoltCircle(pcd, numHoles, v)} placeholder="0" unit="deg" />
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 flex justify-center items-center aspect-square max-h-[400px]">
                  {bcResults.length > 0 ? (
                    <svg viewBox="-110 -110 220 220" className="w-full h-full">
                      <line x1="-100" y1="0" x2="100" y2="0" stroke="currentColor" strokeOpacity="0.2" />
                      <line x1="0" y1="-100" x2="0" y2="100" stroke="currentColor" strokeOpacity="0.2" />
                      <circle cx="0" cy="0" r="80" fill="none" stroke="currentColor" strokeDasharray="4 4" strokeOpacity="0.3" />
                      {bcResults.map((res, i) => {
                        const maxR = parseFloat(pcd) / 2;
                        const scale = 80 / maxR;
                        const sx = res.x * scale;
                        const sy = -res.y * scale;
                        return (
                          <g key={i}>
                            <circle cx={sx} cy={sy} r="4" className="fill-blue-500" />
                            <text x={sx + 8} y={sy + 8} fontSize="10" className="fill-gray-500">{i+1}</text>
                          </g>
                        );
                      })}
                    </svg>
                  ) : (
                    <div className="text-gray-400 text-sm">Enter parameters to see preview</div>
                  )}
                </div>
                {bcResults.length > 0 && (
                  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-gray-50 dark:bg-gray-800 text-xs uppercase text-gray-500">
                        <tr><th className="px-4 py-3">#</th><th className="px-4 py-3">Angle</th><th className="px-4 py-3">X Coord</th><th className="px-4 py-3">Y Coord</th></tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {bcResults.map((row) => (
                          <tr key={row.index}>
                            <td className="px-4 py-3 font-medium">{row.index}</td>
                            <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{row.angle.toFixed(2)}deg</td>
                            <td className="px-4 py-3 font-mono">{row.x.toFixed(4)}</td>
                            <td className="px-4 py-3 font-mono">{row.y.toFixed(4)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "sine-bar" && (
            <div className="max-w-2xl mx-auto animate-fade-in-up">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-purple-600 rounded-full"></span>
                  Sine Bar Calculator
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <NumberInput label="Desired Angle" value={sineAngle} onChange={(v) => updateSineBar(v, barLength)} placeholder="e.g. 30" unit="deg" />
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Sine Bar Length</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={() => updateSineBar(sineAngle, "5")} className={`px-3 py-2 border rounded-lg text-sm transition-all ${barLength === "5" ? "bg-purple-50 border-purple-500 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" : "border-gray-300 dark:border-gray-700"}`}>5.000"</button>
                      <button onClick={() => updateSineBar(sineAngle, "10")} className={`px-3 py-2 border rounded-lg text-sm transition-all ${barLength === "10" ? "bg-purple-50 border-purple-500 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" : "border-gray-300 dark:border-gray-700"}`}>10.000"</button>
                    </div>
                  </div>
                </div>
                {sineHeight !== null && (
                  <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 rounded-xl p-6 text-center">
                    <div className="text-sm text-purple-800 dark:text-purple-300 uppercase tracking-wide font-semibold mb-2">Required Gauge Block Stack Height</div>
                    <div className="text-4xl font-bold font-mono text-purple-900 dark:text-white">{sineHeight.toFixed(4)}"</div>
                    <div className="mt-4 text-xs text-purple-600 dark:text-purple-400">Formula: Height = Length x sin(Angle)</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "trig" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in-up">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <span className="w-1 h-6 bg-orange-600 rounded-full"></span>
                    Triangle Inputs
                  </h2>
                  <button onClick={clearTrig} className="text-sm text-red-600 hover:text-red-700">Clear</button>
                </div>
                <p className="text-sm text-gray-500 mb-4">Enter any 2 values to solve (at least one side).</p>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <NumberInput label="Side a (Height)" value={sideA} onChange={(v) => updateTrig(v, sideB, sideC, angleA, angleB)} placeholder="-" />
                    <NumberInput label="Side b (Base)" value={sideB} onChange={(v) => updateTrig(sideA, v, sideC, angleA, angleB)} placeholder="-" />
                  </div>
                  <NumberInput label="Side c (Hypotenuse)" value={sideC} onChange={(v) => updateTrig(sideA, sideB, v, angleA, angleB)} placeholder="-" />
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <NumberInput label="Angle A (deg)" value={angleA} onChange={(v) => updateTrig(sideA, sideB, sideC, v, angleB)} placeholder="-" />
                    <NumberInput label="Angle B (deg)" value={angleB} onChange={(v) => updateTrig(sideA, sideB, sideC, angleA, v)} placeholder="-" />
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 flex justify-center items-center h-64">
                  <svg viewBox="0 0 120 120" className="w-full h-full max-w-[240px] overflow-visible">
                    <path d="M 20 100 L 100 100 L 100 40 Z" className="fill-orange-50 dark:fill-orange-900/10 stroke-orange-600 dark:stroke-orange-500" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                    <path d="M 90 100 L 90 90 L 100 90" fill="none" stroke="currentColor" className="text-gray-400 dark:text-gray-600" strokeWidth="1" />
                    <g className="text-xs font-medium fill-gray-700 dark:fill-gray-300">
                      <text x="60" y="115" textAnchor="middle">b</text>
                      <text x="110" y="75" textAnchor="start" dominantBaseline="middle">a</text>
                      <text x="50" y="60" textAnchor="end" dominantBaseline="middle">c</text>
                      <text x="15" y="105" textAnchor="end" className="fill-orange-600 dark:fill-orange-400 font-bold">A</text>
                      <text x="105" y="35" textAnchor="start" className="fill-orange-600 dark:fill-orange-400 font-bold">B</text>
                    </g>
                  </svg>
                </div>
                {trigResult ? (
                  <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800 rounded-xl p-6">
                    <h3 className="text-sm font-bold text-orange-800 dark:text-orange-300 uppercase tracking-wide mb-4">Solution</h3>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Side a:</span><span className="font-mono font-bold">{trigResult.a.toFixed(4)}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Angle A:</span><span className="font-mono font-bold">{trigResult.A.toFixed(2)} deg</span></div>
                      <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Side b:</span><span className="font-mono font-bold">{trigResult.b.toFixed(4)}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Angle B:</span><span className="font-mono font-bold">{trigResult.B.toFixed(2)} deg</span></div>
                      <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Side c:</span><span className="font-mono font-bold">{trigResult.c.toFixed(4)}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Area:</span><span className="font-mono font-bold">{trigResult.area.toFixed(4)}</span></div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-400 text-sm p-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl">Enter values to calculate</div>
                )}
              </div>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </div>
  );
}
