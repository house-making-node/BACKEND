import { getLettersPreview, getLetterDataById } from '../models/share_letters.dao.js';
import { previewLettersResponseDTO, getLetterByIdResponseDTO } from '../dtos/share_letters.dto.js';
import { status } from '../../config/response.status.js';

export const getPreview = async (offset, limit) => {

    // offset과 limit을 정수로 변환
    const parsedOffset = parseInt(offset, 10) || 0;
    const parsedLimit = parseInt(limit, 10) || 10;
    // 데이터베이스에서 공유 레터 목록을 조회
    const letters = await getLettersPreview(parsedOffset, parsedLimit);

    // 조회한 레터 목록과 offset, limit 값을 포함한 객체를 반환
    return previewLettersResponseDTO(letters);
};


export const getLetterDetails = async (letterId) => {
    try {
        const letter = await getLetterDataById(letterId);

        if (!letter) {
            throw new BaseError(status.NOT_FOUND, 'Letter not found');
        }

        return getLetterByIdResponseDTO(letter);

    } catch (error) {
        console.error("Error fetching letter details: ", error);
        throw new BaseError(status.INTERNAL_SERVER_ERROR, error.message);
    }
};