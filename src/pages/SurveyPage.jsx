import { useState } from "react";
import { Link } from "react-router-dom";

const QUESTIONS = [
  {
    id: "visit_purpose",
    type: "radio",
    question: "What was the primary purpose of your visit today?",
    options: ["Browsing for inspiration", "Looking for a specific product", "Checking out new arrivals", "Making a planned purchase", "Repurchasing a favourite"],
  },
  {
    id: "found_product",
    type: "radio",
    question: "Were you able to find what you were looking for?",
    options: ["Yes, easily", "Yes, but it took some searching", "Not quite — close but not exactly", "No, I couldn't find it"],
  },
  {
    id: "overall_rating",
    type: "star",
    question: "How would you rate your overall experience on Lumière?",
  },
  {
    id: "faceted_search",
    type: "radio",
    question: "How helpful was our product filtering / search feature?",
    options: ["Very helpful — found exactly what I needed", "Somewhat helpful", "Neutral", "Not very helpful", "I didn't use it"],
  },
  {
    id: "nav_ease",
    type: "scale",
    question: "How easy was it to navigate the site?",
    min: "Very Difficult",
    max: "Very Easy",
  },
  {
    id: "liked",
    type: "checkbox",
    question: "What did you like most about the site? (Select all that apply)",
    options: ["Product selection", "Visual design & aesthetics", "Easy navigation", "Product descriptions", "Shade options", "Pricing", "Promotions / deals", "Quick add to cart"],
  },
  {
    id: "improvements",
    type: "checkbox",
    question: "What could we improve? (Select all that apply)",
    options: ["More product variety", "Better search functionality", "Clearer product descriptions", "More shade/colour options", "Faster checkout", "More payment options", "Better mobile experience", "Live chat support"],
  },
  {
    id: "recommend",
    type: "radio",
    question: "How likely are you to recommend Lumière to a friend?",
    options: ["Definitely would", "Probably would", "Not sure", "Probably wouldn't", "Definitely wouldn't"],
  },
  {
    id: "purchase_intent",
    type: "radio",
    question: "Are you planning to make a purchase today or soon?",
    options: ["Already purchased", "Planning to purchase soon", "Just browsing for now", "Looking for a gift"],
  },
  {
    id: "comments",
    type: "textarea",
    question: "Any other thoughts, suggestions, or feedback? We read every single response! 💬",
    placeholder: "Share your thoughts with us...",
  },
];

