export const getUserWithIdQ="SELECT * FROM USER WHERE user_id=?";
export const setHouseSizeQ="INSERT INTO CONSULTING(user_id,house_size,status) VALUES(?,?,?)";
export const getConsultReqWithIdQ="SELECT * FROM CONSULTING WHERE id=?";
export const setRoomNumberQ="UPDATE CONSULTING SET room_num = ?, status = ? WHERE id = ?";