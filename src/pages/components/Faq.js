import React, { useState } from 'react';

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Close the answer if it's already open
    } else {
      setActiveIndex(index); // Open the answer
    }
  };

  const faqData = [
    {
        "question": "What is DevFest?",
        "answer": "DevFest is an annual technology conference organized by the developer community. It brings together developers, designers, and tech enthusiasts to learn, share knowledge, and network."
      },
      {
        "question": "When and where is DevFest happening this year?",
        "answer": "DevFest is scheduled to take place on [insert date] at [insert venue]. Check the official DevFest website for the most up-to-date information."
      },
      {
        "question": "How can I register for DevFest?",
        "answer": "You can register for DevFest on the official website. Look for the 'Register' or 'Get Tickets' button, and follow the registration process to secure your spot."
      },
      {
        "question": "Are there any prerequisites for attending DevFest?",
        "answer": "DevFest is open to anyone interested in technology. While some sessions may have specific prerequisites, most of the content is designed to be accessible to a broad audience. Check the session descriptions for any requirements."
      },
      {
        "question": "Is there a code of conduct for DevFest attendees?",
        "answer": "Yes, there is a code of conduct that all DevFest attendees are expected to follow. It includes guidelines for respectful behavior, inclusivity, and creating a positive conference experience for everyone. Familiarize yourself with the code of conduct before attending."
      }
   
  ];

  return (
    <div>
          <style jsx>
{
  `
  @import url('https://fonts.googleapis.com/css2?family=Cabin:wght@600&display=swap');
  .fontevent{
    font-family: 'Cabin', sans-serif;
  }
  `
}
          </style>
      <section className="" id='faq'>
        <div className="container px-6 py-12 mx-auto">
            <div className=''>
            <h1 className='font text-4xl text-white fontevent'>
        Frequently Asked Questions
      </h1>
      <div className='h-2 w-96 bg-purple-600 rounded-3xl my-2'></div>
            </div>
       
          <div className="mt-8 space-y-8 lg:mt-12 ">
            {faqData.map((item, index) => (
              <div key={index} className="p-8 rounded-lg bg-gray-800  mx-4">
                <button
                  onClick={() => toggleAnswer(index)}
                  className="flex items-center justify-between w-full"
                >
                  <h1 className="font-semibold text-white fontevent">{item.question}</h1>

                  <span className="text-gray-400 bg-gray-200 rounded-full">
                    {activeIndex === index ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    )}
                  </span>
                </button>

                {activeIndex === index && (
                  <p className="mt-6 text-sm text-gray-300 font">
                    {item.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faq;

