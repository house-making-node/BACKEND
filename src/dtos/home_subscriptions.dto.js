// home_letters.dto.js

export const addSubInfoResponseDTO = (subInfo) => {
    return {
        'user_id': subInfo[0].user_id,
        'email' : subInfo[0].email,
        'name' : subInfo[0].name
    };
}