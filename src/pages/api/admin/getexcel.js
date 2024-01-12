import connectDb from "@/middleware/mongoose";
import User from "../../../../models/User";
const excel = require("exceljs");
const handler = async (req, res) => {
    if(req.query.data=="user"){
        const users = await User.find({});
        console.log(req.query.data);
        let workbook = new excel.Workbook();
        let worksheet = workbook.addWorksheet("UsersData");
        worksheet.columns = [
            { header: "Name", key: "name", width: 30 },
            { header: "Email", key: "email", width: 30 },
            { header: "Phone", key: "phone", width: 30 },
            { header: "Title", key: "title", width: 30 },
            { header: "Github", key: "github", width: 30 },
            { header: "Linkedin", key: "linkedin", width: 30 },
            { header: "Clg", key: "clg", width: 30 },
            { header: "Website", key: "website", width: 30 },
            { header: "Account CreatedAt", key: "accountcr", width: 30 },
            { header: "Bio", key: "bio", width: 60 },
        ];
        users.map((users)=>{
            worksheet.addRow({
                name: users.name,
                email: users.email,
                phone: users.phone,
                title: users.title,
                github: users.github,
                linkedin: users.linkedin,
                clg: users.clg,
                website: users.website,
                accountcr: users.createdAt,
                bio: users.bio,
            });
        })
        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
        });
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + "UsersData.xlsx"
        );
        return workbook.xlsx.write(res).then(function () {
            res.status(200).end();
        });


    //     // res.status(200).json({ success: true, users: users });
    }

}
export default connectDb(handler);