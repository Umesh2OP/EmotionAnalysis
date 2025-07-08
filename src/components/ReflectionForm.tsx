import React, { useState, type JSX } from "react";
import axios from "axios";
import { FaSmile, FaFrown, FaMeh, FaAngry, FaSpinner } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// ✅ Icon map to show emotion-specific icons
const emotionIcons: Record<string, JSX.Element> = {
  Happy: <FaSmile className="text-yellow-500" size={32} />,
  Sad: <FaFrown className="text-blue-500" size={32} />,
  Neutral: <FaMeh className="text-gray-400" size={32} />,
  Angry: <FaAngry className="text-red-500" size={32} />,
  Anxious: <FaMeh className="text-orange-400" size={32} />
};

const ReflectionForm: React.FC = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ emotion: string; confidence: number } | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/analyze", { text });
      setResult(response.data);
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
        🧠 How Are You Feeling Today?
      </h1>

      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={4}
          placeholder="Write your thoughts here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 text-white px-4 py-2 rounded-xl w-full font-semibold hover:bg-blue-700 transition-all ${
            loading && "opacity-70 cursor-not-allowed"
          }`}
        >
          {loading ? (
            <span className="flex justify-center items-center gap-2">
              <FaSpinner className="animate-spin" /> Analyzing...
            </span>
          ) : (
            "Submit Reflection"
          )}
        </button>
      </form>

      <AnimatePresence>
        {result && (
          <motion.div
            className="mt-6 bg-blue-50 p-4 rounded-xl shadow-sm flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mb-2">{emotionIcons[result.emotion] || <FaMeh className="text-gray-400" size={32} />}</div>
            <p className="text-xl font-medium text-blue-700 mb-1">
              Emotion: {result.emotion}
            </p>
            <div className="w-full mt-2">
              <div className="text-sm text-gray-700 mb-1">
                Confidence: {(result.confidence * 100).toFixed(1)}%
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500"
                  style={{ width: `${result.confidence * 100}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <motion.p
          className="mt-4 text-red-600 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};

export default ReflectionForm;
