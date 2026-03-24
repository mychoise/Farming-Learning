import React, { useState } from "react";
import {
  Upload,
  AlertTriangle,
} from "lucide-react";

type CircularProgressProps = {
  percentage: number;
  size?: number;
  strokeWidth?: number;
};

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  size = 120,
  strokeWidth = 8,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-green-600 transition-all duration-500 ease-in-out"
          strokeLinecap="round"
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-gray-900">
          {percentage}%
        </span>
      </div>
    </div>
  );
};

type SpreadVelocityBarProps = {
  velocity?: number;
};

const SpreadVelocityBar: React.FC<SpreadVelocityBarProps> = ({
  velocity = 0.4,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">MODERATE</span>
        <span className="text-sm text-gray-600">
          {velocity}ha/Day
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-yellow-500 to-red-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${Math.min(velocity * 100, 100)}%` }}
        />
      </div>
    </div>
  );
};

export default function AiDiseaseDetection() {
  const [observations, setObservations] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-gray-100 p-4 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Submission Zone */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
              Submission Zone
            </h1>

            <p className="text-gray-600 mb-8 text-lg">
              Upload high-resolution samples for spectral pathogen identification.
            </p>

            {/* Upload Area */}
            <div className="bg-gray-50 rounded-2xl p-8 mb-6 border-2 border-dashed border-gray-200 hover:border-green-400 transition-colors cursor-pointer group">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Uploaded sample"
                    className="w-full h-64 object-cover rounded-xl shadow-md"
                  />

                  <div className="absolute bottom-3 left-3 bg-black bg-opacity-60 text-white px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-2">
                    <Upload size={16} />
                    {imageFile?.name}
                  </div>

                  <button
                    onClick={() => {
                      setImagePreview(null);
                      setImageFile(null);
                    }}
                    className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-64 cursor-pointer">
                  <Upload size={32} className="text-gray-400 mb-3" />
                  <p className="text-gray-600 font-medium mb-1">
                    Click to upload image
                  </p>
                  <p className="text-gray-400 text-sm">
                    PNG, JPG, JPEG supported
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </div>

            {/* Observations */}
            <textarea
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              placeholder="Describe symptoms, crop stage, and environmental conditions..."
              className="w-full h-32 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none text-gray-700"
            />

            <button
              onClick={handleAnalysis}
              disabled={isAnalyzing}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200"
            >
              {isAnalyzing ? "Analyzing Sample..." : "Run AI Analysis"}
            </button>
          </div>
        </div>

        {/* Diagnostic Center */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h1 className="text-3xl text-gray-900 mb-2">
              Diagnostic Center
            </h1>

            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-2 text-red-700">
              <AlertTriangle size={18} />
              Pathogen Detected
            </div>

            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <h2 className="text-3xl text-gray-900 mb-3">
                  Bacterial Leaf Streak
                </h2>

                <p className="text-gray-600 text-[17px] leading-relaxed">
                  The AI identifies distinct linear, water-soaked lesions
                  consistent with Xanthomonas vasicola.
                </p>
              </div>

              <div className="ml-6 text-center">
                <CircularProgress percentage={96} />
                <div className="mt-2 text-sm text-gray-500 uppercase">
                  Confidence Score
                </div>
              </div>
            </div>

                          <div className="flex-1">
                <h2 className="text-3xl text-gray-900 mb-3">
                  Bacterial Leaf Streak
                </h2>

                <p className="text-gray-600 text-[17px] leading-relaxed">
                  The AI identifies distinct linear, water-soaked lesions
                  consistent with Xanthomonas vasicola.
                </p>
              </div>

          </div>
        </div>
      </div>
    </div>
  );
}
