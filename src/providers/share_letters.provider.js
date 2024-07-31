import { getLettersPreview } from '../models/share_letters.dao.js';
import { previewLettersResponseDTO } from '../dtos/share_letters.dto.js';

export const getPreview = async (offset, limit) => {

    // offset과 limit을 정수로 변환
    const parsedOffset = parseInt(offset, 10) || 0;
    const parsedLimit = parseInt(limit, 10) || 10;
    // 데이터베이스에서 공유 레터 목록을 조회
    const letters = await getLettersPreview(parsedOffset, parsedLimit);

    // 조회한 레터 목록과 offset, limit 값을 포함한 객체를 반환
    return previewLettersResponseDTO(letters);
};
