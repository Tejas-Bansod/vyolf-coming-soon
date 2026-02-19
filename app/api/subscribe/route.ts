import axios from "axios";
import { GoogleAuth } from "google-auth-library";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return Response.json({ error: "Email required" }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return Response.json({ error: "Invalid email" }, { status: 400 });
        }

        const private_key = process.env.GOOGLE_PRIVATE_KEY
            ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n").replace(/^"(.*)"$/, "$1")
            : undefined;

        const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
        const spreadsheetId = process.env.SPREADSHEET_ID;

        // console.log("Attempting to append to sheet...");
        // console.log("Service Account Email:", clientEmail);
        // console.log("Spreadsheet ID:", spreadsheetId);

        if (!clientEmail || !private_key || !spreadsheetId) {
            console.error("Missing environment variables");
            return Response.json({ error: "Server configuration error" }, { status: 500 });
        }

        const auth = new GoogleAuth({
            credentials: {
                client_email: clientEmail,
                private_key,
            },
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        if (!accessToken.token) {
            console.error("Failed to generate access token");
            return Response.json({ error: "Auth error" }, { status: 500 });
        }

        const range = "Sheet1!A:B";

        await axios.post(
            `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=RAW`,
            {
                values: [[email, new Date().toISOString()]],
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken.token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("Successfully appended to sheet");
        return Response.json({ success: true });

    } catch (error: any) {
        console.error("Google Sheets API Error:");
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", JSON.stringify(error.response.data, null, 2));
        } else {
            console.error(error.message);
        }
        return Response.json({ error: "Server error" }, { status: 500 });
    }
}
