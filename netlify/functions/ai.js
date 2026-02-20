import OpenAI from "openai";

export async function handler(event){
  try{
    const openai=new OpenAI({
      apiKey:process.env.OPENAI_API_KEY
    });

    const body=JSON.parse(event.body);

    const response=await openai.chat.completions.create({
      model:"gpt-4o-mini",
      temperature:0.9,
      messages:[
        {
          role:"system",
          content:`
Return ONLY valid JSON:

{
 "task":"Specific action task",
 "motivation":"Short powerful line"
}

Increase difficulty gradually.
Make it intense and practical.
`
        },
        {
          role:"user",
          content:`Day ${body.day}, Streak ${body.streak}`
        }
      ]
    });

    return{
      statusCode:200,
      body:response.choices[0].message.content
    };

  }catch{
    return{
      statusCode:500,
      body:JSON.stringify({
        task:"Do 30 minutes of focused work.",
        motivation:"Consistency builds empires."
      })
    };
  }
}
