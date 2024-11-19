import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import Confetti from "react-confetti";

// Importing food images
import bonchon from "../images/bonchon.jpg";
import burger from "../images/burger.jpg";
import greenwich from "../images/greenwich.png";
import jabbeh from "../images/jabbeh.jpg";
import pizza from "../images/pizza.jpg";
import ranen from "../images/ranen.jpg";
import { Timestamp } from "firebase/firestore";

// Importing MP4s (GIFs)
import happiest from "../images/hapiest.mp4";
import happy from "../images/Happy.mp4";
import sad from "../images/Sad.mp4";

const HomePage = () => {
  const [step, setStep] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedFood, setSelectedFood] = useState("");
  const [excitement, setExcitement] = useState(5);
  const formatTime = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date();
  
    // Set the time to the selected time
    date.setHours(hours);
    date.setMinutes(minutes);
  
    // Convert to Philippine Time (PHT), which is UTC+8
    const options = { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true, 
      timeZone: 'Asia/Manila'  // Specify the correct time zone
    };
  
    return date.toLocaleTimeString('en-US', options);  // Use the correct time zone
  };
  
  
  const handleYes = async () => {
    try {
      await setDoc(doc(db, "responses", "response1"), { response: "Yes" });
      setShowConfetti(true);
      setTimeout(() => setStep(2), 1000);
    } catch (error) {
      console.error("Error saving response:", error);
    }
  };


  const handleSaveDateTime = async () => {
    try {
      const dateTime = new Date(`${selectedDate}T${selectedTime}:00`);
      const timestamp = Timestamp.fromDate(dateTime); // Convert to Firestore Timestamp
  
      await setDoc(doc(db, "responses", "response1"), {
        selectedDate,
        selectedTime,
        timestamp,
      });
      setStep(3);
    } catch (error) {
      console.error("Error saving date/time:", error);
    }
  };
  
  const handleSaveFood = async () => {
    try {
      await setDoc(doc(db, "responses", "response1"), { selectedFood });
      setStep(4);
    } catch (error) {
      console.error("Error saving food choice:", error);
    }
  };

  const handleSaveExcitement = async () => {
    try {
      await setDoc(doc(db, "responses", "response1"), { excitement });
      setStep(5);
    } catch (error) {
      console.error("Error saving excitement:", error);
    }
  };

  // Determine the GIF to display based on excitement
  const getExcitementGif = () => {
    if (excitement >= 8) {
      return happiest;
    } else if (excitement >= 5) {
      return happy;
    } else {
      return sad;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-200 relative overflow-hidden">
      {showConfetti && <Confetti />}

      {step === 1 && (
  <div className="text-center max-w-lg mx-auto animate__animated animate__fadeIn animate__delay-1s">
    {/* Card Background */}
    <div className="bg-white rounded-lg shadow-2xl p-8 mx-4 md:mx-0">

      {/* Title Section */}
      <h1 className="text-5xl font-bold text-pink-600 mb-8 transform transition duration-1000 hover:text-pink-700 animate__animated animate__bounceIn">
        Would you like to go out with me for a date?
      </h1>

      {/* Button Section */}
      <div className="flex justify-center gap-12">
        <button
          onClick={handleYes}
          className="bg-pink-500 text-white px-10 py-5 rounded-xl transition-all transform hover:scale-105 hover:bg-pink-600 shadow-xl"
        >
          Yes
        </button>
        <button
          onClick={() => setStep(0)}
          className="bg-gray-300 text-gray-700 px-10 py-5 rounded-xl transition-all transform hover:scale-105 hover:bg-gray-400 shadow-lg"
        >
          No
        </button>
      </div>
    </div>
  </div>
)}

{/* Step 2: Date and Time Picker */}
{step === 2 && (
  <div className="text-center max-w-lg mx-auto animate__animated animate__fadeIn animate__delay-2s">
    
    {/* Card Background */}
    <div className="bg-white rounded-lg shadow-2xl p-8 mx-4 md:mx-0">

      {/* Title Section */}
      <h1 className="text-4xl font-semibold text-pink-600 mb-8 transform transition duration-1000 hover:text-pink-700 animate__animated animate__zoomIn">
        When are you free?
      </h1>

      {/* Date Picker Section */}
      <div className="flex justify-center mb-6">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border-2 border-gray-300 rounded-lg px-6 py-3 w-full max-w-xs mx-2 transition duration-300 focus:ring-2 focus:ring-pink-500 focus:outline-none"
        />
      </div>

      {/* Time Picker Section */}
      <div className="flex justify-center mb-8">
        <input
          type="time"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          className="border-2 border-gray-300 rounded-lg px-6 py-3 w-full max-w-xs mx-2 transition duration-300 focus:ring-2 focus:ring-pink-500 focus:outline-none"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSaveDateTime}
        className="bg-pink-500 text-white px-10 py-5 rounded-xl transition-all transform hover:scale-105 hover:bg-pink-600 shadow-2xl mt-6 w-full max-w-xs mx-auto"
      >
        Save
      </button>
      
    </div>
  </div>
)}

{/* Step 3: Food Selection */}
{step === 3 && (
  <div className="text-center max-w-7xl mx-auto animate__animated animate__fadeIn animate__delay-3s">
    
    {/* Card Container */}
    <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 md:p-10 mx-4 md:mx-0">

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-semibold text-pink-600 mb-6 sm:mb-8 transform transition duration-1000 hover:text-pink-700">
        What food would you like?
      </h1>

      {/* Food Selection Grid */}
      <div className="grid grid-cols-3 gap-6 md:gap-8 mb-6 sm:mb-8">
        {[bonchon, burger, greenwich, jabbeh, pizza, ranen].map((foodImg, idx) => (
          <div
            key={idx}
            className={`relative cursor-pointer transform transition-all duration-300 ease-in-out ${selectedFood === foodImg ? 'scale-105 shadow-2xl ring-4 ring-pink-500' : ''}`}
            onClick={() => setSelectedFood(foodImg)}
          >
            {/* Food Image */}
            <img
              src={foodImg}
              alt={`Food ${idx + 1}`}
              className="w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-lg shadow-lg object-cover transition duration-300 ease-in-out"
            />
          </div>
        ))}
      </div>

      {/* Save Button */}
      <button
        onClick={handleSaveFood}
        className="bg-pink-500 text-white px-8 py-4 rounded-xl transition-all transform hover:scale-105 hover:bg-pink-600 shadow-xl w-full max-w-xs mx-auto"
      >
        Save
      </button>
    </div>
  </div>
)}


      {/* Step 4: Excitement Range */}
      {step === 4 && (
        <div className="text-center max-w-lg mx-auto animate__animated animate__fadeIn animate__delay-4s">
          <h1 className="text-3xl font-semibold text-pink-600 mb-4 animate__animated animate__zoomIn">
            Rate how excited you are!
          </h1>
          <input
            type="range"
            min="1"
            max="10"
            value={excitement}
            onChange={(e) => setExcitement(e.target.value)}
            className="w-64 mb-6 transition-all transform hover:scale-105"
          />
          <div className="text-lg text-pink-600 mb-4">Excitement: {excitement}</div>

          {/* Displaying the appropriate GIF based on excitement */}
          <div className="mb-6">
            <video
              className="w-64 h-64 object-cover mx-auto"
              autoPlay
              loop
              muted
              src={getExcitementGif()}
            />
          </div>

          <button
            onClick={handleSaveExcitement}
            className="bg-pink-500 text-white px-8 py-4 rounded-xl transition-all transform hover:scale-105 hover:bg-pink-600 shadow-xl animate__animated animate__fadeInUp"
          >
            Save
          </button>
        </div>
      )}
{step === 5 && (
  <div className="text-center max-w-lg mx-auto animate__animated animate__fadeIn animate__delay-5s">
    <div className="bg-white rounded-lg shadow-2xl p-8 mx-4 md:mx-0">

      <h1 className="text-4xl font-bold text-pink-600 mb-6 animate__animated animate__pulse">
        We are all set for the date!
      </h1>

      <div className="mb-6">
        <p className="text-xl text-pink-600 mb-2">
          <strong>Date:</strong> {selectedDate}
        </p>
        <p className="text-xl text-pink-600 mb-4">
          <strong>Time:</strong> {formatTime(selectedTime)}
        </p>

        <div>
          <strong className="text-xl">Food Choice:</strong>
          <div className="mt-4">
            <img
              src={selectedFood}
              alt="Selected Food"
              className="w-60 h-60 rounded-lg shadow-lg object-cover mx-auto"
            />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={() => setStep(1)}
          className="bg-pink-500 text-white px-10 py-5 rounded-xl transition-all transform hover:scale-105 hover:bg-pink-600 shadow-2xl"
        >
          Start Over
        </button>
      </div>

    </div>
  </div>
)}



    </div>
  );
};

export default HomePage;
