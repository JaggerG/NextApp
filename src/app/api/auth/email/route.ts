import { NextResponse, type NextRequest } from "next/server";
import { sendEmail } from "@/lib/email";

export const POST = async (req: Request) => {
    const res = await req.json();
    const data = res.payload;
    try {
        await sendEmail({...data});
        return new Response('Email sent successfully');
    } catch (error) {
        console.log(error);
        return new Response("Error sending email");
    }
    
}