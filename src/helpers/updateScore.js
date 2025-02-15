import { authConfig } from "../config/authConfig";
import { updateOne } from "../db/updateOne";
import { findOne } from "../db/findOne";

export async function updateScore(username, data) {
    try {
        const questionData = await findOne(
            authConfig.mongo.dbUrl,
            authConfig.mongo.dbKey,
            authConfig.mongo.dataSource,
            authConfig.mongo.database,
            authConfig.mongo.collections.cc2,
            { id: String(data.questionNumber) },
            {}
        );

        if (!questionData || !questionData.document) {
            console.error("Question not found:", data.questionNumber);
            return { success: false, message: "Invalid question number" };
        }

        if (data.answer.trim().toLowerCase() === questionData.document.answer.trim().toLowerCase()) {
            // Fetch the user's current score
            const userData = await findOne(
                authConfig.mongo.dbUrl,
                authConfig.mongo.dbKey,
                authConfig.mongo.dataSource,
                authConfig.mongo.database,
                authConfig.mongo.collections.cc1,
                { name: username },
                {}
            );

            if (!userData || !userData.document) {
                console.error("User not found:", username);
                return { success: false, message: "User not found" };
            }

            const newScore = (userData.document.score || 0) + 100;

            // Update the user's score
            await updateOne(
                authConfig.mongo.dbUrl,
                authConfig.mongo.dbKey,
                authConfig.mongo.dataSource,
                authConfig.mongo.database,
                authConfig.mongo.collections.cc1,
                { name: username },
                { $set: { score: newScore } }
            );

            return { success: true, message: "Score updated successfully", newScore };
        }

        return { success: false, message: "Incorrect answer" };
    } catch (error) {
        console.error("Error updating score:", error);
        return { success: false, message: "An error occurred while updating the score" };
    }
}
