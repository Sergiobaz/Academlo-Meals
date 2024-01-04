import app from "./app.js";
import { envs } from "./config/enviroments/enviroments.js";
import { authenticated, synced } from "./config/database/database.js";
import { initModel } from "./config/database/associations.js"

async function main() {
    try {
        await authenticated()
         initModel()
        await synced()
    } catch (error) {
        console.error(error);
    }
}

main();



app.listen(envs.PORT, () => {
    console.log(`Server running on port ${envs.PORT} 😎`);
});
