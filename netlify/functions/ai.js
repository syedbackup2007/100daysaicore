import OpenAI from "openai";

export async function handler(event){

  const openai=new OpenAI({
    apiKey:process.env.OPENAI_API_KEY
  });

  const body=JSON.parse(event.body);

  let systemPrompt="";
  let userPrompt="";

  if(body.type==="plan"){
    systemPrompt="You are an elite 100-day transformation AI. Generate structured daily diet + action plan. Increase difficulty gradually. Personalize tone based on personality.";

    userPrompt=`
    Name: ${body.name}
    Age: ${body.age}
    Goal: ${body.goal}
    Personality: ${body.personality}
    Day: ${body.day}

    Generate:
    - Diet plan
    - Workout or action
    - Motivation
    `;
  }

  if(body.type==="assistant"){
    systemPrompt="You are a helpful AI life coach.";
    userPrompt=body.question;
  }

  const response=await openai.chat.completions.create({
    model:"gpt-4o-mini",
    messages:[
      {role:"system",content:systemPrompt},
      {role:"user",content:userPrompt}
    ]
  });

  return{
    statusCode:200,
    body:JSON.stringify({
      reply:response.choices[0].message.content
    })
  };
}
