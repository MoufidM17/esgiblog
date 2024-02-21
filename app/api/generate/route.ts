import { NextResponse } from "next/server";
import {OpenAI} from 'openai';
import { z } from "zod";

const postSchema = z.object({
    title: z.string(),
});

export async function POST(request: Request) {
    const prompt = 'Je veux générer une description avec l\'API d\'OpenAI.';
    const apiKey = 'YOUR_API_KEY'; // Remplacez par votre clé d'API OpenAI

    try {
        const openai = new OpenAI({
            apiKey: "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",
            // apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        });
        
        const body = await request.json();
        // const { title } = postSchema.parse(body)
        const title = "les avantages de l'IA pour optimiser votre expérience-utilisateur";
        console.log("title:", title);

        // return NextResponse.json({
        //     message: title,
        // });
        const prompt = `Tu est un éditer d'article de blog. Ton travail est de proposer une description pour un article sur le sujet suivant: "${title}". 
        Donne un résultat de comme le body d'un fichier html, incluant uniquement le contenu du corps (balises <body>). 
        Utilise les moteurs de recherche et les réseaux sociaux puis génère une description de cohérente et pertinente sur au moins 20 lignes.` 

        const completions = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: prompt,
              },
              {
                role: "user",
                content: title,
              },
            ],
        });
        return NextResponse.json({
            message: completions.choices[0].message as unknown as string,
        });
    } catch (error) {
        console.error('Une erreur s\'est produite lors de la génération de la description:', error);
    }
}