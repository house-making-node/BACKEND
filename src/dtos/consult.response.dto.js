export const addConsultReqResponseDTO = (data) => {
    return {
        "consulting_id": data[0].id,
        "house_size": data[0].house_size,
        "room_num": data[0].room_num,
        "mood": data[0].mood,
        "concern": data[0].concern,
        "status": data[0].status
    };
};

export const addImageResponseDTO=(consult_data,image_data)=>{
    return {
        consulting_id: image_data[0].consulting_id,
        image_id: image_data[0].id,
        s3_key:image_data[0].s3_key,
        status: consult_data[0].status
    };
};

export const getConsultStatusResponseDTO=(data)=>{
    return {
        "consulting_id":data[0].id,
        "status":data[0].status
    };
};  

export const getImagesResponseDTO = (data) => {
    const S3_BASE_URL = 'https://jibkku-s3.s3.ap-northeast-2.amazonaws.com/';
    return data.map(item => ({
        ...item,
        s3_Url: `${S3_BASE_URL}${item.s3_key}`
    }));
};
