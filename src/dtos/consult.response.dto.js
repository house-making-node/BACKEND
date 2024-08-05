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

export const roomImagesResponseDTO=(consult_data,image_data)=>{
    return {
        consulting_id: image_data[0].consulting_id,
        image_id: image_data[0].id,
        s3_key:image_data[0].s3_key,
        status: consult_data[0].status
    };
}