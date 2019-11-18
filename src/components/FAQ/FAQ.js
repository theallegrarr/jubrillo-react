import React from 'react';

export default function FAQ(props){


  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
        <ul>
        {
          faqItems.map(item => (
            <li
              key={item.id}
            >
              {/* <i></i> */}
              <h3>{item.title}</h3>
              <p>{item.content}</p>
            </li>
          ))
        }
      </ul>
  </div>
  );
}

const faqItems = [
  {
    id: 22220,
    title: 'What is Jubrillo?',
    content: 'Jubrillo is a decentralized freelancing platform where anyone can make or perform jobs'
  },
  {
    id: 22221,
    title: 'How do i get started?',
    content: `Start by creating a blockstack account on blockstack.org, and then hit the 'Sign In' Button`
  },
  {
    id: 22222,
    title: 'When can I apply for Jobs?',
    content: `As soon as your account is created, update your profile and you can start`
  },
  {
    id: 22223,
    title: 'When can I create Jobs?',
    content: `As soon as you're logged in`
  },
  {
    id: 22224,
    title: 'Are there fees involved?',
    content: `Yes and No,  if you pay your freelancer through Jubrillo, there will be a 5% charge but if you choose to work directly, there is no charge`
  },
  {
    id: 22225,
    title: 'Why Pay through Jubrillo?',
    content: `Paying through Jubrillo ensures that the freelancer is assured of his funds and if he does not deliver, the money will be reverted back to the employer after the issue is investigated`
  },
  {
    id: 22226,
    title: 'What Happens when I have a Problem with the job?',
    content: `Contact us and we will do our best to find an amicable solution`
  },
]