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
    You are a structured 100-day AI transformation coach.
    Give ONE clear daily task.
    Make it short and actionable.
    Adjust difficulty gradually.
    Adapt tone based on personality.
    `;

    userPrompt=`
    Goal: ${body.goal}
    Personality: ${body.personality}
    Day: ${body.day}
    `;
  }

  // AI ASSISTANT
  if(body.type==="assistant"){
    systemPrompt=`
    You are a smart AI coach like ChatGPT.
    Give structured, practical advice.
    Adapt answer based on user's goal.
    Keep response clear and helpful.
    `;

    userPrompt=`
    Goal: ${body.goal}
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