export default function SurveyPage() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [starHover, setStarHover] = useState(0);

  const updateAnswer = (id, value) =>
    setAnswers((prev) => ({ ...prev, [id]: value }));

  const toggleCheckbox = (id, option) => {
    setAnswers((prev) => {
      const current = prev[id] || [];
      return {
        ...prev,
        [id]: current.includes(option)
          ? current.filter((o) => o !== option)
          : [...current, option],
      };
    });
  };

  const handleSubmit = () => setSubmitted(true);

  const progress = Math.round((Object.keys(answers).length / QUESTIONS.length) * 100);
  const q = QUESTIONS[currentQ];

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 bg-blush-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-5xl">💖</span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-gray-900 mb-3">
          Thank you so much!
        </h1>
        <p className="text-gray-500 leading-relaxed mb-8">
          Your feedback means the world to us. Every response helps us create a better experience for you and everyone in our community.
          <br /><br />
          As a thank you, enjoy <strong className="text-blush-500">10% off</strong> your next order with code <strong className="text-blush-500 font-mono tracking-widest">THANKYOU10</strong>.
        </p>
        <div className="bg-blush-50 rounded-2xl p-5 mb-8 text-sm text-gray-600 text-left space-y-2">
          <h3 className="font-semibold text-gray-900 mb-3">Your responses at a glance:</h3>
          {Object.entries(answers).slice(0, 5).map(([key, val]) => {
            const question = QUESTIONS.find((q) => q.id === key);
            return (
              <div key={key} className="flex gap-2">
                <span className="text-blush-400">✓</span>
                <span className="text-gray-600">
                  {Array.isArray(val) ? val.join(", ") : val}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex gap-3 justify-center">
          <Link to="/shop" className="btn-primary text-sm px-8">
            Shop Now
          </Link>
          <Link to="/" className="btn-outline text-sm px-8">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <span className="text-3xl mb-3 block">✨</span>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">Help us glow up</h1>
        <p className="text-gray-500 mt-2 text-sm max-w-md mx-auto">
          This quick 2-minute survey helps us understand your experience and make Lumière even better for you.
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-gray-400 mb-1.5">
          <span>Question {currentQ + 1} of {QUESTIONS.length}</span>
          <span>{progress}% complete</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blush-400 to-blush-500 rounded-full transition-all duration-500"
            style={{ width: `${((currentQ + 1) / QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 sm:p-8 mb-6">
        <h2 className="font-serif text-xl font-semibold text-gray-900 mb-6 leading-snug">
          {q.question}
        </h2>

        {/* Radio */}
        {q.type === "radio" && (
          <div className="space-y-3">
            {q.options.map((opt) => (
              <label
                key={opt}
                className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  answers[q.id] === opt
                    ? "border-blush-400 bg-blush-50"
                    : "border-gray-100 hover:border-gray-300 bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name={q.id}
                  value={opt}
                  checked={answers[q.id] === opt}
                  onChange={() => updateAnswer(q.id, opt)}
                  className="text-blush-500 focus:ring-blush-400"
                />
                <span className="text-sm text-gray-700">{opt}</span>
              </label>
            ))}
          </div>
        )}

        {/* Checkbox */}
        {q.type === "checkbox" && (
          <div className="grid grid-cols-2 gap-2">
            {q.options.map((opt) => {
              const checked = (answers[q.id] || []).includes(opt);
              return (
                <label
                  key={opt}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border-2 cursor-pointer transition-all text-sm ${
                    checked ? "border-blush-400 bg-blush-50" : "border-gray-100 hover:border-gray-300 bg-gray-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleCheckbox(q.id, opt)}
                    className="text-blush-500 focus:ring-blush-400 rounded"
                  />
                  <span className="text-gray-700">{opt}</span>
                </label>
              );
            })}
          </div>
        )}

        {/* Star rating */}
        {q.type === "star" && (
          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setStarHover(star)}
                  onMouseLeave={() => setStarHover(0)}
                  onClick={() => updateAnswer(q.id, star)}
                  className="transition-transform hover:scale-125 active:scale-110"
                >
                  <svg
                    className={`w-12 h-12 transition-colors ${
                      star <= (starHover || answers[q.id] || 0) ? "text-amber-400" : "text-gray-200"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
            {answers[q.id] && (
              <p className="text-sm font-medium text-blush-500">
                {["", "Poor", "Fair", "Good", "Great", "Amazing!"][answers[q.id]]}
              </p>
            )}
          </div>
        )}

        {/* Scale */}
        {q.type === "scale" && (
          <div>
            <div className="flex gap-2 justify-between mb-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <button
                  key={n}
                  onClick={() => updateAnswer(q.id, n)}
                  className={`flex-1 h-11 rounded-lg text-sm font-semibold transition-all border-2 ${
                    answers[q.id] === n
                      ? "bg-blush-500 border-blush-500 text-white shadow-md scale-105"
                      : "border-gray-200 text-gray-500 hover:border-blush-300 hover:text-blush-500"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{q.min}</span>
              <span>{q.max}</span>
            </div>
          </div>
        )}

        {/* Textarea */}
        {q.type === "textarea" && (
          <textarea
            value={answers[q.id] || ""}
            onChange={(e) => updateAnswer(q.id, e.target.value)}
            placeholder={q.placeholder}
            rows={5}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blush-400 resize-none"
          />
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentQ((c) => Math.max(0, c - 1))}
          disabled={currentQ === 0}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed px-4 py-2.5 rounded-full border border-gray-200 hover:border-gray-300"
        >
          ← Previous
        </button>

        <div className="flex gap-1">
          {QUESTIONS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentQ(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentQ ? "bg-blush-500 w-5" : answers[QUESTIONS[i].id] ? "bg-blush-300" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        {currentQ < QUESTIONS.length - 1 ? (
          <button
            onClick={() => setCurrentQ((c) => Math.min(QUESTIONS.length - 1, c + 1))}
            className="btn-primary text-sm px-6"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-blush-500 to-nude-500 text-white font-semibold text-sm px-8 py-2.5 rounded-full hover:opacity-90 transition-opacity shadow-lg"
          >
            Submit ✨
          </button>
        )}
      </div>

      {/* Skip note */}
      <p className="text-center text-xs text-gray-400 mt-5">
        All questions are optional. Take as long as you need. 💕
      </p>
    </div>
  );
}
