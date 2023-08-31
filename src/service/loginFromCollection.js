import { createAnUserInCollection, getUserFromCollection } from "./getUser";

const loginFromFirestore = async (user) => {
    try {
        let userLogged = await getUserFromCollection(user.uid);
        if (!userLogged) {
            const id = user.uid;
            const newUser = {
                displayName: user.displayName,
                photoURL: user.photoURL,
                accessToken: user.accessToken
            };
            await createAnUserInCollection(id, newUser);
            userLogged = {
                id,
                ...newUser
            }
        }
        return {
            user: userLogged,
            error: false
        }
    } catch (error) {
        console.log(error);
        return {
            user: null,
            error: error
        }
    }
    
} 

export default loginFromFirestore;