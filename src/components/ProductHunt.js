import React from 'react';

export default function ProductHunt (){

  return (
    <>
    <a 
    href={`https://www.producthunt.com/posts/jubrillo?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-jubrillo`} 
    target="_blank"
    rel='noopener noreferrer'>
      <img src={`https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=175450&theme=dark`} 
      alt={`Jubrillo - Freelance Hiring & Work with Optional Escrow | Product Hunt Embed`} 
      style={{
        "width": "450px", 
        "height": "80px"}} /></a>
    </>
  );
}