import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import * as signalR from '@microsoft/signalr';

const UserSegments = {
  ENTREPRENEUR: 'entrepreneur',
  CAREER_CHANGER: 'career_changer',
  ADULT_LEARNER: 'adult_learner',
  EMPLOYER: 'employer',
  TECH_ENTHUSIAST: 'tech_enthusiast',
};

const Home: React.FC = () => {
  const [userSegment, setUserSegment] = useState('');
  const [agentResponse, setAgentResponse] = useState('');
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("/agenthub")  // Replace with your actual SignalR hub URL
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    return () => {
      newConnection.stop();
    };
  }, []);

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => console.log('SignalR Connected'))
        .catch(err => console.error('SignalR Connection Error: ', err));

      connection.on("ReceiveMessage", (message) => {
        setAgentResponse(message);
      });
    }
  }, [connection]);

  const handleSegmentChange = (segment: string) => {
    setUserSegment(segment);
    // Here you would typically send this information to your backend
    if (connection) {
      connection.invoke("SetUserSegment", segment);
    }
  };

  const handleVoiceInput = () => {
    SpeechRecognition.startListening();
  };

  const handleSubmitVoiceInput = () => {
    if (connection) {
      connection.invoke("SendMessage", transcript);
    }
    resetTranscript();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Multi-Agent Assistant</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <p>Select your user segment:</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(UserSegments).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => handleSegmentChange(value)}
                      className={`px-4 py-2 rounded ${
                        userSegment === value ? 'bg-blue-500 text-white' : 'bg-gray-200'
                      }`}
                    >
                      {key.replace('_', ' ')}
                    </button>
                  ))}
                </div>
                <div className="mt-6">
                  <button
                    onClick={handleVoiceInput}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Start Voice Input
                  </button>
                  <p className="mt-2">Transcript: {transcript}</p>
                  <button
                    onClick={handleSubmitVoiceInput}
                    className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Submit Voice Input
                  </button>
                </div>
                <div className="mt-6">
                  <h2 className="text-xl font-semibold">Agent Response:</h2>
                  <p className="mt-2">{agentResponse}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;