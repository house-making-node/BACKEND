export const addConsultReqResponseDTO=(data)=>{
    return {
        "consulting_id":data[0].id,
        "status":data[0].status
    }
}