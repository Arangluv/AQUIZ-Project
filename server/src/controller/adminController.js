import Requestion from "../model/Requestion";

export const postContact = async (req, res) => {
  const { userEmail, requestReason, requestContent } = req.body;
  try {
    await Requestion.create({
      email: userEmail,
      reason: requestReason,
      content: requestContent,
    });
    return res
      .status(200)
      .json({ message: "문의사항이 성공적으로 접수되었습니다." });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "문의사항을 처리하는데 오류가 발생했습니다." });
  }
};

export const getContacts = async (req, res) => {
  const data = JSON.parse(req.cookies.token);
  if (data.username !== "아랑이") {
    return res.status(404).json({ message: "not ok" });
  }
  try {
    const userReqList = await Requestion.find({});
    return res.status(200).json({ userReqList });
  } catch (error) {
    return res.status(404).json({ message: "not ok" });
  }
};
