import OpenAI from "openai";

export async function handler(event){

  const openai=new OpenAI({
    apiKey:process.env.OPENAI_API_KEY
  });

  const body=JSON.parse(event.body);

  let systemPrompt="";
  let userPrompt="";

  // DAILY TASK
  if(body.type==="daily"){
    systemPrompt=`
    You are an elite 100-day transformation AI coach.
    Create 1 clear achievable daily task.
    Include:
    - Specific action
    - Mini diet guidance if goal is fitness
    - Short motivation
    Tone depends on personality: hardcore, balanced, or chill.
    Increase difficulty gradually.
    `;

    userPrompt=`
    Name: ${body.name}
    Age: ${body.age}
    Goal: ${body.goal}
    Personality: ${body.personality}
    Day: ${body.day}
    `;
  }

  // AI ASSISTANT
  if(body.type==="assistant"){
    systemPrompt=`
    You are a smart, supportive AI coach like ChatGPT.
    Answer clearly.
    Be structured.
    Give practical steps.
    Adapt advice based on user's goal.
    Tone depends on personality.
    `;

    userPrompt=`
    User Goal: ${body.goal}
    Personality: ${body.personality}
    Question: ${body.question}
    `;
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
